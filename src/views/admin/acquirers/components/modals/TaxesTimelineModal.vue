<template>
  <b-modal ref="taxesTimelineModal" hide-footer centered header-bg-variant="white">
    <b-row align-v="start" align-h="center">
      <b-col cols="12">
        <b-row align-h="between">
          <b-col cols="6">
            <h4>Histórico de Taxas</h4>
          </b-col>
          <b-col cols="6">
            <feather-icon icon="CalendarIcon" size="20" class="mr-1" />
            <span>06/22/2020 - 06/22/2020</span>
          </b-col>
        </b-row>
        <b-row align-v="center" align-h="start">
          <b-col cols="12">
            <vue-apex-charts type="line"
                             height="179"
                             width="100%"
                             :options="chartOptions"
                             :series="chartData"
            />
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="12" class="border-top px-3 py-2">
        <b-row align-h="between" align-v="center">
          <b-col cols="6">
            <b-row align-h="start" align-v="center">
              <b-img :src="logo"
                     class="mr-3"
                     fluid
                     width="112.28px"
                     height="64px"
              />
            </b-row>
          </b-col>
          <b-col cols="6">
            <b-row align-h="end" align-v="center">
              <b-button variant="primary" @click="hideTaxesTimeline">
                Fechar
              </b-button>
            </b-row></b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script lang="ts">
import {
  BImg, BButton, BModal, BRow, BCol,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'

export default {
  name: 'AcquirerCard',
  components: {
    BImg,
    BButton,
    BModal,
    BRow,
    BCol,
    VueApexCharts,
  },
  props: {
    chartOptions: { type: Object, default: () => {} },
    chartData: {
      type: Array,
      default: () => [],
    },
    logo: { type: String, default: null },
  },
  methods: {
    hideTaxesTimeline() {
      this.$refs.taxesTimelineModal.hide()
    },
  },
}

</script>
