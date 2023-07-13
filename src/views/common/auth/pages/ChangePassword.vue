<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <b-col lg="4" class="register-bg-cc">
        <div class="px-5 d-flex flex-column align-items-center">
          <b-img fluid :src="appLogoGrande" alt="register Side Image" />
          <h4 class="mt-3 mb-5 side-bg-text">Receba o dinheiro dos seus pagamentos com cartões de crédito antes da data
            do vencimento.</h4>
          <b-img fluid :src="cardToMoney" alt="register Side Image" />
        </div>
      </b-col>

      <b-col lg="8" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title class="mb-1 font-weight-bold d-flex flex-column" title-tag="h2">
            <span class="text-dark">Crie sua conta</span>
          </b-card-title>
          <b-card-text class="mb-2">
            Informe abaixo seus dados cadastrais.
          </b-card-text>

          <!-- form -->
          <validation-observer ref="newPasswordForm" #default="{ invalid }">
            <b-form class="auth-register-form mt-2">
              <b-row>
                <b-col cols="6">
                  <b-form-group>
                    <div class="d-flex justify-content-between">
                      <label for="register-password">Crie sua senha</label>
                    </div>
                    <validation-provider #default="{ errors }" name="Senha" vid="password" rules="required">
                      <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                        <b-form-input id="register-password" v-model="password"
                          :state="errors.length > 0 ? false : null" class="form-control-merge"
                          :type="passwordFieldType" name="register-password" placeholder="Password" />
                        <b-input-group-append is-text>
                          <feather-icon class="cursor-pointer" :icon="passwordToggleIcon"
                            @click="togglePasswordVisibility('passwordFieldType')" />
                        </b-input-group-append>
                      </b-input-group>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                  <b-form-group>
                    <div class="d-flex justify-content-between">
                      <label for="register-password">Confirmação de senha</label>
                    </div>
                    <validation-provider #default="{ errors }" name="Confirmação de senha" vid="confirm_password"
                      rules="required|confirmed:password">
                      <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                        <b-form-input id="register-password-confirmation" v-model="passwordConfirmation"
                          :state="errors.length > 0 ? false : null" class="form-control-merge"
                          :type="passwordConfirmationFieldType" name="register-password-confirmation" placeholder="Password" />
                        <b-input-group-append is-text>
                          <feather-icon class="cursor-pointer" :icon="passwordConfirmToggleIcon"
                            @click="togglePasswordVisibility('passwordConfirmationFieldType')" />
                        </b-input-group-append>
                      </b-input-group>
                      <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col cols="6">
                  <span> Sua senha precisa conter: </span>
                  <b-form-group class="mt-1">
                    <b-form-checkbox v-model="minimunCaracters" name="checkbox-1" disabled> No mínimo 8 caracteres
                    </b-form-checkbox>
                  </b-form-group>
                  <b-form-group>
                    <b-form-checkbox v-model="capitalLetters" name="checkbox-1" disabled> Letras maiúsculas
                    </b-form-checkbox>
                  </b-form-group>
                  <b-form-group>
                    <b-form-checkbox v-model="smallLetters" name="checkbox-1" disabled> Letras minúsculas
                    </b-form-checkbox>
                  </b-form-group>
                  <b-form-group>
                    <b-form-checkbox v-model="numbers" name="checkbox-1" disabled> Números </b-form-checkbox>
                  </b-form-group>
                  <b-form-group>
                    <b-form-checkbox v-model="symbols" name="checkbox-1" disabled> Simbolos </b-form-checkbox>
                  </b-form-group>
                </b-col>
                <b-col cols="12" class="d-flex justify-content-between">
                  <b-button variant="primary" @click="newPassword" :disabled="!strongPassword && invalid">Salvar nova senha</b-button>
                </b-col>
              </b-row>
            </b-form>
          </validation-observer>
        </b-col>
      </b-col>
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { BCard, BCardFooter, BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BFormCheckbox, BCardText, BCardTitle, BImg, BForm, BButton, BAlert, VBTooltip } from 'bootstrap-vue'

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
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      appLogoGrande: require('@/assets/images/logo/logo-grande-ac.svg'),
      cardToMoney: require('@/assets/images/img-antecipa-01.png'),
      sideImg: require('@/assets/images/register-bg.svg'),
      password: '',
      passwordConfirmation: '',
      userEmail: '',
      canReset: false,
      required,
    }
  },
  async mounted() {
    if (!this.$route.params.token)
      return this.$router.push({ name: 'auth-login' })

    try {
      await this.$store.dispatch('common/validateResetToken', this.$route.params.token)
      this.canReset = true
    } catch (error) {
      this.$swal({
        title: 'Erro',
        text: 'Token inválido',
        icon: 'error',
        confirmButtonText: 'Ok',
      }).then(async (result) => {
        if (result.isConfirmed) this.$router.push({name: 'auth-login'})
      })
    }
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
      return this.minimunCaracters && this.smallLetters && this.capitalLetters && this.numbers && this.symbols && this.password === this.passwordConfirmation
    },
  },
  methods: {
    async newPassword() {
      try {
        const payload = {
          token: this.$route.params.token,
          new_password: this.password,
          new_password_confirmation: this.passwordConfirmation,
        }

        this.$swal.showLoading()
        await this.$store.dispatch('auth/newPassword', payload)

        this.$swal({
          title: 'Sucesso!',
          text: 'Senha alterada com sucesso! Faça seu login para continuar.',
          icon: 'success',
          confirmButtonText: 'Logar',
        }).then(async (result) => {
          if (result.isConfirmed) this.$router.push({name: 'auth-login'})
        })

        this.$router.push('auth-login')
      } catch (error) {
        this.$refs.RegisterForm.setErrors(error.response)
      }
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';

.register-bg-cc {
  background: url('./../../../../assets/images/banner_line_filete.png'), #EFF4F6;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.side-bg-text {
  padding-left: 3rem;
  padding-right: 3rem;
  text-align: center;
}

.continue-button {
  margin-top: 1.5rem;
}
</style>
