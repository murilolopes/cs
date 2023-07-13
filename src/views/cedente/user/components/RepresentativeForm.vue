<template>
  <div>
    <validation-observer ref="representativesForm" #default="{ invalid }">
      <b-row>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="Nome" label-for="representative-name">
            <validation-provider #default="{ errors }" name="Nome" rules="required" vid="name">
              <b-form-input id="representative-name"
                            v-model="representative.nome"
                            :state="errors.length > 0 ? false : null"
                            name="representative-name"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="Email" label-for="representative-email">
            <validation-provider #default="{ errors }" name="Email" rules="required|email" vid="email">
              <b-form-input id="representative-email"
                            v-model="representative.email"
                            :state="errors.length > 0 ? false : null"
                            name="representative-email"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="Celular" label-for="representative-cellphone">
            <validation-provider #default="{ errors }" name="Celular" rules="required" vid="cellphone">
              <b-form-input id="representative-cellphone"
                            v-model="representative.celular"
                            v-mask="['(##) # ####-####']"
                            :state="errors.length > 0 ? false : null"
                            name="representative-cellphone"
                            type="tel"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="RG" label-for="representative-rg">
            <validation-provider #default="{ errors }" name="RG" rules="required|rgFormat" vid="rg">
              <b-form-input id="representative-rg"
                            v-model="representative.rg"
                            :state="errors.length > 0 ? false : null"
                            name="representative-rg"
                            @input="formatRg()"
                            :maxlength="20"
                            @keydown.space.prevent 
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="RG/Orgão emissor" label-for="representative-issuer">
            <validation-provider #default="{ errors }" name="RG/Orgão emissor" rules="required|orgaoFormat" vid="issuer">
              <b-form-input id="representative-issuer"
                            v-model="representative.orgao_emissor_rg"
                            :state="errors.length > 0 ? false : null"
                            name="representative-issuer"
                            @input="formatOrgaoEmissor()" 
                            :maxlength="10"
                            @keydown.space.prevent 
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="RG/Estado" label-for="representative-issuerState">
            <validation-provider #default="{ errors }" name="RG/Estado" rules="required" vid="issuerState">
              <v-select id="representative-issuerState"
                        v-model="representative.rg_uf"
                        :state="errors.length > 0 ? false : null"
                        name="representative-issuerState"
                        :clearable="false"
                        :options="ufOptions"
                        :reduce="value => value.value"
                        class="per-page-selector d-inline-block w-100"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="CPF" label-for="representative-cpf">
            <validation-provider #default="{ errors }" name="CPF" rules="required" vid="cpf">
              <b-form-input id="representative-cpf"
                            v-model="representative.cpf"
                            v-mask="'###.###.###-##'"
                            :state="errors.length > 0 ? false : null"
                            name="representative-cpf"
                            type="text"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="Tipo de representante" label-for="representative-representativeType">
            <validation-provider #default="{ errors }"
                                 name="Tipo de representante"
                                 rules="required"
                                 vid="representativeType"
            >
              <v-select id="representative-representativeType"
                        v-model="representative.tipo"
                        :clearable="false"
                        :options="representativeTypes"
                        :reduce="tipo => tipo.value"
                        class="per-page-selector d-inline-block w-100"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="Comprovante de residência" label-for="representative-comprovante_residencia">
            <cc-dropzone id="representative-comprovante_residencia"
                         ref="comprovante_residencia"
                         v-model.sync="representative.comprovante_residencia"
                         rules="required"
                         validation-id="comprovante_residencia"
                         validation-name="Comprovante de residência"
                         accept-formats=".pdf, .png, .jpg, .jpeg"
                         subtitle="'Envie seu arquivo nos formato .PDF, .PNG, .JPG ou .JPEG'"
            />
          </b-form-group>
        </b-col>
        <b-col sm="12" md="6" lg="4">
          <b-form-group label="Documento de identidade" label-for="representative-documento_identidade">
            <cc-dropzone id="representative-documento_identidade"
                         ref="documento_identidade"
                         v-model.sync="representative.documento_identidade"
                         validation-name="Documento de identidade"
                         rules="required"
                         validation-id="documento_identidade"
                         accept-formats=".pdf, .png, .jpg, .jpeg"
                         subtitle="'Envie seu arquivo nos formato .PDF, .PNG, .JPG ou .JPEG'"
            />
          </b-form-group>
        </b-col>
        <b-col v-if="isProcurador" sm="12" md="6" lg="4">
          <b-form-group label="Procuração" label-for="representative-procuracao">
            <cc-dropzone id="representative-procuracao"
                         ref="procuracao"
                         v-model.sync="representative.procuracao"
                         validation-name="Procuração"
                         rules="required"
                         validation-id="procuracao"
                         :required="isProcurador"
                         accept-formats=".pdf, .png, .jpg"
                         subtitle="'Envie seu arquivo nos formato .PDF, .PNG, .JPG ou .JPEG'"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <div class="d-flex justify-content-end">
        <b-button class="mr-1" variant="outline-primary" @click="$emit('cancel')">
          Cancelar
        </b-button>
        <b-button :disabled="invalid" variant="primary" @click="save">
          {{ saveButtonLabel }}
        </b-button>
      </div>
    </validation-observer>
  </div>
