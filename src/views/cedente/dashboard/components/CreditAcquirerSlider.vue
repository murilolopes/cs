<template>
  <b-row>
    <b-col sm="12">
      <div class="d-flex flex-row align-items-center pb-2 mb-2">
        <div class="d-flex flex-column justify-content-center align-items-center w-25 text-center">
          <b-img
            height="36px"
            width="104px"
            :src="acquirer.logo"
            alt="Logo da credenciadora"
          />
          <p>{{ acquirer.name }}</p>
          <h3>Taxa de {{ acquirer.tax }}%</h3>
        </div>
        <div class="d-flex flex-column align-items-start p-0 w-75">
          <div v-if="!disabledSlider" class="d-flex flex-row justify-content-between align-items-start p-0 w-100">
            <p class="mb-0">
              Selecionado
            </p>
            <p class="mb-0">
              Total disponível
            </p>
          </div>
          <div v-else class="d-flex flex-row justify-content-between align-items-center w-100">
            <p class="mb-0">
              {{ disabledMessage }}
            </p>
            <b-button v-if="successWebhook" variant="outline-primary" size="sm" @click="goToSolicitation">
              Saiba mais
            </b-button>
          </div>
          <vue-slider
            v-model="acquirer.selectedValue"
            :min="0"
            :tooltip-formatter="(val) => moneyFormat(val, 0)"
            :max="acquirer.totalAmountValue"
            :interval="1000"
            class="w-100 mt-1 mb-1 cc-slider"
            :lazy="true"
            :disabled="disabledSlider"
          />
          <div class="d-flex flex-row justify-content-between align-items-start w-100 mb-0">
            <div class="d-flex align-items-center">
              <validation-provider
                #default="{ errors }"
                name="selectedValue"
                vid="selectedValueInput"
                rules="multipleOf1000"
              >
                <b-form-input
                  id="selectedValueInput"
                  v-model="acquirer.selectedValueInput"
                  :disabled="disabledSlider"
                  class="w-100 text-dark"
                  :state="errors.length > 0 ? false : null"
                  name="selectedValueInput"
                  @blur="updateSelectedValueInput"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>

              <b-badge v-if="acquirer.effective_tax > 0" variant="light-warning" class="ml-1 border-warning text-black">
                Taxa efetiva {{ effectiveTax }}
              </b-badge>
            </div>
            <validation-provider
              #default="{ errors }"
              name="totalAmountValue"
              vid="totalAmountValue"
              rules="multipleOf1000"
            >
              <b-form-input
                id="totalAmountValueInput"
                v-model="acquirer.totalAmountValueInput"
                class="w-100"
                :state="errors.length > 0 ? false : null"
                name="totalAmountValueInput"
                disabled
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </div>
        </div>
      </div>
    </b-col>

    <b-col sm="12" class="pl-3 pr-2 mt-0 mb-1">
      <b-card-actions title="Valor acumulado no período" action-collapse collapsed class="card-actions-border">
        <vue-apex-charts
          v-if="cumulativeAmountChartSeries[0].data.length > 0"
          height="200"
          :options="urs.chartOptions"
          :series="cumulativeAmountChartSeries"
        />
      </b-card-actions>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BImg, BFormInput, BButton, BBadge,
} from 'bootstrap-vue'
import VueSlider from 'vue-slider-component'
import { moneyFormat, percentageFormatter } from '@core/comp-functions/data_visualization/datatable'
import { brlToFloat } from '@core/comp-functions/money/money'
import { ValidationProvider } from 'vee-validate'
import { multiple1000 } from '@validations'
import { BCardActions } from '@/@core/components/b-card-actions'
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'CreditAcquirerSlider',
  components: {
    BCardActions,
    BBadge,
    BRow,
    BCol,
    BImg,
    BButton,
    VueSlider,
    BFormInput,
    ValidationProvider,
    VueApexCharts,
  },
  props: {
    acquirerData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      acquirer: null,
      multiple1000,
      urs: {
        chartOptions: {
          chart: {
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
          },
          grid: {
            xaxis: {
              lines: {
                show: true,
              },
            },
          },
          yaxis: {
            labels: {
              formatter(value) {
                return moneyFormat(value)
              },
            },
          },
          xaxis: {
            type: 'datetime',
            labels: {
              format: 'dd/MM',
            },
          },
          tooltip: {
            shared: false,
          },
          colors: ['#3FE4A9'],
        },
      },
    }
  },
  computed: {
    effectiveTax() {
      return percentageFormatter(parseFloat(this.acquirer.effective_tax))
    },
    successWebhook() {
      return this.acquirer.inProgressSolicitation?.status === 'sucesso_webhook'
    },
    disabledSlider() {
      return ['sucesso_webhook', 'confirmado', 'solicitada', 'enviada_cerc'].includes(this.acquirer.inProgressSolicitation?.status)
    },
    disabledMessage() {
      const message = {
        solicitada: 'Aguarde, solicitação em andamento.',
        confirmado: 'Já foi feita uma solicitação para a credenciadora hoje',
        enviada_cerc: 'Aguarde, solicitação em andamento.',
        sucesso_webhook: 'Já existe uma solicitação em andamento',
      }
      return message[this.acquirer.inProgressSolicitation?.status]
    },
    cumulativeAmountChartSeries() {
      const seriesData = []
      this.acquirerData.cumulativeAmount.map(item => seriesData.push(
        { x: item.data_vencimento, y: JSON.parse(item.valor_acumulado) },
      ))
      return [{
        name: 'Valor Acumulado',
        data: seriesData,
      }]
    },

  },
  watch: {
    // eslint-disable-next-line no-unused-vars, func-names
    'acquirer.selectedValue': function (newValue, oldValue) {
      if (newValue > this.acquirer.totalAmountValue) this.acquirer.selectedValueInput = moneyFormat(this.acquirer.totalAmountValue, 0)
      this.acquirer.selectedValueInput = moneyFormat(newValue, 0)
      // this.getEffectiveTax(newValue);
      this.$emit('selected-from-slider')
    },
  },
  created() {
    this.acquirer = this.acquirerData
  },
  methods: {
    refreshComponent() {
      this.acquirer = this.acquirerData
    },
    goToSolicitation() {
      this.$router.push({ name: 'antecipacoes.details', params: { id: this.acquirer.inProgressSolicitation.id } })
    },
    moneyFormat(value, minimumFractionDigits = 2) {
      return moneyFormat(parseInt(value, 10), minimumFractionDigits)
    },
    updateSelectedValueInput($event) {
      let { value } = $event.target
      if (typeof value === 'string') {
        if (brlToFloat(value) > this.acquirer.totalAmountValue) value = moneyFormat(this.acquirer.totalAmountValue, 0)
        this.acquirer.selectedValue = brlToFloat(value)
      }
      this.$emit('selected-from-input')
      this.$emit('blur', value)
    },
    async getEffectiveTax(newValue) {
      if (newValue === 0) return

      const payload = {
        credenciadora_id: this.acquirer.id,
        valor_solicitacao: newValue,
      }
      const { data } = await this.$store.dispatch('dashboard/getEffectiveTax', payload)

      this.$emit('effective-tax', { credenciadora_id: this.acquirer.id, effective_tax: data.taxa_efetiva_prevista })
    },
  },
}
</script>

<style lang="scss">
.cc-slider {
  height: 8px!important;
}

.vue-slider-dot-handle {
  background-color: #3FE4A9!important;
}

.card-actions-border {
  border: 1px solid #c4ced6;
  border-radius: 6px;

  .card-title {
    display: flex;
    align-items: center;
  }

  .card-title::before {
    content: " ";
    margin-left: 1rem;
    margin-right: 1rem;
    display: flex;
    width: 1rem;
    height: 1rem;
    background: #3FE4A9;
    border-radius: 50%;
  }

  .logo-image {
  height: 36px;
  width: 104px;
  object-fit: cover;
}
}
</style>
