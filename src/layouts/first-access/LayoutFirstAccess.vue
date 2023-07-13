<template>
  <div id='first-access-container' class="first-access-bg h-100 d-flex row-reverse">
    <div class="col-lg-1">
    </div>
    <div class="col-lg-10 h-100 d-flex justify-content-center align-items-center">
      <router-view class="w-100 h-100 d-flex justify-content-center align-items-center" style="max-width: 856px;" />
    </div>
    <div class="d-flex col-lg-1 justify-content-start align-items-start">
      <logout-button class="p-2 logout-button "></logout-button>
    </div>
  </div>
</template>

<script>
import LogoutButton from '@core/layouts/components/app-navbar/components/LogoutButton.vue'

export default {
  components: {
    LogoutButton
  }
}
</script>

<style lang="scss">
  .first-access-bg {
    background: url('./../../../src/assets/images/first-access.svg') no-repeat;
    background-size: cover;
  }

  .logout-button {
    position: absolute;
    top:10px;
    right: 10px;
  }

  @media (max-width: 995px) {
    #first-access-container {
      flex-direction: column-reverse!important;
    }
  }
</style>