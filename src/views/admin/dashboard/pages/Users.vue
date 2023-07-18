<template>
  <b-card> asd </b-card>
</template>

<script>
import {
  BCard,
  BTable,
  BPagination,
  BButton,
  BRow,
  BCol,
  VBTooltip,
  BFormCheckbox,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import DatatableFiltersHandlerSidebar from '@/views/common/crud/components/DatatableFiltersHandlerSidebar.vue'
import EventBus from '@/services/event_bus'
import { exportToXLS } from '@/@core/comp-functions/export/xlsexport'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from '@validations'

export default {
  name: 'Users',
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
    BPagination,
    BButton,
    vSelect,
    BFormCheckbox,
    BInputGroup,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    DatatableFiltersHandlerSidebar,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss">
@import '@core/scss/base/pages/app-file-manager';
</style>
