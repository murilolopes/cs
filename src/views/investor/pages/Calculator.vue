<template>
  <div>calculadora</div>
</template>

<script>
import { moneyFormat } from '@/@core/comp-functions/data_visualization/datatable'
import { formatDate } from '@core/utils/filter'
import {
  BRow,
  BCol,
  BImg,
  BCard,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
  BFormInput,
  BButton,
  BButtonGroup,
  BPagination,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { mask } from 'vue-the-mask'

export default {
  name: 'Calculator',
  components: {
    BRow,
    BCol,
    BImg,
    BCard,
    BInputGroup,
    BButton,
    BButtonGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    vSelect,
    BFormInput,
    BPagination,
  },
  directives: { mask },
  filters: {
    moneyFormat,
    formatDate,
  },
  data() {
    return {}
  },
}
</script>
