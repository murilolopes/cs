<template>
  <b-row align-v="center" align-h="start">
    <b-col cols="12" class="w-100 h-100">
      <vue-apex-charts type="line"
                       height="240px"
                       width="100%"
                       :options="options"
                       :series="chartData"
      />
    </b-col>
  </b-row>
</template>

<script lang="ts">
import {
  BRow, BCol,
} from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { moneyFormat } from '@/@core/comp-functions/data_visualization/datatable'

export default {
  name: 'GraficoValorAcumulado',
  components: {
    BRow,
    BCol,
    VueApexCharts,
  },
  props: {
    chartData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: {
        chart: {
          id: 'valor-acumulado-no-periodo',
          toolbar: {
            show: false,
          },
        },
        legend: {
          position: 'top',
          verticalAlign: 'top',
          horizontalAlign: 'start',
          showForSingleSeries: true,
          fontSize: '14px',
          fontFamily: 'Montserrat',
          containerMargin: {
            left: 40,
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
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        colors: ['#3FE4A9'],
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
      },
    }
  },
}

</script>