</template>

<script>
import {
  BButton, BCol, BFormGroup, BFormInput, BRow,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import CcDropzone from '@core/components/cc-dropzone/CcDropzone.vue'
import vSelect from 'vue-select'
import { required, ext } from '@validations'
import { mask } from 'vue-the-mask'
import { brazilianStatesOptions } from '@core/mixins/ui/forms'
import { extend } from 'vee-validate';

export default {
  name: 'Representative',
  components: {
    ValidationProvider,
    ValidationObserver,
    CcDropzone,
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    BButton,
    vSelect,
  },
  directives: {
    mask,
  },
  mixins: [brazilianStatesOptions],
  props: {
    representativeData: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      representativeTypes: [
        { label: 'Procurador', value: 'procurador' },
        { label: 'Sócio', value: 'socio' },
        { label: 'Diretor', value: 'diretor' },
      ],
      assignTypes: [
        { text: 'Eletrônica', value: 'ELECTRONIC' },
        { text: 'Física', value: 'PHYSICAL' },
      ],
      representative: {
        cedente_id: '',
        nome: '',
        email: '',
        celular: '',
        rg: '',
        orgao_emissor_rg: '',
        rg_uf: '',
        cpf: '',
        tipo: '',
        comprovante_residencia: '',
        documento_identidade: '',
        procuracao: '',
      },
      required,
      ext,
      rules: {
        rgFormat: value => /^[A-Z0-9./-]+$/.test(value) || 'O campo RG deve conter apenas números, letras, pontos, hífens e barras.',
        orgaoFormat: value => /^[A-Z]+$/.test(value) || 'O campo RG/Orgão emissor deve conter apenas letras.',
      },
    }
  },
  computed: {
    saveButtonLabel() {
      return !this.representative.id ? 'Incluir representante' : 'Salvar alterações'
    },
    isProcurador() {
      return this.representative.tipo === 'procurador'
    },
  },
  async mounted() {
    if (this.representativeData.id) this.representative = this.representativeData
    if (this.$route.params.id) this.representative.cedente_id = this.$route.params.id
    await this.$refs.representativesForm.reset()
    extend('rgFormat', this.rules.rgFormat);
    extend('orgaoFormat', this.rules.orgaoFormat);
  },
  methods: {
    async save() {
      try {
        this.$swal.showLoading()
        this.representative.cedente_id = this.$route.params.id
        await this.$store.dispatch('cedente/saveRepresentative', this.representative)
        this.$swal.fire({
          title: 'Sucesso!',
          text: 'Representante cadastrado com sucesso!',
          icon: 'success',
        })
        this.$emit('saved')
      } catch (error) {
        console.error(error)
      }
    },
    async deleteRepresentante() {
      try {
        this.$swal.showLoading()
        await this.$store.dispatch('cedente/destroyRepresentative', this.representative.id)
        this.$swal.fire({
          title: 'Sucesso!',
          text: 'Representante excluído com sucesso!',
          icon: 'success',
        })
      } catch (error) {
        console.log('error', error)
        this.$swal.fire({
          title: 'Erro!',
          text: 'Não foi possível excluir o representante!',
          icon: 'error',
        })
      }
    },
    formatRg() {
      this.representative['rg'] = this.representative['rg'].toUpperCase();
    },
    formatOrgaoEmissor() {
      this.representative['orgao_emissor_rg'] = this.representative['orgao_emissor_rg'].toUpperCase();
    },
  },
}
</script>
