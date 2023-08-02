<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <b-col
        xm="6"
        sm="6"
        lg="5"
        xl="4"
        class="login-bg-cc d-flex flex-column justify-content-center align-items-center p-2"
      >
        <div class="px-5 d-flex flex-column align-items-center">
          <b-img fluid :src="$route.meta.layoutPage.appLogoGrande" alt="register Side Image" />
          <h4 class="mt-3 mb-5 side-bg-text">
            Unimos tecnologia para dar autonomia de dados para Investidores, Cedentes e fornecedores
            parceiros.
          </h4>
          <b-img fluid :src="$route.meta.layoutPage.cardToMoney" alt="register Side Image" />
        </div>
      </b-col>

      <b-col xm="6" sm="6" lg="7" xl="8" class="d-flex auth-bg auth-padding">
        <router-view />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import LayoutFull from '@core/layouts/layout-full/LayoutFull.vue'
import { BRow, BCol, BImg } from 'bootstrap-vue'

export default {
  components: {
    LayoutFull,
    BRow,
    BCol,
    BImg,
  },
}
</script>

<style lang="scss">
.login-bg-cc {
  background: #242a32;
}

.side-bg-text {
  color: #b4c0cc;
}

.auth-padding {
  padding-right: 15rem;
  padding-left: 15rem;
}

@media (max-width: 1023px) {
  .auth-padding {
    padding-right: 1rem;
    padding-left: 1rem;
  }
}

@media (max-width: 1024px) {
  .auth-padding {
    padding-right: 7rem;
    padding-left: 7rem;
  }
}

@media (max-width: 1440px) {
  .auth-padding {
    padding-right: 7rem;
    padding-left: 7rem;
  }
}

@media (max-width: 1920px) {
  .auth-padding {
    padding-right: 10rem;
    padding-left: 10rem;
  }
}
</style>
