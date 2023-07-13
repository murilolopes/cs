<template>
  <div id="app" class="h-100">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { $themeColors, $themeBreakpoints, $themeConfig } from '@themeConfig'
import { provideToast } from 'vue-toastification/composition'
import { useCssVar } from '@vueuse/core'

const LayoutFirstAccess = () => import('@/layouts/first-access/LayoutFirstAccess.vue')
const LayoutVertical = () => import('@/layouts/vertical/LayoutVertical.vue')
const LayoutAuth = () => import('@/layouts/auth/LayoutAuth.vue')
const LayoutFull = () => import('@/layouts/full/LayoutFull.vue')

export default {
  components: {
    LayoutFirstAccess,
    LayoutVertical,
    LayoutFull,
    LayoutAuth,
  },
  computed: {
    layout() {
      if (this.$route.meta.layout === 'first-access') return 'layout-first-access'
      if (this.$route.meta.layout === 'auth') return 'layout-auth'
      if (this.$route.meta.layout === 'full') return 'layout-full'
      return 'layout-vertical'
    },
  },
  beforeCreate() {
    const colors = [
      'primary',
      'secondary',
      'success',
      'info',
      'warning',
      'danger',
      'light',
      'dark',
    ]

    for (let i = 0, len = colors.length; i < len; i++) {
      $themeColors[colors[i]] = useCssVar(
        `--${colors[i]}`,
        document.documentElement,
      ).value.trim()
    }

    // Set Theme Breakpoints
    const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl']

    for (let i = 0, len = breakpoints.length; i < len; i++) {
      $themeBreakpoints[breakpoints[i]] = Number(
        useCssVar(
          `--breakpoint-${breakpoints[i]}`,
          document.documentElement,
        ).value.slice(0, -2),
      )
    }

    document.documentElement.setAttribute('dir', 'ltr')
  },
  setup() {
    const { enableScrollToTop } = $themeConfig.layout

    // Provide toast for Composition API usage
    // This for those apps/components which uses composition API
    // Demos will still use Options API for ease
    provideToast({
      hideProgressBar: true,
      closeOnClick: false,
      closeButton: false,
      icon: false,
      timeout: 3000,
      transition: 'Vue-Toastification__fade',
    })

    return {
      enableScrollToTop,
    }
  },
}
</script>

<style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  @import '@core/scss/vue/libs/vue-multiselect.scss';
</style>
