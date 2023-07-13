<template>
  <b-badge :class="types[type].class" >{{ types[type].label }}</b-badge>
</template>

<script>
import { BBadge } from 'bootstrap-vue'

export default {
  name: 'RepresentativeType',
  components: {
    BBadge
  },
  props: {
    type: {
      type: String,
      default: 'socio'
    },
  },
  data() {
    return {
      types: {
        diretor: {
          label: 'Diretor',
          class: 'badge-warning alert-warning text-warning border-warning'
        },
        socio: {
          label: 'Sócio',
          class: 'badge-info alert-info text-info border-info'
        },
        procurador: {
          label: 'Procurador',
          class: 'badge-dark alert-dark text-dark border-dark'
        }
      }
    };
  },
};
</script>