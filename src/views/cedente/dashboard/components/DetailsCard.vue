<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <b-card class="mb-0">
      <b-row>
        <b-col cols="12">
          <div v-if="!showResult || needAction" class="d-flex justify-content-between align-items-center">
            <h4 class="mb-0">Resumo da operação</h4>
            <div class="d-flex">
              <b-button class="mr-1" variant="outline-primary" @click="cancel"> Cancelar </b-button>
              <b-button variant="primary" :disabled="confirmButtonDisabled" @click="confirm">
                Confirmar antecipação
              </b-button>
            </div>
          </div>
          <div v-if="showResult && !isOnDetailsPage" class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <b-img src="@/assets/images/check-circle.svg" class="mr-2" />
              <div>
                <h3 class="mb-0">
                  <strong>Operação em processamento</strong>
                </h3>
                <span
                  >Aguarde, em breve você receberá um email informando a evolução do status da sua antecipação.</span
                >
              </div>
            </div>
            <div>
              <b-button variant="outline-primary" class="mr-2" @click="$emit('followStatus')">
                Acompanhar status
              </b-button>
              <b-button variant="primary" @click="$emit('reset')"> Ir para o início </b-button>
            </div>
          </div>
          <hr v-if="showResult && !isOnDetailsPage" />
        </b-col>
      </b-row>
      <b-row class="mt-1">
        <b-col cols="6">
          <b-card class="border-light mb-0">
            <div v-if="transaction.status">
              <div class="d-flex justify-content-between">
                <span class="h5">Status</span>
                <span v-html="creditSolicitationAssignorStatusBadge(transaction.status)" />
              </div>
              <hr />
            </div>
            <div class="d-flex justify-content-between">
              <span class="h5">Data do pedido</span>
              <span class="h5">{{ transaction.data_pedido | dateFormatter }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="h5">Data de resgate</span>
              <span class="h5">{{ transaction.data_resgate | dateFormatter }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="h5">Total de títulos</span>
              <span class="h5">{{ transaction.invoiceCount }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="h5">Total selecionado</span>
              <span class="h5">{{ transaction.totalSelected }}</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="h5 mb-0">Total disponível</span>
              <span class="h5 mb-0">{{ transaction.totalAmount }}</span>
            </div>

            <b-card class="cc-bg-light border-light mb-0 mt-2">
              <div class="d-flex justify-content-between">
                <h3 class="mb-0">
                  <strong>Total líquido</strong>
                </h3>
                <h2 class="mb-0">
                  <strong>{{ transaction.totalNetAmount }}</strong>
                </h2>
              </div>
              <b-badge
                class="w-100 mt-2 border-warning text-dark p-1 d-flex justify-content-between"
                variant="light-warning"
              >
                <span class="h4 mb-0">Taxa efetiva da operação</span>
                <strong class="h4 mb-0 font-weight-bolder">{{
                  percentageFormatter(transaction.resumo?.taxa_efetiva)
                }}</strong>
              </b-badge>
            </b-card>
          </b-card>
        </b-col>
        <b-col cols="6">
          <b-card class="border-light w-100 h-100">
            <grafico-valor-acumulado :chart-data="valorAcumuladoChartData" />
          </b-card>
        </b-col>
      </b-row>
      <b-row align-v="center" align-h="start" class="mt-1">
        <b-col cols="12">
          <b-card class="border-light w-100">
            <div v-if="transaction.por_cnpj && transaction.por_cnpj.length">
              <div class="d-flex align-items-center border-bottom pb-1 mb-1">
                <img class="mr-2" src="@/assets/images/Chart.svg" alt="Dados seguros" height="50" width="50" />
                <h4 class="mb-0">Distribuição dos valores da sua antecipação por CNPJ</h4>
              </div>

              <b-row>
                <b-col v-for="(resume, index) in byCNPJResume" :key="index" cols="6">
                  <div class="d-flex justify-content-between align-items-center mr-1">
                    <span class="font-weight-bold text-body-heading mr-1">{{ resume.cnpj }}</span>
                    <div class="d-flex align-items-center">
                      <span>{{ resume.usage }}</span>
                      <vue-apex-charts
                        class="ml-1"
                        type="radialBar"
                        height="30"
                        width="30"
                        :options="resume.options"
                        :series="resume.series"
                      />
                    </div>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col v-if="showResult" cols="12" class="mt-1">
          <b-alert show variant="warning" class="border-warning mt-2 p-1 mb-0">
            <strong>* Valor aproximado:</strong> Este é um valor aproximado, sujeito à alteração após a confirmação da
            operação na registradora.
          </b-alert>
        </b-col>
      </b-row>
    </b-card>
    <b-card-actions
      v-for="(acquirer, index) in acquirersWithValues"
      :key="index"
      class="mt-2"
      :title="`${acquirer.credenciadora.razao_social} - ${moneyFormat(
        acquirer.valor_bruto,
      )} - Taxa efetiva média: ${percentageFormatter(transaction.resumo?.taxa_efetiva)}`"
      action-collapse
      collapsed
    >
      <acquirer-transactions-data-table :acquirer="acquirer" :values-to-simulate="valuesToSimulate" />
    </b-card-actions>
  </div>
</template>

<script>
import { BCard, BRow, BCol, BButton, BBadge, BImg, BAlert } from 'bootstrap-vue';
import { BCardActions } from '@/@core/components/b-card-actions';
import {
  dateFormatter,
  creditSolicitationAssignorStatusBadge,
  percentageFormatter,
  moneyFormat,
} from '@/@core/comp-functions/data_visualization/datatable.js/';
import AcquirerTransactionsDataTable from '@/views/cedente/dashboard/components/AcquirerTransactionsDataTable.vue';
import VueApexCharts from 'vue-apexcharts';

import { $themeColors } from '@themeConfig';

import 'vue2-scrollbar/dist/style/vue2-scrollbar.css';
import GraficoValorAcumulado from './GraficoValorAcumulado.vue';

export default {
  components: {
    BCardActions,
    VueApexCharts,
    AcquirerTransactionsDataTable,
    BButton,
    BAlert,
    BBadge,
    BCard,
    BRow,
    BCol,
    BImg,
    GraficoValorAcumulado,
  },
  filters: {
    moneyFormat,
    dateFormatter,
  },
  props: {
    showResume: {
      type: Boolean,
      default: true,
    },
    showResult: {
      type: Boolean,
      default: false,
    },
    valuesToSimulate: {
      type: Array,
      default: () => [],
    },
    transaction: {
      type: Object,
      default: () => ({
        status: '',
        quantidade_titulos: 0,
        data_pedido: '',
        data_resgate: '',
        totalAmount: 'R$ 0,00',
        totalNetAmount: 'R$ 0,00',
        totalSelected: 'R$ 0,00',
      }),
    },
  },
  data() {
    return {
      confirmButtonDisabled: false,
      scrollbar: {
        maxHeight: '210px',
        width: '100%',
      },
      chart: {
        series: [65],
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15,
            },
          },
          colors: ['red'],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%',
              },
              track: {
                background: '#e9ecef',
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false,
                },
                value: {
                  show: false,
                },
              },
            },
          },
          stroke: {
            lineCap: 'round',
          },
        },
      },
      chartColor: [
        $themeColors.primary,
        $themeColors.warning,
        $themeColors.secondary,
        $themeColors.info,
        $themeColors.danger,
        $themeColors.danger,
        $themeColors.danger,
      ],
    };
  },
  computed: {
    byCNPJResume() {
      const resume = [];

      for (let i = 0; i < this.transaction.por_cnpj.length; i += 1) {
        const chartClone = JSON.parse(JSON.stringify(this.chart));
        chartClone.options.colors[0] = this.chartColor[i];
        chartClone.series[0] = parseFloat(this.transaction.por_cnpj[i].percentual_sobre_operacao);
        chartClone.usage = percentageFormatter(this.transaction.por_cnpj[i].percentual_sobre_operacao);
        chartClone.cnpj = this.transaction.por_cnpj[i].cnpj;
        resume.push(chartClone);
      }

      return resume;
    },
    needAction() {
      return this.transaction.status === 'sucesso_webhook' && this.isOnDetailsPage;
    },
    exibirAlertaValorAproximado() {
      return this.transaction.status === 'confirmado';
    },
    acquirersWithValues() {
      if (!this.transaction.por_credenciadora) return [];

      return this.transaction.por_credenciadora;
    },
    transactionsIdsForAntecipation() {
      const ids = [];

      this.acquirersWithValues.filter((acquirer) => acquirer.titulos.forEach((t) => ids.push(t.id)));

      return ids;
    },
    isOnDetailsPage() {
      return !!this.$route.params.id;
    },
    valorAcumuladoChartData() {
      const valuesByDate = [];
      this.transaction.resumo.valor_acumulado_no_periodo.map((item) =>
        valuesByDate.push({ x: item.data_vencimento, y: JSON.parse(item.valor_acumulado) }),
      );
      return [
        {
          name: 'Valor acumulado no período',
          data: valuesByDate,
        },
      ];
    },
  },
  methods: {
    titleByAcquirer(acquirer) {
      return `${acquirer.credenciadora.razao_social} - ${acquirer.valor_bruto}`;
    },
    creditSolicitationAssignorStatusBadge,
    percentageFormatter,
    moneyFormat,
    dateFormatter,
    confirm() {
      this.confirmButtonDisabled = true;
      this.$swal
        .fire({
          title: 'Deseja continuar?',
          text: 'Confirmar solicitação de antecipação?',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Enviar!',
        })
        .then(async (result) => {
          if (result.value) {
            this.$emit('confirmAntecipation');
          } else {
            this.confirmButtonDisabled = false;
          }
        });
    },
    cancel() {
      this.$swal
        .fire({
          title: 'Confirmar cancelamento?',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Não',
          confirmButtonText: 'Sim, cancelar',
        })
        .then(async (result) => {
          if (result.value) {
            this.$emit('reset');
            // try {
            //   this.$swal.fire({
            //     title: "Aguarde",
            //     text: "Aguarde um instante enquanto processamos a solicitação",
            //     showConfirmButton: false,
            //     allowOutsideClick: false,
            //     onBeforeOpen: () => {
            //       this.$swal.showLoading();
            //     },
            //   });
            //   const { data } = await this.$store.dispatch("dashboard/cancelAntecipation", this.transaction.solicitacao.id);
            //   this.$swal.fire({
            //     title: "Sucesso!",
            //     text: "Cancelamento de Antecipação de agenda enviado com sucesso.",
            //     icon: "success",
            //     confirmButtonText: "Ok",
            //   }).then(() => {
            //     this.$emit('reset')
            //   })
            // } catch (error) {
            //   this.$swal.fire({
            //     title: "Erro!",
            //     text: "Ocorreu um erro ao cancelar a antecipação.",
            //     icon: "error",
            //     confirmButtonText: "Ok",
            //   });
            // }
          }
        });
    },
    enableConfirmButton() {
      this.confirmButtonDisabled = false;
    },
  },
};
</script>
