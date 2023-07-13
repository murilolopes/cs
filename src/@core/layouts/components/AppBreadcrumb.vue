<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header px-2"
  >
    <!-- Content Left -->
    <b-col class="content-header-left mb-2" cols="12" md="9">
      <b-row class="breadcrumbs-top">
        <b-col cols="12" class="d-flex align-items-center">
          <h1
            class="float-left pr-1 mb-0"
            :class="{ 'content-header-title': !$route.meta.skipGoToHome }"
          >
            {{ $route.meta.pageTitle }}
          </h1>
          <div class="breadcrumb-wrapper" v-if="!$route.meta.skipGoToHome">
            <b-breadcrumb>
              <b-breadcrumb-item to="/">
                <feather-icon
                  icon="HomeIcon"
                  size="16"
                  class="align-text-top"
                />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in $route.meta.breadcrumb"
                :key="item.text"
                :active="item.active"
                :to="item.to"
              >
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
        <b-col
          cols="12"
          class="d-flex align-items-center"
          v-if="$route.meta.pageSubtitle"
        >
          <h4 class="float-left pr-1 mt-1 mb-0">
            {{ $route.meta.pageSubtitle }}
          </h4>
        </b-col>
      </b-row>
    </b-col>

    <!-- Content Right -->
    <b-col
      v-if="$route.meta.actions?.length"
      class="content-header-right text-md-right d-md-block d-none mb-1"
      md="3"
      cols="12"
    >
      <b-button
        v-for="action in $route.meta.actions"
        :key="action.title"
        :variant="action.variant"
        :to="{ name: action.routeName }"
      >
        <feather-icon :icon="action.icon" class="mr-50" v-if="action.icon" />
        <span class="align-middle">{{ action.title }}</span>
      </b-button>
    </b-col>
  </b-row>
</template>

<script>
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BButton,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";

export default {
  directives: {
    Ripple,
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
  },
};
</script>
