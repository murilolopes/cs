<template>
  <b-card class="d-flex flex-row align-items-center cc-bg-light py-1 px-2" no-body>
    <div class="d-flex flex-row align-items-center p-0 border-right">
      <b-img :src="acquirerData.logo"
             class="mr-3"
             fluid
             width="112.28px"
             height="64px"
      />
    </div>
    <div class="d-flex flex-row justify-content-between align-items-center p-0 ml-2 w-100">
      <div class="d-flex flex-row align-items-center p-0">
        <div class="d-flex flex-column align-items-center p-0 mr-3">
          <div class="d-flex flex-column align-items-start p-0">
            <span :class="{ 'disabled': !acquirerData.enable }">Nome Fantasia</span>
            <h6 :class="{ 'disabled': !acquirerData.enable }">
              {{ acquirerData.nome_fantasia }}
            </h6>
          </div>
        </div>
        <div class="d-flex flex-column align-items-center p-0">
          <div class="d-flex flex-column align-items-start p-0">
            <span :class="{ 'disabled': !acquirerData.enable }">CNPJ</span>
            <h6 :class="{ 'disabled': !acquirerData.enable }">
              {{ acquirerData.cnpj | cnpjFormatter }}
            </h6>
          </div>
        </div>
        <div class="d-flex flex-row align-items-end p-0 ml-3">
          <div class="d-flex flex-column align-items-center p-0">
            <div class="d-flex flex-column align-items-start p-0">
              <span :class="{ 'disabled': !acquirerData.enable }">Taxa global</span>
              <h6 :class="{ 'disabled': !acquirerData.enable }">
                {{ updatedTaxaJurosPadrao | percentageFormatter }}
              </h6>
            </div>
          </div>
          <b-button variant="link" @click="showTaxesTimeline">
            <feather-icon icon="LayersIcon" size="20" />
          </b-button>
          <b-button variant="link" :disabled="!acquirerData.enable" @click="showTaxEdition">
            <feather-icon icon="Edit3Icon" size="20" />
          </b-button>
        </div>
      </div>
      <div class="d-flex flex-row justify-content-end align-items-center p-0">
        <div class="d-flex flex-row align-items-start p-0 mr-2">
          <b-form-checkbox v-model="acquirerData.enable"
                           class="custom-control-success"
                           name="enable-button"
                           switch
                           @change="updateState"
          >
            <span class="switch-icon-left"><feather-icon icon="CheckIcon" /></span>
            <span class="switch-icon-right"><feather-icon icon="XIcon" /></span>
          </b-form-checkbox>
          Apto para operar
        </div>
        <b-button v-if="editable"
                  variant="outline-primary"
                  size="sm"
                  @click="$router.push({ name: 'admin-credenciadoras.show', params: { id: acquirerData.id } })"
        >
          Editar
        </b-button>
      </div>
    </div>
    <taxes-timeline-modal ref="taxesTimelineModal"
                          :chart-data="computedSeries"
                          :chart-options="options"
                          :logo="acquirerData.logo"
    />
    <tax-edition-modal ref="taxEditionModal"
                       :current-acquirer-id="acquirerData.id"
                       :current-tax="acquirerData.taxa_juros_padrao"
                       @update="handleGlobalTaxUpdate"
    />
    <change-enable-modal ref="changeEnableModal"
                         :current-acquirer-id="acquirerData.id"
                         :current-enable-state="acquirerData.enable"
                         @cancel="handleEnable"
    />
  </b-card>
</template>

<script>
import {
  BCard, BImg, BButton, BFormCheckbox,
} from 'bootstrap-vue'
import { cnpj as cnpjFormatter, percentageFormatter } from '@core/comp-functions/data_visualization/datatable'
import TaxesTimelineModal from '@views/admin/acquirers/components/modals/TaxesTimelineModal.vue'
import TaxEditionModal from '@views/admin/acquirers/components/modals/TaxEditionModal.vue'
import ChangeEnableModal from '@views/admin/acquirers/components/modals/ChangeEnableModal.vue'

export default {
  name: 'AcquirerCard',
  components: {
    BCard,
    BImg,
    BButton,
    BFormCheckbox,
    TaxesTimelineModal,
    TaxEditionModal,
    ChangeEnableModal,
  },
  filters: { cnpjFormatter, percentageFormatter },
  props: { acquirerData: { type: Object, default: () => { } }, editable: Boolean },
  data() {
    return {
      options: {
        chart: {
          id: 'taxes-timeline',
          toolbar: {
            show: false,
          },
        },
        legend: {
          position: 'top',
          verticalAlign: 'top',
          horizontalAlign: 'start',
          showForSingleSeries: true,
          containerMargin: {
            left: 35,
            right: 60,
          },
        },
        markers: {
          size: 0,
        },
        stroke: {
          width: 5,
          curve: 'smooth',
        },
        grid: {
          row: {
            colors: ['transparent', 'transparent'],
            opacity: 0.5,
          },
        },
        colors: ['#3FE4A9'],
        yaxis: {
          labels: {
            formatter(value) {
              return `${value.toFixed(1)}%`
            },
          },
        },
        xaxis: {
          type: 'datetime',
          labels: {
            format: 'dd/MM',
          },
        },
      },
      taxesData: [],
      taxaJurosPadrao: this.acquirerData.taxa_juros_padrao,
    }
  },
  computed: {
    computedSeries() {
      const taxesByDate = []
      this.taxesData.map(item => taxesByDate.push({ x: item.date, y: JSON.parse(item.taxa_juros_padrao) }))
      return [{
        name: 'Taxa Global',
        data: taxesByDate,
      }]
    },
    updatedTaxaJurosPadrao() {
      return this.taxaJurosPadrao
    },
  },
  methods: {
    async showTaxesTimeline() {
      await this.$refs.taxesTimelineModal.$refs.taxesTimelineModal.show()
      const { data } = await this.$store.dispatch('credenciadora/fetchTaxesHistory', this.acquirerData.id)
      this.taxesData = data
    },
    showTaxEdition() {
      this.$refs.taxEditionModal.$refs.taxEditionModal.show()
    },
    handleGlobalTaxUpdate(taxaJurosPadrao) {
      this.taxaJurosPadrao = taxaJurosPadrao
    },
    handleEnable(currentEnableState) {
      this.acquirerData.enable = currentEnableState
    },
    updateState() {
      this.$refs.changeEnableModal.$refs.changeEnableModal.show()
    },
  },
}

</script>

<style lang="scss">

.disabled {
  color: #B4C0CC;
}

</style>
