<template>
  <b-col class="my-auto">
    <h1 class="text-dark">Crie sua conta</h1>
    <span>Informe abaixo seus dados cadastrais.</span>
    <validation-observer ref="RegisterForm">
      <b-form class="auth-register-form mt-2">
        <div v-if="step === 1">
          <b-row>
            <b-col cols="12">
              <b-form-group label="Nome" label-for="register-name">
                <validation-provider #default="{ errors }" name="Nome" vid="name" rules="required">
                  <b-form-input
                    id="register-name"
                    v-model="userName"
                    :state="errors.length > 0 ? false : null"
                    name="register-name"
                    placeholder="Informe seu nome completo"
                    :disabled="firstStepDisabled"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="Email" label-for="register-email">
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="register-email"
                    v-model="userEmail"
                    type="email"
                    :state="errors.length > 0 ? false : null"
                    name="register-email"
                    placeholder="Digite seu email"
                    :disabled="firstStepDisabled"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-form-group label="Telefone" label-for="register-phone">
                <validation-provider
                  #default="{ errors }"
                  name="Telefone"
                  vid="phone"
                  rules="required"
                >
                  <b-form-input
                    id="register-phone"
                    v-model="celular_contato"
                    :state="errors.length > 0 ? false : null"
                    name="register-phone"
                    placeholder="Digite somente os números"
                    v-mask="'(##) #####-####'"
                    :disabled="firstStepDisabled"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="12">
              <b-form-group label="CPF" label-for="register-cpf">
                <validation-provider #default="{ errors }" name="CPF" vid="cpf" rules="required">
                  <b-form-input
                    id="register-cpf"
                    v-model="cpf"
                    :state="errors.length > 0 ? false : null"
                    name="register-cpf"
                    placeholder="Informe o CPF"
                    v-mask="'###.###.###-##'"
                    :disabled="firstStepDisabled"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <b-form-group class="mt-1">
                <b-form-checkbox v-model="terms" name="checkbox-terms" id="checkbox-terms">
                  <div>
                    Eu concordo com os
                    <a
                      href="https://policies-creditcorp-public.s3.sa-east-1.amazonaws.com/termos_uso.pdf"
                      target="_blank"
                      >Termos de uso</a
                    >
                    e com a
                    <a
                      href="https://policies-creditcorp-public.s3.sa-east-1.amazonaws.com/politica_privacidade.pdf"
                      target="_blank"
                      >Política de privacidade</a
                    >
                    da CreditCorp.
                  </div>
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="d-flex align-items-center justify-content-start w-100 mt-1">
              <b-button
                :disabled="!terms"
                variant="primary"
                @click="validateUserData"
                class="continue-button"
              >
                Continuar <feather-icon icon="ChevronRightIcon" class="ml-1" />
              </b-button>
            </b-col>
          </b-row>
        </div>
        <div v-if="step === 2">
          <b-row>
            <b-col cols="6">
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="register-password">Senha</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Senha"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="register-password"
                      placeholder="Senha"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility('passwordFieldType')"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="register-password">Confirmação de senha</label>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Confirmação de senha"
                  vid="password"
                  rules="required|confirmed:password"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid' : null"
                  >
                    <b-form-input
                      id="register-password-confirmation"
                      v-model="passwordConfirmation"
                      :state="errors.length > 0 ? false : null"
                      class="form-control-merge"
                      :type="passwordConfirmationFieldType"
                      name="register-password-confirmation"
                      placeholder="Confirmação de Senha"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordConfirmToggleIcon"
                        @click="togglePasswordVisibility('passwordConfirmationFieldType')"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="6">
              <span> Sua senha precisa conter: </span>
              <b-form-group class="mt-1">
                <b-form-checkbox v-model="minimunCaracters" name="checkbox-1" disabled>
                  No mínimo 8 caracteres
                </b-form-checkbox>
              </b-form-group>
              <b-form-group>
                <b-form-checkbox v-model="capitalLetters" name="checkbox-1" disabled>
                  Letras maiúsculas
                </b-form-checkbox>
              </b-form-group>
              <b-form-group>
                <b-form-checkbox v-model="smallLetters" name="checkbox-1" disabled>
                  Letras minúsculas
                </b-form-checkbox>
              </b-form-group>
              <b-form-group>
                <b-form-checkbox v-model="numbers" name="checkbox-1" disabled>
                  Números
                </b-form-checkbox>
              </b-form-group>
              <b-form-group>
                <b-form-checkbox v-model="symbols" name="checkbox-1" disabled>
                  Simbolos
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <b-col cols="12" class="d-flex justify-content-start">
              <b-button variant="outline-primary" @click="step = 1"
                ><feather-icon icon="ChevronLeftIcon" class="mr-1" />Voltar</b-button
              >
              <b-button
                variant="primary"
                class="ml-1"
                @click="acceptTerms"
                :disabled="!strongPassword"
              >
                Criar conta
              </b-button>
            </b-col>
          </b-row>
        </div>
      </b-form>
    </validation-observer>

    <b-modal id="modal-terms" scrollable centered hide-header-close title="Autorização" size="lg">
      <b-card border-variant="primary" no-body class="shadow-sm">
        <vue-scrollbar
          ref="Scrollbar"
          :style="scrollbar"
          :onMaxScroll="handleMaxScroll"
          class="p-3"
        >
          <vue-pdf-embed :source="minutaFile" />
        </vue-scrollbar>
        <b-card-footer>
          <div class="d-flex justify-content-between align-items-center">
            <b-form-group class="mt-1"> </b-form-group>
            <b-button variant="outline-primary" @click="downloadMinuta">
              <feather-icon icon="DownloadIcon" size="18" class="mr-1" /> Baixar Documento</b-button
            >
          </div>
        </b-card-footer>
      </b-card>
      <template #modal-footer class="modal-footer-space-between">
        <b-form-checkbox
          v-model="minuta"
          name="checkbox-minuta"
          id="checkbox-minuta"
          :disabled="canCheckMinuta"
        >
          Confirmo que revisei o documento e estou de acordo com os termos, e ciente que esse não
          poderá ser alterado no futuro.
        </b-form-checkbox>
        <div class="d-flex justify-content-between">
          <b-button
            variant="outline-primary"
            size="sm"
            class="float-right mr-2"
            @click="$bvModal.hide('modal-terms')"
            >Cancelar</b-button
          >
          <b-button
            variant="primary"
            size="sm"
            class="float-right"
            @click="acceptTerms"
            :disabled="!minuta"
            >Aceitar</b-button
          >
        </div>
      </template>
    </b-modal>
  </b-col>
