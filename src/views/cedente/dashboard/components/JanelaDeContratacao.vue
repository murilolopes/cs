<template>
  <div v-bind:class="getClass()">
    <div>
      <span class="text-color semi-bold">Janela de contratação</span>
      <div class="d-flex align-items-center">
        <b-badge v-if="available" pill class="mr-1 badge text-color bold space-elements-10">Aberta</b-badge>
        <b-badge v-if="!available" pill class="mr-1 badge-un text-color bold space-elements-10">Fechada</b-badge>
        <feather-icon
          icon="InfoIcon"
          size="18"
          color="#093272"
          class="space-elements-10"
          id="tooltip-info-icon"
        />
        <b-tooltip class="blue-tip" target="tooltip-info-icon" triggers="hover" placement="right">
          Horário permitido para agendamento de antecipação de recebíveis de cartões de crédito é de segunda a sexta-feira, das 10:00 às 21:00 horas.
        </b-tooltip>
      </div>
    </div>
    <div>
      <p v-if="available" class="text-color normal mb-0 text-align-end">Termina em:</p>
      <p v-if="!available" class="text-color normal mb-0 text-align-end">Começa em:</p>
      <div class="d-flex align-items-center">
        <feather-icon
            icon="ClockIcon"
            size="18"
            color="#66788B"
            class="mr-1"
          />
        <h4 class="text-color semi-bold space-elements-6">{{ formatedCountdown }}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { BLink, BCard, BRow, BCol, BBadge, BTooltip } from 'bootstrap-vue'

export default {
  components: {
    BLink,
    BCard,
    BRow,
    BCol,
    BBadge,
    BTooltip
  },
  data() {
    return {
      countdown: 0,
      available: true,
    }
  },
  beforeMount() {
    const todayNineAM = new Date();
    todayNineAM.setHours('10');
    todayNineAM.setMinutes('00');

    const todayNinePM = new Date();
    todayNinePM.setHours('21');
    todayNinePM.setMinutes('00');

    var date = new Date()
    if(date >= todayNineAM && date < todayNinePM) {
      this.countdown = (todayNinePM - date) / 1000
      this.available = true;
    } else {
      this.countdown = (todayNineAM - date) / 1000
      this.available = false;
    }
  },
  mounted() {
    const stopCountdown = setInterval(() => {
      this.countdown -= 1
      if (!this.countdown) clearInterval(stopCountdown)
    }, 1000)
  },
  computed: {
    formatedCountdown() {
      var date = new Date(0);
      date.setSeconds(this.countdown);
      var timeString = date.toISOString().substring(11, 19);
      return timeString
    }
  },
  methods: {
    getClass() {
      if(this.available) {
        return "d-flex justify-content-between component-box"
      } else {
        return "d-flex justify-content-between component-box-un"
      }
    },
    hoverInfoIconHandler() {

    }
  }
}
</script>

<style>
.badge {
  background-color: rgba(63, 228, 169, 0.16);
  border: 1px solid #3FE4A9;
}
.badge-un {
  background-color: rgba(252, 6, 94, 0.1);
  border: 1px solid #FC065E;
}
.component-box {
  background-color: rgba(63, 228, 169, 0.16);
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #3FE4A9;
}
.component-box-un {
  background-color: rgba(252, 6, 94, 0.1);
  padding: 10px 12px;
  border-radius: 6px;
  border: 1px solid #FC065E;
}
.text-color {
  color: #333D4A;
}
.semi-bold {
  font-weight: 500;
}
.bold {
  font-weight: 600;
}
.normal {
  font-weight: 400;
}
.space-elements-10 {
  margin-top: 10px;
}
.space-elements-6 {
  margin-top: 6px;
}
.text-align-end {
  text-align-last: end;
}
.tooltip-inner {
    background-color: #66788B;
}
.tooltip.bs-tooltip-right .arrow:before {
    border-right-color: #66788B !important;
}
</style>
