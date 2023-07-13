 <template>
  <div class="d-flex align-items-center cursor-pointer" @click="myAccount">
    <div class="d-flex flex-column align-items-end mr-1">
      <h6 class="mb-0">{{ $store.state.auth.userData.name }}</h6>
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
      const userAccountRoute = {admin: 'admin.minha-conta', cedente: 'minha-conta', parceiro: 'parceiro.minha-conta'}
      this.$router.push({ name: userAccountRoute[this.userType] })
    },
    userSubTitle() {
      return this.userType === 'admin' ? 'Administrador' : `${this.$store.state.auth.currentEconomicGroup?.nome}`
    }
  },
  computed: {
    formattedCnpj() {
      return this.$store.state.auth.userData.empresa.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
    },
    userType() {
      return this.$store.state.auth.userData.user_type
    }
  }
}
</script>
