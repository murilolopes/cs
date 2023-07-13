<template>
  <div>
    <b-sidebar
      id="sidebar-task-handler"
      sidebar-class="sidebar-lg"
      :visible="isTaskHandlerSidebarActive"
      bg-variant="white"
      shadow
      backdrop
      no-header
      right
      @hidden="(val) => $emit('closeSideBar')"
    >
      <template #default="{ hide }">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
          <h5 class="mb-0"> Filtros avançados </h5>
          <feather-icon class="ml-1 cursor-pointer" icon="XIcon" size="16" @click="hide" />
        </div>

        <filters @updateFilterValues="updateFilterValues" />

      </template>
    </b-sidebar>
  </div>
</template>

<script>
import { BSidebar, BButton } from 'bootstrap-vue'
import Filters from '@/views/common/crud/components/Filters.vue'

export default {
  components: {
    BButton,
    BSidebar,
    Filters,
  },
  props: {
    isTaskHandlerSidebarActive: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  methods:{
    updateFilterValues(values) {
      this.$emit('updateFilterValues', values)
    }
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/quill.scss';

#sidebar-task-handler {
  .content-sidebar-header {
    background-color: #EFF4F6;
  }
}
</style>
