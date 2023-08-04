<template>
  <b-card>
    <b-card class="card-cs-border card-cs-bg mb-0" v-if="!showForm">
      <div class="d-flex flex-row justify-content-between align-items-end">
        <div class="d-flex flex-row">
          <b-card class="mb-0 card-cs-border mr-2">
            <div class="d-flex flex-row m-auto mb-0">
              <feather-icon icon="UserIcon" size="40" class="text-warning mr-2" />
              <div class="d-flex flex-column justify-content-between">
                <span>Nome</span>
                <p class="mb-0">{{ user.nome || '-' }}</p>
              </div>
            </div>
          </b-card>
          <b-card class="mb-0 card-cs-bg">
            <div class="d-flex flex-column">
              <span>Celular</span>
              <p class="mb-0">{{ user.telefone || '-' }}</p>
            </div>
          </b-card>
          <b-card class="mb-0 card-cs-bg">
            <div class="d-flex flex-column">
              <span>CPF</span>
              <p class="mb-0">{{ user.cpf || '-' }}</p>
            </div>
          </b-card>
          <b-card class="mb-0 card-cs-bg">
            <div class="d-flex flex-column">
              <span>Email</span>
              <p class="mb-0">{{ user.email || '-' }}</p>
            </div>
          </b-card>
        </div>

        <b-button variant="outline-primary bg-white text-dark" @click="showForm = true">
          Editar
        </b-button>
      </div>
    </b-card>

    <profile-form v-else @cancel="updateData" :profile="user" />
  </b-card>
</template>

<script>
import { BRow, BCol, BImg, BCard, BButton, BFormInput } from 'bootstrap-vue'
import ProfileForm from '@/views/investor/components/ProfileForm.vue'

export default {
  name: 'Profile',
  components: {
    BRow,
    BCol,
    BImg,
    BCard,
    BButton,
    BFormInput,
    ProfileForm,
  },
  data() {
    return {
      showForm: false,
      user: {
        nome: '',
        email: '',
        phone: '',
        cpf: '',
      },
    }
  },
  async mounted() {
    await this.getUser()
  },
  methods: {
    updateData() {
      this.showForm = false
      this.getUser()
    },
    async getUser() {
      try {
        const { data } = await this.$store.dispatch('auth/getUserData')
        this.user = data.data
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss">
.card-cs-border {
  border-radius: 8px;
  border: 1px solid #becad4;
}

.card-cs-bg {
  border-radius: 8px;
  background: #f8fafc;
}
</style>
