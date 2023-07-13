<template>
  <div>
    <b-card>
      <b-row>
        <b-col cols="8">
          <div class="d-flex justify-content-between align-items-center">
            <h3 class="mb-1 text-dark">
              Suas empresas
            </h3>
            <div class="d-flex align-items-end">
              <span class="mb-1">Disponível para antecipar</span>
              <h2 class="mb-1 ml-1 text-dark">
                {{ totalAvailableAmount }}
              </h2>
            </div>
          </div>

          <div class="d-flex justify-content-between align-items-start">
            <template>
              <div class="w-100">
                <multiselect
                  v-model="selectedCnpjs"
                  :options="cnpjs"
                  :close-on-select="false"
                  :multiple="true"
                  :searchable="true"
                  placeholder="Filtrar CNPJs"
                  :limit="cnpjsCountBadgeSize"
                  :limit-text="count => `+ ${count}`"
                  :select-label="'+'"
                  :selected-label="'✓'"
                  :deselect-label="'✕'"
                />
              </div>
            </template>
            <b-button variant="outline-primary" class="text-nowrap ml-1" @click="selectedCnpjs = []">
              Limpar <feather-icon icon="RefreshCcwIcon" />
            </b-button>
          </div>
          <div class="row m-0 mt-2 taxa-valor-container">
            <b-alert show variant="primary" class="col d-flex justify-content-between align-items-center mb-0 border-primary">
              <span class="h5 mb-0" style="color: #66788B">Total selecionado</span>
              <h2 class="mb-0 ml-1 text-primary">
                {{ moneyFormat(valor_emprestimo) }}
              </h2>
            </b-alert>
            <b-alert show variant="primary" class="col d-flex justify-content-between align-items-center mb-0 border-primary">
              <span class="h5 mb-0" style="color: #66788B">Valor líquido</span>
              <h2 class="mb-0 ml-1 text-primary">
                {{ moneyFormat(valor_liquido) }}
              </h2>
            </b-alert>
          </div>
          <div class="d-flex justify-content-between align-items-center mt-2">
            <flat-pickr ref="flatPickr"
                        v-model="period"
                        placeholder="Selecione um Período"
                        class="form-control w-25"
                        :config="{ mode: 'range', dateFormat: 'd/m/Y', onClose: flatPickrCloseEvent }"
            />
            <b-button-group>
              <b-button :variant="currentPeriodButtonVariant(30)" @click="setPeriod(30)">
                30 dias
              </b-button>
              <b-button :variant="currentPeriodButtonVariant(45)" @click="setPeriod(45)">
                45 dias
              </b-button>
              <b-button :variant="currentPeriodButtonVariant(60)" @click="setPeriod(60)">
                60 dias
              </b-button>
              <b-button :variant="currentPeriodButtonVariant(90)" @click="setPeriod(90)">
                90 dias
              </b-button>
            </b-button-group>
          </div>
          <div class="mt-2">
            <credit-acquirer-slider
              v-for="(acquirer, index) in acquirers"
              :ref="`acquirerSlider-${index}`"
              :key="index"
              :acquirer-data="acquirer"
              @selected-from-slider="updateValues"
              @effective-tax="updateEffectiveTax"
            />
            <b-row v-if="!hasAgenda()">
              <b-col cols="12">
                <div class="d-flex align-items-center">
                  <b-img src="@/assets/images/off-agenda.svg" />
                  <div class="d-flex flex-column ml-3">
                    <div class="d-flex" style="font-size: 21px; color: black;">
                      Fora da janela de contratação
                    </div>
                    <p>
                      Aguarde a abertura da nova janela <br>
                      para iniciar sua contratação.
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
            <b-row v-else-if="!acquirers.length && hasAgenda()">
              <b-col cols="12">
                <div class="d-flex">
                  <b-img src="@/assets/images/no-agenda.svg" />
                  <div class="ml-3 d-flex align-items-center">
                    <p>
                      No momento você <br>
                      não possui títulos <br>
                      para antecipar.
                    </p>
                  </div>
                </div>
              </b-col>
            </b-row>
          </div>
          <div class="mt-3 border-top w-100">
            <p class="mt-1">
              *Valor mínimo de contratação R$ 10.000,00
            </p>
          </div>
        </b-col>
        <b-col cols="4">
          <b-card class="cc-bg-light d-flex justify-content-center card-janela-contratacao">
            <h3 class="mb-1 pb-1 border-bottom text-dark">
              Resumo da operação
            </h3>
            <div class="resumo-operacao">
              <div class="d-flex flex-row justify-content-between align-items-center">
                <span> Período <feather-icon icon="InfoIcon" /> </span>
                <h5 class="text-dark">
                  {{ period || '-' }}
                </h5>
              </div>
              <div class="d-flex flex-row justify-content-between align-items-center">
                <span>Taxa nominal média</span>
                <h4 class="text-dark">
                  {{ taxaNomidalMedia }}
                </h4>
              </div>
              <div class="d-flex flex-row justify-content-between align-items-center">
                <span>Total selecionado</span>
                <h4 class="text-dark">
                  {{ moneyFormat(valor_emprestimo) }}
                </h4>
              </div>
              <div class="d-flex flex-row justify-content-between align-items-center">
                <span>Valor líquido</span>
                <h4 class="text-dark">
                  {{ moneyFormat(valor_liquido) }}
                </h4>
              </div>
              <b-alert show variant="warning" class="d-flex flex-row justify-content-between align-items-center border-warning mt-1 taxa-efeitva">
                <span class="h5 mb-0 text-dark">Taxa efetiva da operação</span>
                <h4 class="m-0 text-dark">
                  {{ taxaEfetivaOperacao }}
                </h4>
              </b-alert>
            </div>
            <div v-if="!alcancaValorMinimo()" class="d-flex justify-content-center text-dark mt-1">
              <small>*Valor mínimo de contratação R$ 10.000,00</small>
            </div>
            <b-button size="lg"
                      variant="primary"
                      class="w-100 mt-1 mb-1"
                      :disabled="!canAntecipate"
                      @click="proceedWithAdvance"
            >
              Solicitar antecipação
            </b-button>
            <janela-de-contratacao />
            <div v-if="resumo.por_cnpj.length" class="mt-3">
              <h4 class="border-bottom pb-1 text-dark">
                Sua antecipação por CNPJ
              </h4>
              <vue-scrollbar :style="scrollbar" class="bg-transparent">
                <div>
                  <div v-for="(resume, index) in byCNPJResume" :key="index" class="d-flex justify-content-between align-items-center mr-1">
                    <span class="font-weight-bold text-body-heading mr-1">{{ resume.cnpj }}</span>
                    <div class="d-flex align-items-center">
                      <span class="text-dark">{{ resume.usage }}</span>
                      <vue-apex-charts class="ml-1"
                                       type="radialBar"
                                       height="30"
                                       width="30"
                                       :options="resume.options"
                                       :series="resume.series"
                      />
                    </div>
                  </div>
                </div>
              </vue-scrollbar>
            </div>
          </b-card>
        </b-col>
      </b-row>

      <b-modal id="modalSolicitationOutOfTime" centered hide-footer header-bg-variant="white">
        <div class="d-flex flex-column">
          <h3 class="mb-1">
            Solicitação fora do horário permitido
          </h3>
          <p class="mb-1">
            Informamos que o horário permitido para agendamento de antecipação de recebíveis de cartões de crédito é de <b>segunda a sexta-feira, das 09:00 às 21:00 horas</b>.
          </p>
          <p>
            Fora deste horário, não será possível realizar agendamentos. Pedimos que aguarde o horário permitido para realizar sua solicitação.
          </p>

          <div class="d-flex flex-row justify-content-between mt-1">
            <b-button
              variant="primary"
              class="mb-1 mr-1"
              @click="$bvModal.hide('modalSolicitationOutOfTime')"
            >Aguardar</b-button>
          </div>
        </div>
      </b-modal>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BImg,
  BButton,
  BModal,
  BAlert,
  BButtonGroup,
} from 'bootstrap-vue'
import Multiselect from 'vue-multiselect'
import parse from 'date-fns/parse'
import format from 'date-fns/format'
import VueApexCharts from 'vue-apexcharts'

