<template>
  <b-card>
    <div class="mb-2">
      <b-row class="d-flex flex-row justify-content-between align-items-center p-0">
        <b-col sm="12" md="8" lg="8">
          <h4 v-if="$route.meta.indexObject?.datatableTitle">{{ $route.meta.indexObject.datatableTitle }}</h4>
          <slot v-else name="table-caption" />
        </b-col>
        <b-col class="d-flex flex-row align-items-center justify-content-end px-1" sm="12" md="4" lg="4">
          <slot name="table-header-actions"></slot>

          <div name="table-header-filter" v-if="canShowFiltersButton" class="mr-2 ml-2">
            <feather-icon icon="FilterIcon" size="24" @click="showFiltersButton = true" class="cursor-pointer" />
          </div>
          <label class="mb-0 mr-1">Mostrar</label>
          <v-select v-model="perPage" :options="perPageOptions" :clearable="false"
            class="per-page-selector d-flex flex-column mr-1" />
          <label class="mb-0">registros</label>
        </b-col>
      </b-row>
    </div>

    <acquirer-card v-for="(acquirer, index) in acquirers" :key="index" :acquirer-data="acquirer" editable />

    <div>
      <b-row class="mt-2">
        <b-col cols="12" sm="9" class="d-flex align-items-center justify-content-center justify-content-sm-start">
          <span class="text-muted"> {{ showing }} </span>
        </b-col>
        <b-col cols="12" sm="3" class="d-flex align-items-center justify-content-center justify-content-sm-end">
          <b-pagination v-model="currentPage" :total-rows="totalRows" :per-page="perPage" first-number last-number
            prev-class="prev-item" next-class="next-item" class="mb-0" aria-controls="my-table" :disabled="!activePagination">
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>

    <datatable-filters-handler-sidebar :is-task-handler-sidebar-active="showFiltersButton" @closeSideBar="showFiltersButton = false" @updateFilterValues="updateFilterValues" />
  </b-card>
</template>

<script>
import {
  BButton,
  BBadge,
  BCard,
  BRow,
  BCol,
  VBTooltip,
  BPagination,
} from "bootstrap-vue";
import vSelect from "vue-select";
import DatatableFiltersHandlerSidebar from '@/views/common/crud/components/DatatableFiltersHandlerSidebar.vue';

import AcquirerCard from '@views/admin/acquirers/components/AcquirerCard.vue'

export default {
  name: 'OnboardingFollowUpIndex',
  components: {
    BButton,
    AcquirerCard,
    BRow,
    BCol,
    BCard,
    vSelect,
    BPagination,
    DatatableFiltersHandlerSidebar,
  },
  directives: {
    "b-tooltip": VBTooltip,
  },
  data() {
    return {
      activePagination: false,
      acquirers: [],
      datatableFilterValues: {},
      skipCurrentPage: true,
      showFiltersButton: false,
      perPage: 5,
      perPageOptions: [5, 10, 20, 50],
      totalRows: 1,
      currentPage: 1,
      sortBy: 'created_at',
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      this.activePagination = false
      let params = { ...this.params }

      params.sort = `${this.sortBy}|${this.sortDesc ? "desc" : "asc"}`

      const { data } = await this.$store.dispatch('credenciadora/fetchAll', params)
      this.acquirers = data.data
      this.perPage = data.per_page || 5
      this.totalRows = data.total
      if (!this.skipCurrentPage) this.currentPage = data.current_page
      this.skipCurrentPage = true
      this.activePagination = true
    },
    showFiltersComponent() {
      this.$emit("show-filters-component");
    },
    refresh() {
      this.getData();
    },
    updateFilterValues(values) {
      this.datatableFilterValues = values;
    },
  },
  computed: {
    showing() {
      let start =
        this.currentPage === 1 ? 1 : (this.currentPage - 1) * this.perPage + 1;
      let end = start === 1 ? this.perPage : start + this.perPage - 1;
      if (end > this.totalRows) end = this.totalRows;
      if (this.totalRows === 0) start = 0

      return `Mostrando de ${start} a ${end} de ${this.totalRows} registros`;
    },
    params() {
      let params = {
        per_page: this.perPage,
        page: this.currentPage,
      };

      if (Object.keys(this.datatableFilterValues).length) params = { ...params, ...this.datatableFilterValues };

      return params;
    },
    canShowFiltersButton() {
      return (
        this.$route.meta.indexObject?.filters &&
        this.$route.meta.indexObject?.filters.length > 0
      );
    },
  },
  watch: {
    $route() {
      this.getData();
    },
    perPage: {
      handler(newValue, oldValue) {
        if (newValue == oldValue) {
          this.currentPage = 1;
          this.skipCurrentPage = false;
        }
      },
      immediate: true,
    },
    params(newValue, oldValue) {
      if (newValue != oldValue) this.getData()
    },
  },
}

</script>

<style lang="scss">
.per-page-selector { min-width: 80px; }

.div-divider > div:not(:last-child) {
  position: relative;
}

.div-divider > div:not(:last-child)::after {
  content: "";
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #DAE1E8;
}

.div-divider > div {
  margin: 1rem 0 1rem 1rem;
  padding-right: 1rem;
}

.underline {
  text-decoration: underline;
  text-decoration-color: #003B65;
}

.line-styles {
  border: 1px solid #DAE1E8;
  border-radius: 6px;
}
</style>
