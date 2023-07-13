<template>
  <div class="d-flex justify-content-end align-items-center p-1">
    <b-button
      variant="outline-primary"
      class="mr-2"
      @click="$router.push({ name: 'complete-registration' })"
    >
      Cancelar
    </b-button>
    <b-button
      variant="primary"
      class="d-flex align-items-center"
      @click="updateCompanyAndValidateDoc"
    >
      {{ continueButtonLabel }}
      <feather-icon v-if="!!goToAnotherAssignor" size="18" icon="ArrowRightIcon" class="ml-50" />
    </b-button>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue'
import EventBus from '@/services/event_bus'

export default {
  components: {
    BButton,
  },
  mounted() {
    EventBus.$on('company-updated', async () => this.validateDoc())
  },
  computed: {
    continueButtonLabel() {
      return this.goToAnotherAssignor ? 'Enviar informações e continuar' : 'Enviar informações'
    },
    goToAnotherAssignor() {
      const assignorWithoutDoc = this.$store.state.auth.currentEconomicGroup.cedentes.filter(
        (cedente) =>
          cedente.id !== this.$route.params.id && cedente.status_documentacao === 'nao_enviado',
      )

      return assignorWithoutDoc[0]?.id
    },
  },
  methods: {
    async updateCompanyAndValidateDoc() {
      EventBus.$emit('update-company')
    },
    async validateDoc() {
      try {
        this.$swal
          .fire({
            title: 'Deseja continuar?',
            text: 'Você está prestes a enviar a documentação para análise.',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Sim, enviar!',
          })
          .then(async (result) => {
            if (result.value) {
              this.$swal.fire({
                title: 'Aguarde',
                text: 'Aguarde um instante enquanto processamos a solicitação',
                showConfirmButton: false,
                allowOutsideClick: false,
                onBeforeOpen: () => {
                  this.$swal.showLoading()
                },
              })

              await this.$store.dispatch(
                'cedente/sendDocumentationToAnalysis',
                this.$route.params.id,
              )

              this.$swal.fire({
                title: 'Sucesso!',
                text: 'Documentação enviada com sucesso',
                icon: 'success',
                confirmButtonText: 'Ok',
              })

              this.$router.push({ name: 'complete-registration' })
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
