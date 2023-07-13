<template>
  <div>
    <b-form>
      <validation-observer ref="AcquirerForm" #default="{ invalid }">
        <b-form-group label="Dados da Credenciadora" label-class="font-weight-bold" label-cols="12">
          <b-form-row>
            <b-col cols="3">
              <b-form-group label="Nome Fantasia" label-for="nome_fantasia">
                <validation-provider #default="{ errors }"
                                     name="nome_fantasia"
                                     vid="nome_fantasia"
                                     rules="required"
                >
                  <b-form-input id="nome_fantasia"
                                v-model="credenciadora.nome_fantasia"
                                :state="errors.length > 0 ? false : null"
                                name="nome_fantasia"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group label="CNPJ" label-for="cnpj">
                <validation-provider #default="{ errors }" name="cnpj" vid="cnpj" rules="required|cnpj">
                  <b-form-input id="cnpj"
                                v-model="credenciadora.cnpj"
                                v-mask="['##.###.###/####-##']"
                                :state="errors.length > 0 ? false : null"
                                name="cnpj"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group label="Taxa Global" label-for="taxa_juros_global">
                <validation-provider #default="{ errors }"
                                     name="taxa_juros_global"
                                     vid="taxa_juros_global"
                                     rules="required"
                >
                  <b-form-input id="taxa_juros_global"
                                v-model="credenciadora.taxa_juros_padrao"
                                v-mask="'#.##'"
                                :state="errors.length > 0 ? false : null"
                                name="taxa_juros_global"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="3" align-self="center">
              <b-form-group v-slot="{ ariaDescribedby }"
                            label="Apto para operar"
                            label-for="apto_para_operar"
              >
                <validation-provider #default="{ errors }"
                                     name="apto_para_operar"
                                     vid="apto_para_operar"
                                     rules="required"
                >
                  <b-form-checkbox id="apto_para_operar"
                                   v-model="credenciadora.enable"
                                   class="custom-control-success"
                                   name="apto_para_operar"
                                   :aria-describedby="ariaDescribedby"
                                   switch
                  >
                    <span class="switch-icon-left"><feather-icon icon="CheckIcon" /></span>
                    <span class="switch-icon-right"><feather-icon icon="XIcon" /></span>
                  </b-form-checkbox>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-form-row>
          <b-form-row>
            <b-col cols="3">
              <b-form-group label="Logo da Credenciadora" label-class="font-weight-bold" label-for="logo" label-cols="12">
                <validation-provider #default="{ errors }"
                name="logo"
                vid="logo"
                rules="required"
                >
                <b-form-input id="logo"
                v-model="credenciadora.logo"
                :state="errors.length > 0 ? false : null"
                name="logo"
                  />
                  <small class="text-danger">{{ errors[0] }}</small><br>
                  <small class="image-title">Pré-visualização:</small><br>
                </validation-provider>
                <b-img
                  v-if="credenciadora.logo"
                  height="80px"
                  width="140px"
                  class="mt-2 ml-2"
                  :src="credenciadora.logo"
                  fluid
                  alt="Logo da Credenciadora"
                />
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-form-group>
        <b-form-row class="mb-1">
          <b-col cols="12" class="d-flex flex-row justify-content-end">
            <b-button variant="outline-primary" class="mr-1" @click="$emit('cancel')">
              Cancelar
            </b-button>
            <b-button variant="primary" :disabled="invalid" @click="save">
              Salvar credenciadora
            </b-button>
          </b-col>
        </b-form-row>
      </validation-observer>
    </b-form>
  </div>
</template>

<script>
import {
  BForm, BFormGroup, BFormCheckbox, BFormRow, BCol, BButton, BFormInput, BImg
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, cnpj } from '@validations'
import { mask } from 'vue-the-mask'
import CcDropzone from '@core/components/cc-dropzone/CcDropzone.vue'

export default {
  name: 'AcquirerForm',
  components: {
    BForm,
    BFormGroup,
    BFormRow,
    BFormInput,
    BFormCheckbox,
    BCol,
    BButton,
    BImg,
    ValidationProvider,
    ValidationObserver,
    CcDropzone,
  },
  directives: { mask },
  data() {
    return {
      credenciadora: {
        nome_fantasia: '',
        razao_social: '',
        cnpj: '',
        enable: true,
        taxa_juros_padrao: '',
        logo: '',
      },
      required,
      cnpj,
      isEditing: false,
    }
  },
  async mounted() { if (this.$route.params.id) await this.getData() },
  methods: {
    async getData() {
      const { data } = await this.$store.dispatch('credenciadora/fetch', this.$route.params.id)
      this.credenciadora = data
      this.isEditing = true
    },
    async save() {
      try {
        this.$swal.showLoading()
        await this.$store.dispatch('credenciadora/save', this.credenciadora)
        await this.$swal.fire({
          title: 'Sucesso!',
          text: 'Dados cadastrados com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        })
        this.$router.push({
          name: 'admin-credenciadoras.index',
        })
      } catch (error) {
        this.$swal.fire({
          title: 'Erro!',
          text: 'Não foi possível completar a operação!',
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      }
    },
  },
}
</script>

<style scoped>
</style>
