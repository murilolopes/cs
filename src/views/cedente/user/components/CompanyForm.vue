<template>
  <div>
    <validation-observer ref="companyForm" #default="{ invalid }">
      <b-row>
        <b-col sm="12" md="6" lg="3">
          <b-form-group label="CNPJ" label-for="registration-cnpj">
            <validation-provider #default="{ errors }" name="CNPJ" rules="required" vid="cnpj">
              <b-form-input
                id="registration-cnpj"
                v-model="company.cnpj"
                v-mask="'##.###.###/####-##'"
                :state="errors.length > 0 ? false : null"
                name="registration-cnpj"
                type="text"
                readonly
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <b-form-group label="Nome Fantasia" label-for="registration-fantasy-name">
            <validation-provider
              #default="{ errors }"
              name="Nome Fantasia"
              rules="required"
              vid="fantasy-name"
            >
              <b-form-input
                id="registration-fantasy-name"
                v-model="company.nome_fantasia"
                :state="errors.length > 0 ? false : null"
                name="registration-fantasy-name"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <b-form-group label="Razão social" label-for="registration-Legalname">
            <validation-provider
              #default="{ errors }"
              name="Razão social"
              rules="required"
              vid="Legalname"
            >
              <b-form-input
                id="registration-Legalname"
                v-model="company.razao_social"
                :state="errors.length > 0 ? false : null"
                name="registration-Legalname"
                readonly
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="3">
          <b-form-group label="Web site" label-for="registration-website">
            <validation-provider #default="{ errors }" name="Web site" vid="website">
              <b-form-input
                id="registration-website"
                v-model="company.website"
                :state="errors.length > 0 ? false : null"
                name="registration-website"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>

      <h4 class="mb-1 mt-2">Endereço</h4>
      <b-row>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="CEP" label-for="registration-zipcode">
            <validation-provider #default="{ errors }" name="CEP" rules="required" vid="zipcode">
              <b-form-input
                id="registration-zipcode"
                v-model="company.cep"
                v-mask="'##.###-###'"
                lazy
                :disabled="isLoading"
                :state="errors.length > 0 ? false : null"
                name="registration-zipcode"
                type="text"
                @blur="getAddress"
              />
              <b-spinner
                v-if="isLoading"
                small
                class="mt-1"
                variant="primary"
                label="Carregando..."
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="Estado" label-for="registration-state">
            <validation-provider #default="{ errors }" name="Estado" rules="required" vid="state">
              <v-select
                id="registration-state"
                v-model="company.uf"
                :state="errors.length > 0 ? false : null"
                name="registration-state"
                :clearable="false"
                :options="ufOptions"
                :reduce="(value) => value.value"
                class="per-page-selector d-inline-block w-100"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="Cidade" label-for="registration-city">
            <validation-provider #default="{ errors }" name="Cidade" rules="required" vid="city">
              <b-form-input
                id="registration-city"
                v-model="company.cidade"
                :state="errors.length > 0 ? false : null"
                name="registration-city"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="Logradouro" label-for="registration-street">
            <validation-provider
              #default="{ errors }"
              name="Logradouro"
              rules="required"
              vid="street"
            >
              <b-form-input
                id="registration-street"
                v-model="company.logradouro"
                :state="errors.length > 0 ? false : null"
                name="registration-street"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="Bairro" label-for="registration-neighborhood">
            <validation-provider
              #default="{ errors }"
              name="Bairro"
              rules="required"
              vid="neighborhood"
            >
              <b-form-input
                id="registration-neighborhood"
                v-model="company.bairro"
                :state="errors.length > 0 ? false : null"
                name="registration-neighborhood"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="6" md="6" lg="2">
          <b-form-group label="Número" label-for="registration-number">
            <validation-provider #default="{ errors }" name="Número" rules="required" vid="number">
              <b-form-input
                id="registration-number"
                ref="registration_number"
                v-model="company.logradouro_numero"
                :state="errors.length > 0 ? false : null"
                name="registration-number"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="6" md="6" lg="2">
          <b-form-group label="Complemento" label-for="registration-complement">
            <validation-provider #default="{ errors }" name="Complemento" vid="complement">
              <b-form-input
                id="registration-complement"
                v-model="company.complemento"
                :state="errors.length > 0 ? false : null"
                name="registration-complement"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>

      <h4 class="mb-1 mt-2">Envie o seu Contrato Social</h4>
      <b-row>
        <b-col sm="12" md="6" lg="4">
          <cc-dropzone
            id="contrato_social"
            ref="contrato_social"
            v-model.sync="company.contrato_social"
            rules="required"
            validation-id="contrato_social"
            validation-name="Contrato Social"
            fit
            accept-formats=".pdf"
            subtitle="Formato permitido: PDF"
          />
        </b-col>
      </b-row>

      <div v-if="isAdmin">
        <b-row>
          <b-col cols="4">
            <b-form-group label="Apto para operar" label-for="can_operate">
              <validation-provider
                #default="{ errors }"
                name="Apto para operar"
                vid="can_operate"
                rules="required"
              >
                <b-form-checkbox
                  id="can_operate"
                  v-model="company.apto_para_operar"
                  :state="errors.length > 0 ? false : null"
                  name="apto_para_operar"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <h3>Estatuto social da empresa</h3>
        <b-row>
          <b-col sm="12" md="6" lg="4">
            <span
              >Envie todas as folhas da última atualização do estatuto social da empresa,
              devidamente assinado.</span
            >
          </b-col>
          <b-col sm="12" md="6" lg="4">
            <b-form-group label="" label-for="company-social-contract">
              <cc-dropzone
                id="contrato_social"
                ref="contrato_social"
                v-model.sync="company.contrato_social"
                rules="required"
                validation-id="contrato_social"
                validation-name="Contrato Social"
                fit
                accept-formats=".pdf"
                subtitle="Formato permitido: PDF"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import { email, required, ext } from '@validations'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  BButton,
  BCard,
  BCol,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BRow,
  BSpinner,
} from 'bootstrap-vue'
import CcDropzone from '@core/components/cc-dropzone/CcDropzone.vue'
import vSelect from 'vue-select'
import { mask } from 'vue-the-mask'
import { brazilianStatesOptions } from '@core/mixins/ui/forms'
import axios from 'axios'
import EventBus from '@/services/event_bus'

