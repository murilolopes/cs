<template>
  <b-modal ref="taxEditionModal" hide-footer centered header-bg-variant="white">
    <b-row align-v="center" align-h="center">
      <b-col cols="12">
        <b-row align-v="start">
          <b-col cols="12" class="pl-2">
            <h4>Alterar taxa global</h4>
          </b-col>
          <b-col cols="12" class="pl-2">
            <span>Utilize o campo abaixo para editar a taxa global.</span>
          </b-col>
        </b-row>
        <b-row align-v="start" class="mt-2">
          <b-col cols="12">
            <validation-observer #default="{invalid}" ref="taxEditionForm">
              <b-row align-v="start">
                <b-col cols="6" class="pl-2">
                  <b-form-group label="Taxa global" label-for="taxa_juros_padrao">
                    <validation-provider #default="{ errors }"
                                         name="Taxa de Juros Global"
                                         rules="required"
                                         vid="taxa_juros_padrao"
                    >
                      <b-form-input id="taxa_juros_padrao"
                                    v-model="taxa_juros_padrao"
                                    v-mask="'#.##'"
                                    type="text"
                                    :state="errors.length > 0 ? false:null"
                                    name="taxa_juros_padrao"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col cols="12" class="px-3 py-2">
                  <b-row align-h="center" align-v="center">
                    <b-col cols="12">
                      <b-row align-h="start" align-v="center">
                        <b-button variant="outline-primary" @click="closeModal">
                          Cancelar
                        </b-button>
                        <b-button variant="primary" class="ml-2" :disabled="invalid" @click="applyTax">
                          Aplicar Taxa
                        </b-button>
                      </b-row>
                    </b-col>
                  </b-row>
                </b-col>
              </b-row>
            </validation-observer>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
import {
  BModal, BCol, BRow, BButton, BFormInput, BFormGroup,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { VueTheMask } from 'vue-the-mask'
import { required } from '@validations'

export default {
  name: 'TaxEditionModal',
  components: {
    BModal,
    BCol,
    BRow,
    BButton,
    BFormGroup,
    BFormInput,
    ValidationObserver,
    ValidationProvider,
  },
  directives: { 'v-mask': VueTheMask },
  props: { currentAcquirerId: { type: Number, default: null }, currentTax: { type: String, default: null } },
  data() {
    return { taxa_juros_padrao: this.currentTax, required }
  },
  methods: {
    async applyTax() {
      try {
        await this.$store.dispatch('credenciadora/updateGlobalTax', { credenciadora_id: this.currentAcquirerId, taxa_juros_padrao: this.taxa_juros_padrao })
        this.closeModal()
        this.$emit('update', this.taxa_juros_padrao)
      } catch (error) {
        await this.$swal.fire({
          title: 'Erro!',
          text: 'Não foi possível completar a operação!',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      }
    },
    closeModal() {
      this.$refs.taxEditionForm.reset()
      this.$refs.taxEditionModal.hide()
    },
  },
}
</script>
