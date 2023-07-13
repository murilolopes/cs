<template>
  <div class="d-flex align-items-center justify-content-center cursor-pointer" @click="logout()">
    <h3 class="mb-0 mr-1">Sair</h3>
     <feather-icon icon="LogInIcon" size="24" />
  </div>
</template>

<script>

export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>