import VueScrollbar from 'vue2-scrollbar'
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css'

import { $themeColors } from '@themeConfig'
import flatPickr from 'vue-flatpickr-component'
import { moneyFormat, percentageFormatter } from '@core/comp-functions/data_visualization/datatable'
import CreditAcquirerSlider from '@/views/cedente/dashboard/components/CreditAcquirerSlider.vue'
import JanelaDeContratacao from '@/views/cedente/dashboard/components/JanelaDeContratacao.vue'
import { addDays } from 'date-fns'

export default {
  name: 'CreditAdvanceCard',
  components: {
    BCard,
    BRow,
    BCol,
    BImg,
    BModal,
    BAlert,
    BButton,
    flatPickr,
    VueScrollbar,
    BButtonGroup,
    VueApexCharts,
    JanelaDeContratacao,
    CreditAcquirerSlider,
    Multiselect,
  },
  data() {
    return {
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
      chartColor: [$themeColors.primary, $themeColors.warning, $themeColors.secondary, $themeColors.info, $themeColors.danger, $themeColors.danger, $themeColors.danger],
      chartSeries: [],
      period: '',
      periodInDays: '',
      maxDisplay: 4,
      safeSelectedCnpjs: [],
      selectedCnpjs: [],
      cnpjs: [],
      acquirers: [],
      valor_emprestimo: 0,
      valor_liquido: 0,
      taxaEfetivaOperacao: 0,
      taxaNomidalMedia: 0,
      status: '',
      erroAoCarregarAgenda: false,
      scrollbar: {
        maxHeight: '210px',
        width: '100%',
      },
      windowHeight: 0,
      windowWidth: 0,
      resumo: {
        por_cnpj: [],
      },
    }
  },
  computed: {
    acquirersPayload() {
      const cnpjs = this.selectedCnpjs
      const periodo = this.periodInDays
      return {
        cnpjs,
        periodo,
      }
    },
    totalAvailableAmount() {
      const value = this.acquirers.reduce((acc, acquirer) => acc + acquirer.totalAmountValue, 0)
      return this.moneyFormat(value)
    },
    totalSelected() {
      return this.moneyFormat(this.resumo?.resumo?.total_solicitado)
    },
    byCNPJResume() {
      const resume = []

      for (let i = 0; i < this.resumo.por_cnpj.length; i += 1) {
        const chartClone = JSON.parse(JSON.stringify(this.chart))
        chartClone.options.colors[0] = this.chartColor[i]
        chartClone.series[0] = parseFloat(this.resumo.por_cnpj[i].percentual_sobre_operacao)
        chartClone.usage = percentageFormatter(this.resumo.por_cnpj[i].percentual_sobre_operacao)
        chartClone.cnpj = this.resumo.por_cnpj[i].cnpj
        resume.push(chartClone)
      }

      return resume
    },
    canAntecipate() {
      if (this.dentroHorarioAntecipacao()) {
        if (process.env.VUE_APP_SKIP_VALIDACAO_VALOR_BRUTO === 'true') {
          return parseFloat(this.valor_emprestimo) > 0
        }
        return this.alcancaValorMinimo()
      }
      return false
    },
    valuesToSimulate() {
      const valuesToSimulate = []

      this.acquirers.forEach((acquirer, index) => {
        const value = this.$refs[`acquirerSlider-${index}`][0].acquirer.selectedValue
        valuesToSimulate.push({
          credenciadora_id: acquirer.id,
          valor_solicitado: value,
        })
      })

      return { valor_solicitado_por_credenciadora: valuesToSimulate, cnpjs: this.selectedCnpjs, periodo: this.periodInDays }
    },
    registrationSituation() {
      const {
        status_analise,
        status_documentacao,
        status_limite,
      } = this.$store.state.auth.userData.empresa

      const situation = status_documentacao === 'reprovado' ? 'reproved' : ''

      const message = {
        incomplete: {
          title: '',
          subtitle: '',
        },
        reproved: {
          title: '',
          subtitle: '',
        },
      }
      return this.$store.state.auth.userData.empresa.situacao_cadastral
    },
    statusDocumentation() {
      return this.$store.state.auth.userData.empresa.status_documentacao
    },
    formattedDueDate() {
      if (!this.data_vencimento) return ' - '

      const date = parse(this.data_vencimento, 'yyyy-MM-dd', new Date())

      return format(date, 'dd/MM/yyyy')
    },
    cnpjsCountBadgeSize() {
      if (this.windowWidth < 1350) { return 1 }
      if (this.windowWidth < 1350) { return 2 }
      if (this.windowWidth < 1580) { return 3 }
      return 4
    },
  },
  watch: {
    async status(newStatus) {
      if (newStatus === 'READY') {
        this.$swal.close()
        clearInterval(this.optInRequest)
        try {
          const { data } = await this.$store.dispatch('credenciadora/getTransactionsByAcquirers', this.acquirersPayload)
          if (data.length === 0) {
            this.valor_emprestimo = parseFloat(0)
            this.valor_liquido = 0
            this.taxaEfetivaOperacao = percentageFormatter('0')
            this.resumo.por_cnpj = []
          }
          this.acquirers = data.map(acquirer => ({
            name: acquirer.credenciadora.nome_fantasia,
            logo: acquirer.credenciadora.logo,
            totalAmountValue: parseFloat(acquirer.valor_total),
            totalAmountValueInput: this.moneyFormat(acquirer.valor_total),
            tax: acquirer.credenciadora.taxa_juros,
            selectedValue: 0,
            selectedValueInput: 'R$ 0',
            id: acquirer.credenciadora.id,
            inProgressSolicitation: acquirer.solitacao_em_andamento,
            effective_tax: 0,
            cumulativeAmount: acquirer.valor_acumulado_no_periodo,
          }))
        } catch (error) {
          this.$emit('no-agenda')
        }
      }
    },
    async acquirersPayload() {
      if (this.status !== 'READY') return
      try {
        const { data } = await this.$store.dispatch('credenciadora/getTransactionsByAcquirers', this.acquirersPayload)
        if (data.length === 0) {
          this.valor_emprestimo = parseFloat(0)
          this.valor_liquido = 0
          this.taxaEfetivaOperacao = percentageFormatter('0')
          this.resumo.por_cnpj = []
        }

        const credenciadoras = []
        data.filter(acquirer => {
          credenciadoras.push({
            name: acquirer.credenciadora.nome_fantasia,
            logo: acquirer.credenciadora.logo,
            totalAmountValue: parseFloat(acquirer.valor_total),
            totalAmountValueInput: this.moneyFormat(acquirer.valor_total),
            tax: acquirer.credenciadora.taxa_juros,
            selectedValue: 0,
            selectedValueInput: 'R$ 0,00',
            id: acquirer.credenciadora.id,
            inProgressSolicitation: acquirer.solitacao_em_andamento,
            effective_tax: 0,
            cumulativeAmount: acquirer.valor_acumulado_no_periodo,
          })
          return credenciadoras
        })

        this.$set(this, 'acquirers', credenciadoras)
        credenciadoras.forEach((acquirer, index) => {
          this.$nextTick(() => {
            this.$refs[`acquirerSlider-${index}`][0].refreshComponent()
          })
        })

        if (!credenciadoras.length) this.$emit('no-agenda')
      } catch (error) {
        this.$emit('no-agenda')
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.optInRequest)
    window.removeEventListener('resize', this.onResize)
  },
  async mounted() {
    this.onResize()
    this.setPeriod(30)
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize)
    })

    this.$refs.flatPickr.fp.l10n.rangeSeparator = ' até '
    await this.checkForOptIn()

    const { data } = await this.$store.dispatch('auth/getCurrentEconomicGroupData')
    const cnpjs = []

    const algumAprovado = data.cedentes.some(cedente => cedente.status_documentacao === 'aprovado')

    data.cedentes.forEach(cedente => {
      if (!algumAprovado || cedente.status_documentacao === 'aprovado') {
        cnpjs.push(cedente.cnpj)
        cedente.filiais.forEach(filial => {
          cnpjs.push(filial.cnpj)
        })
      }
    })

    this.cnpjs = cnpjs.map((cnpj, index) => cnpj)

    // this.selectAll()

    if (this.status === 'IN_PROGRESS') {
      this.$swal.fire({
        title: 'Carregando informações',
        text: 'Aguarde um instante enquanto analisamos nosso banco de dados',
        showConfirmButton: false,
        allowOutsideClick: false,
        imageUrl: 'loading-antecipa.gif',
        imageAlt: 'Custom image',
      })
      this.optInRequest = await setInterval(this.checkForOptIn, 1000)
    }
  },
  methods: {
    alcancaValorMinimo() {
      return parseFloat(this.valor_emprestimo) >= 10000 && parseFloat(this.valor_emprestimo) % 1000 === 0
    },
    dentroHorarioAntecipacao() {
      if (process.env.VUE_APP_SKIP_VALIDACAO_HORARIO_ANTECIPACAO === 'true') {
        return true
      }

      const todayNineAM = new Date()
      todayNineAM.setHours('09')
      todayNineAM.setMinutes('00')

      const todayNinePM = new Date()
      todayNinePM.setHours('21')
      todayNinePM.setMinutes('00')

      const date = new Date()
      return date >= todayNineAM && date < todayNinePM
    },
    onResize() {
      this.windowHeight = window.innerHeight
      this.windowWidth = window.innerWidth
    },
    flatPickrCloseEvent() {
      this.periodInDays = ''
    },
    currentPeriodButtonVariant(value) {
      return this.periodInDays === value ? 'primary' : 'outline-primary'
    },
    setPeriod(period) {
      this.periodInDays = period

      let startDate = this.period.split(' até ')[0] || new Date()

      startDate = typeof startDate === 'string' ? parse(startDate, 'dd/MM/yyyy', new Date()) : startDate
      const endDate = addDays(startDate, period)

      this.period = `${format(startDate, 'dd/MM/yyyy')} até ${format(endDate, 'dd/MM/yyyy')}`
    },
    selectAll() {
      if (this.selectedCnpjs.length === this.cnpjs.length) {
        this.selectedCnpjs = []
      } else {
        this.selectedCnpjs = this.cnpjs
      }
    },
    async checkForOptIn() {
      const { data } = await this.$store.dispatch('dashboard/optIn')
      this.status = data.status
    },
    moneyFormat(value, minimumFractionDigits = 2) {
      return moneyFormat(parseFloat(value), minimumFractionDigits)
    },
    showCompleteRegistrationModal() {
      this.$bvModal.show('complete-registration-modal')
    },
    showCompleteDocumentationModal() {
      this.$bvModal.show('complete-documentation-modal')
    },
    showInProgressModal() {
      this.$bvModal.show('in-progress-modal')
    },
    async updateValues() {
      try {
        const { data } = await this.$store.dispatch('dashboard/preview', this.valuesToSimulate)

        this.valor_emprestimo = parseFloat(data.resumo.total_solicitado)
        this.valor_liquido = data.resumo.total_liquido
        this.taxaEfetivaOperacao = percentageFormatter(data.resumo.taxa_efetiva)
        this.taxaNomidalMedia = percentageFormatter(data.resumo.taxa_nomimal_media)

        this.resumo = data
      } catch (error) {
        this.valor_emprestimo = error.response.data.valor_bruto
        this.valor_liquido = error.response.data.valor_liquido
        if (error.response.data.errors != null) {
          // TODO: substituir isso por um toast
          this.$swal.fire({
            title: 'Valor inválido',
            text: data.errors,
            icon: 'warning',
          })
        }
      }
    },
    proceedWithAdvance() {
      if (this.dentroHorarioAntecipacao()) {
        this.$emit('proceed-with-advance', this.valuesToSimulate)
      } else {
        // TODO COMENTANDO PARA TESTES
        // this.$bvModal.show("modalSolicitationOutOfTime");
      }
    },
    updateEffectiveTax(payload) {
      this.acquirers.filter(acquirer => {
        if (acquirer.id === payload.credenciadora_id) {
          acquirer.effective_tax = payload.effective_tax
        }
      })
    },
    hasAgenda() {
      if (this.status === 'NO_AGENDA') {
        return false
      }
      return true
    },
  },
}
</script>

<style lang="scss">
@import "~@core/scss/vue/libs/vue-slider.scss";
@import '@core/scss/vue/libs/vue-flatpicker.scss';

@media (max-width: 1240px) {
  .w-50 {
    width: 28% !important;
  }
}

.cnpjSelectHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1.5rem;
}

.v-select .vs__selected-options {
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
}

.taxa-valor-container {
  gap: 16px;

  & > div {
    padding: 7px 12px!important;
    background-color: #EFF4F6!important;
    border-color: #BECAD4!important;
  }
}
.card-janela-contratacao {
  border: solid 1px #DAE1E8!important;

  .resumo-operacao{
    & > div {
      margin-bottom: 0px!important;
    }

    .taxa-efeitva {
      padding: 6px 12px!important;
    }
  }
}
</style>
