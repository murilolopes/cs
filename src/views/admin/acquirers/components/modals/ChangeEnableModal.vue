<template>
  <b-modal ref="changeEnableModal"
           hide-footer
           centered
           header-bg-variant="white"
           body-class="pl-3 pr-3 pb-3 pt-0"
  >
    <b-row align-v="center" align-h="center">
      <b-col cols="12" class="">
        <b-row align-v="center" align-h="center">
          <b-col cols="12">
            <b-row align-h="center" align-v="center">
              <h4 v-if="currentEnableState">
                Ativar credenciadora
              </h4>
              <h4 v-else>
                Desativar credenciadora
              </h4>
            </b-row>
          </b-col>
          <b-col cols="12" class="mt-1">
            <b-row align-h="center" align-v="center">
              <p v-if="currentEnableState">Esta ação tornará esta credenciadora apta para operar dentro da plataforma. Você tem certeza
                que deseja continuar?</p>
              <p v-else>
                Esta ação tornará esta credenciadora inapta para operar dentro da plataforma. Você tem certeza que deseja continuar?
              </p>
            </b-row>
          </b-col>
        </b-row>
        <b-row align-v="center" align-h="center" class="mt-1">
          <b-col cols="12">
            <b-row align-h="center" align-v="center">
              <b-button variant="outline-primary" @click="cancel">
                Cancelar
              </b-button>
              <b-button variant="primary" class="ml-2" @click="apply">
                {{ currentEnableState ? 'Ativar credenciadora' : 'Desativar credenciadora' }}
              </b-button>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import {
  BModal, BCol, BRow, BButton,
} from 'bootstrap-vue'

export default {
  name: 'ChangeEnableModal',
  components: {
    BModal,
    BCol,
    BRow,
    BButton,
  },
  props: { currentAcquirerId: { type: Number, default: null }, currentEnableState: Boolean },
  computed: {
    enableState() {
      return this.currentEnableState
    },
  },
  methods: {
    async apply() {
      try {
        await this.$store.dispatch('credenciadora/updateEnableState', { credenciadora_id: this.currentAcquirerId, enable: this.currentEnableState })
        await this.$refs.changeEnableModal.hide()
      } catch (error) {
        await this.$swal.fire({
          title: 'Erro!',
          text: 'Não foi possível completar a operação!',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      }
    },
    cancel() {
      this.$refs.changeEnableModal.hide()
      this.$emit('cancel', !this.currentEnableState)
    },
  },
}
</script>
