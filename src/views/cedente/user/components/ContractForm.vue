<template>
  <div>
    <h3>Estatuto social da empresa</h3>
    <span class="h5">Envie todas as folhas da última atualização do estatuto social assinado.</span>
    <validation-observer ref="SocialContractForm" #default="{ invalid }">
      <b-row>
        <b-col cols="12">
          <cc-dropzone rules="required" validationId="estatuto_social" validationName="Estatuto Social"
            v-model.sync="contrato_social" subtitle="Envie seu arquivo no formato PDF" acceptFormats=".pdf" />
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="12" class="d-flex flex-row justify-content-end">
          <div>
            <b-button variant="outline-primary" class="mr-1" @click="$emit('cancel')">Cancelar</b-button>
            <b-button variant="primary" :disabled="invalid" @click="save()">Confirmar e enviar
              documentos</b-button>
          </div>
        </b-col>
      </b-row>
    </validation-observer>
  </div>
</template>

<script>
import { BRow, BCol, BFormInput, BFormGroup, BButton, BModal, BFormCheckbox } from 'bootstrap-vue'
import { ValidationObserver } from 'vee-validate'
import CcDropzone from '@core/components/cc-dropzone/CcDropzone.vue'
import { required, ext } from '@validations'


export default {
  name: 'ContractForm',
  components: {
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    BButton,
    BModal,
    BFormCheckbox,
    ValidationObserver,
    CcDropzone
  },
  data() {
    return {
      contrato_social: null,
      confirmation: false,
      required,
      ext,
    };
  },
  methods: {
    async save() {
      try {
        this.$swal.showLoading()
        await this.$store.dispatch('cedente/uploadSocialContract', this.contrato_social)
        await this.$store.dispatch('cedente/sendDocumentationToAnalysis', this.$store.state.auth.userData.empresa.id)
        this.$swal.fire({
          title: 'Sucesso!',
          text: 'Dados salvos com sucesso!',
          icon: 'success'
        })
        this.$emit('saved')
      } catch (error) {
        console.log('error', error)
        this.$swal.fire({
          title: 'Erro!',
          text: 'Não foi possível salvar os dados!',
          icon: 'error'
        })
      }
    },
    socialContractConfirmation() {
      this.$bvModal.show('socialContractValidationModal')
    }
  },
};
</script>

<style lang="scss">
#socialContractValidationCheckbox+.custom-control-label::before,
#socialContractValidationCheckbox+.custom-control-label::after {
  top: 1rem;
}
</style>
