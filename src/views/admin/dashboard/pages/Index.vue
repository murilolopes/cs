<template>
  <b-card>
    <div class="mb-2">
      <b-row class="d-flex flex-row justify-content-between align-items-center p-0">
        <b-col sm="12" md="4" lg="4">
          <h4 v-if="$route.meta.indexObject.datatableTitle">
            {{ $route.meta.indexObject.datatableTitle }}
          </h4>
        </b-col>
        <b-col class="d-flex flex-row justify-content-end align-items-center" sm="12" md="8" lg="8">
          <b-input-group class="input-group-merge mr-2 mw-100 w-25">
            <b-form-input placeholder="Buscar" v-model="search" />
            <b-input-group-append is-text>
              <feather-icon icon="SearchIcon" />
            </b-input-group-append>
          </b-input-group>
          <b-button
            class="d-flex mr-2"
            variant="primary"
            @click="$bvModal.show('newEconomicGroup')"
          >
            Criar novo cadastro
          </b-button>
          <div class="d-flex flex-row justify-content-end align-items-center">
            <label class="mb-0 mr-1">Mostrar</label>
            <v-select v-model="perPage" :options="perPageOptions" :clearable="false" />
            <label class="mb-0 mr-2 ml-1">registros</label>
            <div v-if="canShowFiltersButton" name="table-header-filter">
              <feather-icon
                icon="FilterIcon"
                size="24"
                class="cursor-pointer"
                @click="showFiltersButton = true"
              />
            </div>
            <slot name="table-header-actions" />
          </div>
        </b-col>
      </b-row>
    </div>

    <b-table
      id="my-table"
      ref="ccDatatable"
      outlined
      responsive
      :selectable="enableSelectableDatatable"
      class="position-relative text-center"
      :current-page="currentPage"
      :items="items"
      :fields="fields"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :filter="filter"
      :filter-included-fields="filterOn"
      :tbody-tr-class="rowClass"
      @filtered="onFiltered"
      @head-clicked="onHeadClicked"
    >
      <template #cell(actions)="data">
        <div v-if="$route.meta.indexObject.showModalOnAction">
          <feather-icon
            v-b-tooltip.hover
            icon="SearchIcon"
            class="cursor-pointer"
            size="28"
            title="Visualizar"
            @click.stop="showModalOnAction(data.item)"
          />
        </div>
        <router-link
          v-else
          tag="span"
          :to="{
            name: $route.meta.indexObject.editRouteName,
            params: { id: data.item.id },
          }"
          class="d-flex align-items-center justify-content-center text-center"
        >
          <feather-icon
            v-b-tooltip.hover
            icon="SearchIcon"
            class="cursor-pointer"
            size="28"
            title="Visualizar"
          />
        </router-link>
      </template>

      <template #cell()="data">
        <span
          class="d-flex align-items-center justify-content-center text-center text-nowrap"
          v-html="data.value"
        />
      </template>
    </b-table>

    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center mt-1">
        <b-button
          variant="flat-primary"
          class="mr-2"
          @click="excelExport"
          v-if="$route.meta.indexObject.showExcelExportButton"
          :disabled="!items.length"
        >
          Exportar para Excel
          <img class="img-icon" height="17" width="16" src="@/assets/images/export_icon.svg" />
        </b-button>
        <span v-show="items.length" class="mb-0 h5 mr-2"> {{ showing }} </span>
      </div>
      <div class="align-items-center mt-1 left-auto">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          first-number
          last-number
          class="mb-0"
          :disabled="!activePagination"
        >
          <template #prev-text>
            <feather-icon icon="ChevronLeftIcon" size="18" />
          </template>
          <template #next-text>
            <feather-icon icon="ChevronRightIcon" size="18" />
          </template>
        </b-pagination>
      </div>
    </div>

    <datatable-filters-handler-sidebar
      :is-task-handler-sidebar-active="showFiltersButton"
      @closeSideBar="showFiltersButton = false"
      @updateFilterValues="updateFilterValues"
    />

    <b-modal id="newEconomicGroup" centered hide-footer header-bg-variant="white">
      <div class="d-flex flex-column justify-content-center align-items-start">
        <h1 class="mb-2">Nome do Grupo econômico</h1>
        <validation-observer ref="newEconomicGroupForm" #default="{ invalid }" class="w-100">
          <b-form-group
            label="Crie um nome para o novo grupo econômico"
            label-for="name"
            class="d-flex flex-column mb-3"
          >
            <validation-provider #default="{ errors }" name="name" vid="name" rules="required">
              <b-form-input
                id="name"
                v-model="economicGroup"
                :state="errors.length > 0 ? false : null"
                name="name"
                class="w-100"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <div class="d-flex flex-row justify-content-start mt-1">
            <b-button
              variant="outline-primary"
              class="mb-1 mr-1"
              @click="$bvModal.hide('newEconomicGroup')"
            >
              Cancelar
            </b-button>
            <b-button
              variant="primary"
              class="mb-1 ml-2"
              @click="newEconomicGroup"
              :disabled="invalid"
            >
              Criar grupo econômico
            </b-button>
          </div>
        </validation-observer>
      </div>
    </b-modal>
  </b-card>
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
  name: 'GruposEconomicos',
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
  directives: {
    'b-tooltip': VBTooltip,
  },
  props: {
    filterValues: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      search: '',
      economicGroup: '',
      showTooltip: true,
      activePagination: false,
      datatableFilterValues: {},
      skipCurrentPage: true,
      skipGetData: false,
      showFiltersButton: false,
      selectedRows: [],
      storeOptions: [],
      typeOptions: [],
      perPage: 10,
      perPageOptions: [10, 25, 50],
      totalRows: 1,
      currentPage: 1,
      sortBy: 'created_at',
      sortDesc: true,
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      items: [],
      status: [
        {
          1: 'Current',
          2: 'Professional',
          3: 'Rejected',
          4: 'Resigned',
          5: 'Applied',
        },
        {
          1: 'light-primary',
          2: 'light-success',
          3: 'light-danger',
          4: 'light-warning',
          5: 'light-info',
        },
      ],
    }
  },
  computed: {
    enableSelectableDatatable() {
      return this.$route.meta.indexObject.fields?.some((f) => f.key === 'select')
    },
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter((f) => f.sortable).map((f) => ({ text: f.label, value: f.key }))
    },
    showing() {
      let start = this.currentPage === 1 ? 1 : (this.currentPage - 1) * this.perPage + 1
      let end = start === 1 ? this.perPage : start + this.perPage - 1
      if (end > this.totalRows) end = this.totalRows
      if (this.totalRows === 0) start = 0

      return `Mostrando de ${start} a ${end} de ${this.totalRows} registros`
    },
    fields() {
      const { fields } = this.$route.meta.indexObject

      if (this.$route.meta.indexObject.actions) {
        fields.push({ key: 'actions', label: '', sortable: false })
      }

      return fields
    },

    hasPaymentField() {
      return this.$route.meta.indexObject.fields.some((field) => field.key === 'payment')
    },
    params() {
      let params = {
        per_page: this.perPage,
        page: this.currentPage,
      }

      if (Object.keys(this.datatableFilterValues).length) {
        params = { ...params, ...this.datatableFilterValues }
      }

      return params
    },
    canShowFiltersButton() {
      return this.$route.meta.indexObject.filters && this.$route.meta.indexObject.filters.length > 0
    },
  },
  watch: {
    $route() {
      this.clearDatatable()
      this.getData()
    },
    perPage: {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.currentPage = 1
          this.skipCurrentPage = false
        }
      },
      immediate: true,
    },
    params(newValue, oldValue) {
      if (newValue !== oldValue) this.getData()
    },
  },
  mounted() {
    this.getData()
  },
  methods: {
    newEconomicGroup() {
      console.log(1, this.economicGroup)
    },
    excelExport() {
      const keys = this.$route.meta.indexObject.fields.map((item) => {
        return item.hasOwnProperty('exportKey') ? item.exportKey : item.key
      })

      function getNestedProp(obj, path) {
        return path.split('.').reduce((o, p) => (o || {})[p], obj)
      }

      function dynamicDestructuring(obj, keys) {
        return keys.reduce((newObj, key) => {
          const value = getNestedProp(obj, key)
          if (value !== undefined) newObj[key] = value

          return newObj
        }, {})
      }

      let result = []

      this.items.filter((item, index) => {
        result.push(dynamicDestructuring(item, keys))
      })

      return exportToXLS(result, this.$route.meta.pageTitle)
    },
    changeSelectedRows(selectedRows) {
      this.selectedRows = selectedRows
    },
    showModalOnAction(item) {
      EventBus.$emit('show-modal-on-action', item)
    },
    toggleSelectedAllRows($event) {
      this.$refs.ccDatatable[$event === true ? 'selectAllRows' : 'clearSelected']()
    },
    onRowSelected(items) {
      this.selectedRows = items
      this.$emit('changeSelectedRows', items)
    },
    selectRow(row, value) {
      this.$refs.ccDatatable[value ? 'selectRow' : 'unselectRow'](row.index)
    },
    async getData() {
      this.activePagination = false
      if (this.skipGetData) {
        this.skipGetData = false
        this.getData()
        return
      }

      const params = {
        path: this.$route.meta.indexObject.serviceUrl,
        data: this.params,
      }

      params.data.sort = `${this.sortBy}|${this.sortDesc ? 'desc' : 'asc'}`

      try {
        const { data } = await this.$store.dispatch('app/getIndexData', params)
        this.items = data.data
        this.perPage = data.per_page
        this.totalRows = data.total
        if (!this.skipCurrentPage) this.currentPage = data.current_page
        this.skipCurrentPage = true
        this.activePagination = true
      } catch (error) {
        console.log(error)
      }
    },
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.currentPage = 1
    },
    refreshStop(cardName) {
      setTimeout(() => {
        this.$refs[cardName].showLoading = false
      }, 3000)
    },
    clearDatatable() {
      this.perPage = 10
      this.items = []
      this.totalRows = 0
      this.currentPage = 1
      this.sortBy = 'created_at'
    },
    showFiltersComponent() {
      this.$emit('show-filters-component')
    },
    refresh() {
      this.clearDatatable()
      this.getData()
    },
    rowClass(item, type) {
      if (!item || type !== 'row') return

      if (!item.quitacao) return

      if (this.checkPaymentStatus(item)) return 'table-warning'

      return ''
    },
    checkPaymentStatus(item) {
      return ['Aguardando pagamento', 'Vencida'].includes(item.quitacao)
    },
    updateFilterValues(values) {
      this.datatableFilterValues = values
    },
    async onHeadClicked(field, event) {
      if (this.sortBy === field) {
        this.sortDesc = !this.sortDesc
        await this.getData()
        return
      }
      this.sortBy = field
      this.sortDesc = false
      await this.getData()
    },
  },
}
</script>

<style lang="scss">
#my-table th {
  background-color: #eff4f6;
  color: #242a32;
}

#my-table .table-warning,
#my-table .table-warning > th,
#my-table .table-warning > td {
  background-color: #f8944d12;
}

.mw-100 {
  max-width: 50px;
  min-width: 50px;
}
</style>