</template>

<script>
import { required, email, cpf } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BCard,
  BCardFooter,
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
  BAlert,
  VBTooltip,
} from 'bootstrap-vue'
import VueScrollbar from 'vue2-scrollbar'
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css'
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    ValidationProvider,
    ValidationObserver,
    BCard,
    BCardFooter,
    VueScrollbar,
    VuePdfEmbed,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      scrollbar: {
        maxHeight: '550px',
        width: '100%',
      },
      firstStepDisabled: true,
      minuta: false,
      terms: false,
      step: 1,
      cpf: '',
      status: '',
      password: '',
      passwordConfirmation: '',
      userName: '',
      userEmail: '',
      sideImg: require('@/assets/images/register-bg.svg'),
      required,
      email,
      razao_social: '',
      nome_fantasia: '',
      celular_contato: '',
      canCheckMinuta: true,
      minutaFile: 'Autorização+Optin.pdf',
    }
  },
  async mounted() {
    if (!['/investidor/cadastro'].includes(this.$route.path)) this.validateInvite()
    if (['/investidor/cadastro'].includes(this.$route.path)) this.firstStepDisabled = false
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordConfirmToggleIcon() {
      return this.passwordConfirmationFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    minimunCaracters() {
      return this.password.length >= 8
    },
    smallLetters() {
      return /[a-z]/.test(this.password)
    },
    capitalLetters() {
      return /[A-Z]/.test(this.password)
    },
    numbers() {
      return /[0-9]/.test(this.password)
    },
    symbols() {
      return /[!@#\$%\^\&*\)\(+=._-]/.test(this.password)
    },
    strongPassword() {
      return (
        this.minimunCaracters &&
        this.smallLetters &&
        this.capitalLetters &&
        this.numbers &&
        this.symbols
      )
    },
    termsOfUse() {
      return process.env.VUE_APP_TERMS_OF_USE
    },
    privacyPolicy() {
      return process.env.VUE_APP_PRIVACY_POLICY
    },
  },
  methods: {
    async validateInvite() {
      try {
        const { data } = await this.$store.dispatch(
          'common/validateInvite',
          this.$route.query.token,
        )
        this.userName = data.nome_contato
        this.userEmail = data.email_contato
        this.celular_contato = data.celular_contato
        this.cpf = data.cpf
      } catch (error) {
        this.$swal({
          title: 'Erro',
          text: error.response.data,
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      }
    },
    handleMaxScroll(event) {
      if (event.bottom === true) this.canCheckMinuta = false
    },
    downloadMinuta() {
      var link = document.createElement('a')
      link.setAttribute('download', 'minuta')
      link.href = this.minutaFile
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    async validateUserData() {
      const success = await this.$refs.RegisterForm.validate()
      if (success) this.step = 2
    },
    acceptTerms() {
      this.$bvModal.hide('modal-terms')
      this.register()
    },
    async register() {
      try {
        const payload = {
          email: this.userEmail,
          password: this.password,
          password_confirmation: this.passwordConfirmation,
          acceptance_confirmation: this.terms,
          privacy_policy_term_link:
            'https://policies-creditcorp-public.s3.sa-east-1.amazonaws.com/politica_privacidade.pdf',
          use_policy_term_link:
            'https://policies-creditcorp-public.s3.sa-east-1.amazonaws.com/termos_uso.pdf',
          token: this.$route.query.token,
        }

        this.$swal.showLoading()

        await this.$store.dispatch('auth/createUser', payload)

        this.$swal({
          title: 'Sucesso!',
          text: 'Usuário cadastrado com sucesso!',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        this.$router.push('auth-login')
      } catch (error) {
        this.$refs.RegisterForm.setErrors(error.response)
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
