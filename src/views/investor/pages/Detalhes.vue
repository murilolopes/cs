<template>
  <b-card class="emission-card-border">
    <b-row class="mb-2">
      <b-col cols="6" class="d-flex justify-content-start align-items-end">
        <b-img :src="emissaoImage" class="mr-1" />
        <div class="d-flex flex-column justify-content-start">
          <h4>
            {{ emissao.tipo_emissao }} - {{ emissao.nome_fantasia }} -
            {{ emissao.tipo_suboordinacao }}
          </h4>
          <span>{{ emissao.valor_global_emissao | moneyFormat }}</span>
        </div>
      </b-col>
      <b-col cols="6" class="d-flex flex-column justify-content-end align-items-end">
        <h4 class="d-flex align-items-end">
          Status:
          <b-badge
            :class="`ml-1 badge badge-light-${emissao.is_ativo ? 'success' : 'danger'} border-${
              emissao.is_ativo ? 'success' : 'danger'
            }`"
          >
            <span class="text-dark">
              {{ emissao.is_ativo ? 'Ativo' : 'Inativo' }}
            </span>
          </b-badge>
        </h4>
        <h4 class="mb-0 d-flex align-items-end">
          Valor da emissão:
          <h2 class="mb-0 ml-1">
            {{ emissao.valor_global_emissao | moneyFormat }}
          </h2>
        </h4>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <b-card class="emission-card-border emission-card-bg">
          <div class="d-flex justify-content-between">
            <span>Data da Emissão</span>
            <strong>{{ emissao.data_emissao | formatDate }}</strong>
          </div>
          <div class="d-flex justify-content-between">
            <span>Data do Vencimento</span>
            <strong>{{ emissao.data_vencimento | formatDate }}</strong>
          </div>
          <div class="d-flex justify-content-between">
            <span>Volume da série</span>
            <strong>{{ emissao.quantidade }}</strong>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <span>Emissão</span>
            <strong>{{ emissao.numero_emissao }}</strong>
          </div>
          <div class="d-flex justify-content-between">
            <span>Série</span>
            <strong>{{ emissao.nome_serie }}</strong>
          </div>
          <div class="d-flex justify-content-between">
            <span>Emissor</span>
            <strong>{{ emissao.emissor }}</strong>
          </div>
          <div class="d-flex justify-content-between">
            <span>Agente Fiduciário</span>
            <strong>{{ emissao.agente_fiduciario }}</strong>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <span>Código IF B3</span>
            <strong>{{ emissao.id }}</strong>
          </div>
          <div class="d-flex justify-content-between">
            <span>ISIN</span>
            <strong>{{ emissao.codigo_isin }}</strong>
          </div>
        </b-card>
      </b-col>
      <b-col cols="6">
        <b-card class="emission-card-border emission-card-bg">
          <div class="d-flex justify-content-between">
            <span>Júros pagos</span>
            <strong>{{ emissao.juros_ultimo_pagamento }}</strong>
          </div>
          <div class="d-flex justify-content-between">
            <span>Amortização</span>
            <strong>{{ emissao.amort_utlimo_pagamento }}</strong>
          </div>
          <div class="d-flex justify-content-between">
            <span>Amortização Extraordinária</span>
            <strong>{{ emissao.amex_ultimo_pagamento }}</strong>
          </div>
          <div class="d-flex justify-content-between">
            <span>Duração Remanescente (em anos)</span>
            <strong>{{ emissao.duration_em_anos }}</strong>
          </div>
          <div class="d-flex justify-content-between">
            <span>Período de Pagamentos de Juros</span>
            <strong>{{ emissao.periodo_pagamento_juros }}</strong>
          </div>
          <div class="d-flex justify-content-between">
            <span>Período de Amortizações</span>
            <strong>{{ emissao.periodo_pagamento_amort }}</strong>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <span>Liquidação do último pagamento</span>
            <strong>{{ emissao.data_liquidacao | formatDate }}</strong>
          </div>
          <div class="d-flex justify-content-between">
            <span>Próximo pagamento</span>
            <strong>{{ emissao.data_proximo_pagamento | formatDate }}</strong>
          </div>
          <hr />
          <div class="d-flex justify-content-between">
            <span>Remuneração</span>
            <strong>{{ emissao.remuneracao }}</strong>
          </div>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-card class="emission-card-border">
          <h4 class="font-weight-bolder">Histórico de pagamentos</h4>
          <vue-apex-charts
            ref="paymentHistory"
            height="200"
            :options="chartOptions"
            :series="series"
          />
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-card class="emission-card-border">
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex flex-column">
              <h4 class="font-weight-bolder">PUs Históricos</h4>
              <span>Selecione o período para baixar.</span>
            </div>
            <div class="d-flex text-nowrap">
              <div class="input-icon">
                <flat-pickr
                  v-model="initialDate"
                  class="form-control"
                  :config="{ dateFormat: 'd/m/Y' }"
                />
                <feather-icon icon="CalendarIcon" size="22" class="icon-position text-success" />
              </div>
              <div class="input-icon ml-1">
                <flat-pickr
                  v-model="finalDate"
                  class="form-control"
                  :config="{ dateFormat: 'd/m/Y' }"
                />
                <feather-icon icon="CalendarIcon" size="22" class="icon-position text-success" />
              </div>
              <b-button variant="outline-warning" class="ml-1" @click="downloadExcel"
                >Baixar excel</b-button
              >
              <b-button variant="outline-warning" class="ml-1" @click="openPusGraphModal"
                >Abrir gráfico</b-button
              >
            </div>
          </div>
        </b-card>
      </b-col>
    </b-row>

    <calculator :isin="emissao.codigo_isin" />

    <b-row v-for="(doc, index) in docs" :key="index">
      <b-col cols="12">
        <b-card-actions
          class="mt-2 emission-card-border"
          :title="doc.tipo"
          action-collapse
          :collapsed="index !== 0"
        >
          <div class="border">
            <b-table
              responsive="sm"
              :items="doc.documentos"
              :fields="docFields"
              class="mb-0 pus-table"
            >
              <template #cell(url)="data">
                <a :href="data.item.url" target="_blank">
                  <feather-icon
                    icon="DownloadIcon"
                    size="22"
                    class="text-success"
                    @click="downloadFile(doc)"
                  />
                </a>
              </template>
            </b-table>
          </div>
        </b-card-actions>
      </b-col>
    </b-row>

    <b-modal id="pusModal" centered hide-footer header-bg-variant="white" size="lg">
      <span>Características</span>
      <h4 class="font-weight-bolder">Histórico de pagamentos</h4>
      <span>{{ emissao.codigo_isin }} / {{ emissao.nome_emissao }} / {{ emissao.nome_serie }}</span>
      <vue-apex-charts
        ref="pus"
        height="400"
        :options="pusGraph.chartOptions"
        :series="pusGraph.series"
      />
    </b-modal>
  </b-card>
</template>

<script>
import {
  BRow,
  BCol,
  BImg,
  BCard,
  BTable,
  BBadge,
  BFormInput,
  BFormGroup,
  BButton,
  BButtonGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { BCardActions } from '@/@core/components/b-card-actions'
import VueApexCharts from 'vue-apexcharts'
import { moneyFormat } from '@/@core/comp-functions/data_visualization/datatable'
import flatPickr from 'vue-flatpickr-component'
// eslint-disable-next-line import/no-cycle
import { formatDate } from '@core/utils/filter'
import { downloadFromResponse } from '@/@core/comp-functions/forms/cc-dropzone'
import Calculator from '@/views/investor/components/Calculator.vue'

export default {
  name: 'Emissoes',
  components: {
    BCardActions,
    BTable,
    BRow,
    BCol,
    BImg,
    BCard,
    BBadge,
    BFormGroup,
    BButton,
    BButtonGroup,
    vSelect,
    flatPickr,
    BFormInput,
    Calculator,
    VueApexCharts,
  },
  filters: {
    moneyFormat,
    formatDate,
  },
  data() {
    return {
      selectedButton: 'price',
      pusGraph: {
        series: [],
        chartOptions: {
          chart: {
            type: 'area',
            toolbar: {
              show: false,
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            curve: 'straight',
          },
          legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'left',
            fontSize: '14px',
            fontFamily: 'Lato Black',
            markers: {
              radius: 12,
            },
          },
          grid: {
            show: true,
            row: {
              colors: ['transparent'],
            },
            column: {
              colors: ['transparent'],
            },
          },
          xaxis: {
            categories: [],
          },
          yaxis: {
            labels: {
              show: true,
              align: 'right',
              minWidth: 0,
              maxWidth: 160,
              style: {
                colors: [],
                fontSize: '12px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
              },
              offsetX: 0,
              offsetY: 0,
              rotate: 0,
              formatter: (value) => moneyFormat(value),
            },
          },
          tooltip: {
            shared: false,
          },
          colors: ['#3FE4A9'],
        },
      },
      items: [
        {
          data: '28/02/2023',
          arquivo: 'Demonstração do patrimônio separado 06/2022',
          download: 'Macdonald',
        },
      ],
      initialDate: '',
      finalDate: '',
      emissao: {},
      series: [],
      chartOptions: {
        chart: {
          type: 'bar',
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          curve: 'straight',
        },
        legend: {
          show: true,
          position: 'top',
          horizontalAlign: 'left',
          fontSize: '14px',
          fontFamily: 'Montserrat',
          markers: {
            radius: 12,
          },
        },
        grid: {
          show: true,
          row: {
            colors: ['transparent'],
          },
          column: {
            colors: ['transparent'],
          },
        },
        xaxis: {
          categories: [],
        },
        yaxis: {
          labels: {
            show: true,
            align: 'right',
            minWidth: 0,
            maxWidth: 160,
            style: {
              colors: [],
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 400,
              cssClass: 'apexcharts-yaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: (value) => moneyFormat(value),
          },
        },
        tooltip: {
          shared: false,
        },
        colors: ['#E3C092', '#C9794A', '#3FE4A9'],
      },
      docs: [],
      docFields: [
        {
          key: 'data_documento',
          label: 'Data',
          formatter: (value) => formatDate(value),
        },
        {
          key: 'name',
          label: 'Arquivo',
        },
        {
          key: 'url',
          label: 'Download',
        },
      ],
    }
  },
  async mounted() {
    const { data } = await this.$store.dispatch('investor/getEmission', this.$route.params.id)
    this.emissao = data.data

    const paymentHistory = await this.$store.dispatch(
      'investor/paymentHistory',
      this.$route.params.id,
    )
    this.series = paymentHistory.data.data.data
    this.chartOptions.xaxis.categories = paymentHistory.data.data.categories
    this.$refs.paymentHistory.updateOptions({ ...this.chartOptions })

    await this.getDocs()
  },
  methods: {
    async getDocs() {
      const { data } = await this.$store.dispatch('investor/getDocs', this.$route.params.id)

      this.docs = data.data
    },
    async calculateTax() {
      this.$swal({
        title: 'Calculando...',
        onOpen: () => {
          this.$swal.showLoading()
        },
        allowOutsideClick: false,
      })
      try {
        let payload = {
          id: this.$route.params.id,
          data: this.calcDate,
          tipo: this.tax.value.toString(),
        }

        if (this.selectedButton === 'price') {
          payload.valor = this.moneyValue
        } else {
          payload.valor = this.taxValue
        }

        const { data } = await this.$store.dispatch('investor/calcDesagio', payload)
        this.result = moneyFormat(data.PrevisaoTotalPorCota)
      } catch (error) {
        console.log(1)
      } finally {
        this.$swal.close()
      }
    },
    selectButton(type) {
      this.result = ''
      this.selectedButton = type
    },
    async downloadExcel() {
      this.$swal({
        title: 'Carregando dados...',
        onOpen: () => {
          this.$swal.showLoading()
        },
        allowOutsideClick: false,
      })
      const { data } = await this.$store.dispatch('investor/downloadPusHistory', {
        id: this.$route.params.id,
        data_inicial: this.initialDate,
        data_final: this.finalDate,
      })
      downloadFromResponse(data, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        fileName: 'pus.xlsx',
      })
      this.$swal.close()
    },
    async openPusGraphModal() {
      this.$bvModal.show('pusModal')
      this.$swal({
        title: 'Carregando dados...',
        onOpen: () => {
          this.$swal.showLoading()
        },
        allowOutsideClick: false,
      })

      const { data } = await this.$store.dispatch('investor/pusGraph', {
        id: this.$route.params.id,
        data_inicial: this.initialDate,
        data_final: this.finalDate,
      })
      this.pusGraph.chartOptions.xaxis.categories = data.data.categories
      this.pusGraph.series = [{ name: '', data: data.data.data }]
      this.$swal.close()
    },
  },
  computed: {
    canCalculateTax() {
      return this.selectedButton === 'price'
        ? this.calcDate && this.moneyValue
        : this.calcDate && this.taxValue && this.tax.value
    },
    selectedButtonVariant() {
      const types = {
        price: 'outline-primary',
        tax: 'outline-primary',
      }

      types[this.selectedButton] = 'primary'

      return types
    },

    emissaoImage() {
      const options = {
        cri: 'cri',
        cra: 'cra',
      }

      // eslint-disable-next-line global-require, import/no-unresolved
      if (!options[this.emissao?.tipo_emissao?.toLowerCase()])
        return require('@/assets/images/recebíveis.svg')

      // eslint-disable-next-line import/no-dynamic-require, global-require
      return require(`@/assets/images/${options[this.emissao?.tipo_emissao?.toLowerCase()]}.svg`)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.max-w-6 {
  max-width: 6rem;
}
.max-w-10 {
  max-width: 10rem;
}

.emissoes-details-button {
  background-color: #3fe4c6 !important;
  border: 1px solid #1eb499 !important;
}

.btn-primary {
  color: #000000 !important;
}

.cs-select .vs__dropdown-toggle {
  border-radius: 0.357rem 0 0 0.357rem;
}

.cs-select .vs--open .vs__dropdown-toggle {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}

.input-icon {
  position: relative;
  display: inline-block;
}

.icon-position {
  position: absolute;
  right: 10px;
  top: 8px;
}

.pus-table th {
  background-color: #eff4f6;
  color: #242a32;
}

.emission-card-border {
  border-radius: 8px;
  border: 1px solid #becad4;
}

.emission-card-bg {
  border-radius: 8px;
  border: 1px solid #becad4;
  background: #f8fafc;
}
</style>