export default {
  name: 'CompanyForm',
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
    vSelect,
    CcDropzone,
    BFormCheckbox,
  },
  directives: {
    mask,
  },
  mixins: [brazilianStatesOptions],
  props: {
    cedente: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      company: {
        razao_social: '',
        nome_fantasia: '',
        website: '',
        cnpj: '',
        cep: '',
        uf: '',
        cidade: '',
        logradouro: '',
        bairro: '',
        logradouro_numero: '',
        complemento: '',
        name: '',
        email: '',
        phone: '',
        cellphone: '',
        contrato_social: '',
      },
      required,
      email,
      ext,
      classificationTypes: [
        { value: 'aaa', label: 'AAA' },
        { value: 'm', label: 'M' },
      ],
      unknownCEP: false,
      isLoading: false,
    }
  },
  computed: {
    empresaId() {
      return this.$store.state.auth.userData.user_type === 'admin'
        ? this.$route.params.id
        : this.$store.state.auth.userData.cedente_id
    },
    saveButtonLabel() {
      return this.empresaId ? 'Salvar informações' : 'Continuar'
    },
    isAdmin() {
      return this.$store.state.auth.userData.user_type === 'admin'
    },
  },
  async mounted() {
    this.company = { ...this.cedente }
    EventBus.$on('update-company', async () => this.update())
    await this.$refs.companyForm.reset()
  },
  methods: {
    async update() {
      if (this.isAdmin) return this.save()

      const validForm = this.$refs.companyForm.validate()
      if (!validForm) return

      try {
        this.$swal.showLoading()
        await this.$store.dispatch('cedente/complementCompanyData', this.company)
        this.$emit('updated')
        EventBus.$emit('company-updated')
      } catch (error) {
        console.log(error)
        this.$swal.fire({
          title: 'Erro ao atualizar os dados da empresa!',
          icon: 'warning',
          confirmButtonText: 'Ok',
          html: `${error.response.data.map((err) => err).join(';<br>')}`,
        })
      }
    },
    async save() {
      try {
        this.$swal.showLoading()
        const { data } = await this.$store.dispatch('dashboard/save', this.company)
        await this.$swal.fire({
          title: 'Sucesso!',
          text: 'Dados cadastrados com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        })
        this.$router.push({
          name: 'admin-dashboard.general-data',
          params: { id: data.id },
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
    async getAddress() {
      try {
        this.isLoading = true

        const cep = this.company.cep.replace(/\.|\-/g, '')
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

        this.company.logradouro = data.logradouro
        this.company.bairro = data.bairro
        this.company.cidade = data.localidade
        this.company.uf = data.uf

        this.$refs.registration_number.focus()
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
}
</script>

<style lang="scss">
.custom-checkbox.b-custom-control-sm .custom-control-label::before,
.custom-checkbox.b-custom-control-sm .custom-control-label::after,
.input-group-sm .custom-checkbox .custom-control-label::before,
.input-group-sm .custom-checkbox .custom-control-label::after {
  left: 0.25rem;
}
</style>
