<template>
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      <!-- <b-img src="@/assets/images/logo/logo-small.svg" /> -->
      <h2 class="brand-text text-primary ml-1">
        {{ appName }}
      </h2>
    </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">Sem permissão! 🔐</h2>
        <p class="mb-2">Você não tem permissão para acessar esta página.</p>
        <b-button variant="primary" class="mb-1 btn-sm-block" :to="loginRoute">
          Voltar para o dashboard
        </b-button>
        <b-img fluid :src="downImg" alt="Not authorized page" />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { BLink, BImg, BButton } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import { $themeConfig } from '@themeConfig'

export default {
  components: {
    BLink,
    BImg,
    BButton,
    VuexyLogo,
  },
  data() {
    return {
      downImg: require('@/assets/images/not-authorized.svg'),
    }
  },
  computed: {
    appName() {
      return $themeConfig.app.appName
    },
    loginRoute() {
      const user = this.$store.state.auth.userData
      return getHomeRouteForLoggedInUser(user?.type)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
