<template>
  <div>
    <b-row>
      <b-col>
        <Datatable @show-filters-component="showFiltersComponent()" :filterValues="filterValues" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCard, BFormGroup, BRow, BCol } from 'bootstrap-vue';
import Datatable from '../components/Datatable.vue';

export default {
  name: 'IndexUser',
  components: {
    BRow,
    BCol,
    BCard,
    BFormGroup,
    Datatable,
  },
  data() {
    return {
      showFilters: false,
      filterValues: [],
    };
  },
  computed: {},
  methods: {
    showFiltersComponent() {
      this.showFilters = !this.showFilters;
    },
    changeFilterValues(params) {
      this.filterValues = params;
    },
  },
};
</script>
