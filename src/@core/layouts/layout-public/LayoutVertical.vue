<template>
  <div
    class="vertical-layout h-100"
    :class="[layoutClasses]"
    :data-col="isNavMenuHidden ? '1-column' : null"
  >
    <b-navbar
      :toggleable="false"
      :variant="navbarBackgroundColor"
      class="header-navbar navbar navbar-shadow align-items-center"
      :class="[navbarTypeClass]"
    >
      <slot
        name="navbar"
        :toggleVerticalMenuActive="toggleVerticalMenuActive"
        :navbarBackgroundColor="navbarBackgroundColor"
        :navbarTypeClass="[
          ...navbarTypeClass,
          'header-navbar navbar navbar-shadow align-items-center',
        ]"
      >
        <app-navbar-vertical-layout />
      </slot>
    </b-navbar>

    <div class="app-content content">
      <div class="container">
        <div class="row content-header">
          <b-row class="mx-3 my-1">
            <b-col cols="10" class="pl-0">
              <h1 class="mb-1">{{ $route.meta.title }}</h1>
              <h4 class="mb-0">{{ $route.meta.subtitle }}</h4>
            </b-col>
            <b-col
              cols="2"
              class="pr-0 d-flex justify-content-end align-items-center"
            >
              <b-button
                v-for="(action, index) in $route.meta.actions"
                :key="index"
                :variant="action.variant"
                size="sm"
                class="d-flex align-items-center"
                @click="$router.push({ name: action.routeName })"
              >
                <feather-icon
                  v-if="action.icon"
                  :icon="action.icon"
                  size="22"
                  class="mr-1"
                />
                {{ action.title }}
              </b-button>
            </b-col>
          </b-row>
        </div>
      </div>

      <div class="content container">
        <transition :name="routerTransition" mode="out-in">
          <component
            :is="layoutContentRenderer"
            :key="
              layoutContentRenderer === 'layout-content-renderer-left'
                ? $route.meta.navActiveLink || $route.name
                : null
            "
          >
            <template
              v-for="(index, name) in $scopedSlots"
              v-slot:[name]="data"
            >
              <slot :name="name" v-bind="data" />
            </template>
          </component>
        </transition>
      </div>
    </div>

    <footer class="footer-light footer-sticky">
      <app-footer />
    </footer>
  </div>
</template>

<script>
import { onUnmounted } from "vue";
import AppNavbarVerticalLayout from "@core/layouts/components/app-navbar/AppNavbarVerticalLayout.vue";
import AppFooter from "@core/layouts/components/AppFooter.vue";
import useAppConfig from "@core/app-config/useAppConfig";
import LayoutContentRendererDefault from "@core/layouts/components/layout-content-renderer/LayoutContentRendererDefault.vue";
import LayoutContentRendererLeft from "@core/layouts/components/layout-content-renderer/LayoutContentRendererLeft.vue";
import LayoutContentRendererLeftDetached from "@core/layouts/components/layout-content-renderer/LayoutContentRendererLeftDetached.vue";
import { BRow, BCol, BButton, BNavbar } from "bootstrap-vue";
import VerticalNavMenu from "./components/vertical-nav-menu/VerticalNavMenu.vue";
import useVerticalLayout from "./useVerticalLayout";
import mixinVerticalLayout from "./mixinVerticalLayout";

export default {
  components: {
    BRow,
    BCol,
    BButton,
    AppNavbarVerticalLayout,
    AppFooter,
    VerticalNavMenu,
    BNavbar,
    LayoutContentRendererLeftDetached,
    LayoutContentRendererLeft,
    LayoutContentRendererDefault,
  },
  mixins: [mixinVerticalLayout],
  computed: {
    layoutContentRenderer() {
      const rendererType = this.$route.meta.contentRenderer;
      if (rendererType === "sidebar-left")
        return "layout-content-renderer-left";
      if (rendererType === "sidebar-left-detached")
        return "layout-content-renderer-left-detached";
      return "layout-content-renderer-default";
    },
  },
  setup() {
    const {
      routerTransition,
      navbarBackgroundColor,
      navbarType,
      footerType,
      isNavMenuHidden,
    } = useAppConfig();

    const {
      isVerticalMenuActive,
      toggleVerticalMenuActive,
      isVerticalMenuCollapsed,
      layoutClasses,
      overlayClasses,
      resizeHandler,
      navbarTypeClass,
      footerTypeClass,
    } = useVerticalLayout(navbarType, footerType);

    // Resize handler
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    onUnmounted(() => {
      window.removeEventListener("resize", resizeHandler);
    });

    return {
      isVerticalMenuActive,
      toggleVerticalMenuActive,
      isVerticalMenuCollapsed,
      overlayClasses,
      layoutClasses,
      navbarTypeClass,
      footerTypeClass,

      // App Config
      routerTransition,
      navbarBackgroundColor,
      isNavMenuHidden,
    };
  },
};
</script>

<style lang="scss">
@import "~@core/scss/base/themes/bordered-layout.scss";

.invisible-border {
  border: 1px solid transparent;
}
</style>
