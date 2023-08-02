<template>
  <div class="d-flex align-items-center cursor-pointer" @click="myAccount">
    <div class="d-flex flex-column align-items-end mr-1">
      <h6 class="mb-0">{{ $store.state.auth.userData.nome }}</h6>
      <span>{{ userSubTitle() }}</span>
    </div>
    <feather-icon icon="UserIcon" size="24" />
  </div>
</template>

<script>
export default {
  name: 'UserData',
  methods: {
    myAccount() {
      const userAccountRoute = {
        'Admin::User': 'admin.profile',
        'Investidor::User': 'investor.profile',
      }
      this.$router.push({ name: userAccountRoute[this.userType] })
    },
    userSubTitle() {
      const userRole = {
        'Admin::User': 'Administrador',
        'Investidor::User': 'Investidor',
      }
      return userRole[this.userType]
    },
  },
  computed: {
    userType() {
      return this.$store.state.auth.userData.type
    },
  },
}
</script>
