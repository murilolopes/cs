<template>
  <b-col sm="12" md="12" lg="12" xl="8" class="m-auto">
    <h1 class="text-dark">Faça seu login</h1>
    <span>Insira seu e-mail e senha para continuar.</span>
    <validation-observer ref="loginForm" #default="{ invalid }">
      <b-form class="auth-login-form mt-2" @submit.prevent="login">
        <b-form-group label="Email" label-for="login-email">
          <validation-provider
            #default="{ errors }"
            name="Email"
            vid="email"
            rules="required|email"
          >
            <b-form-input
              id="login-email"
              v-model="userEmail"
              :state="errors.length > 0 ? false : null"
              name="login-email"
              placeholder="john@example.com"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <b-form-group label="Senha" label-for="login-password">
          <validation-provider #default="{ errors }" name="Senha" vid="password" rules="required">
            <b-input-group
              class="input-group-merge"
              :class="errors.length > 0 ? 'is-invalid' : null"
            >
              <b-form-input
                id="login-password"
                v-model="password"
                :state="errors.length > 0 ? false : null"
                class="form-control-merge"
                :type="passwordFieldType"
                name="login-password"
                placeholder="Password"
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
          <b-form-checkbox id="remember-me" class="custom-control-success" switch>
            Lembrar informações
          </b-form-checkbox>
        </b-form-group>

        <b-button type="submit" variant="primary" block :disabled="invalid || loading">
          {{ loading ? 'Carregando...' : 'Login' }}
          <b-spinner small v-if="loading" />
        </b-button>
      </b-form>
    </validation-observer>
    <div class="mt-2">
      <span
        class="text-primary h5 text-underline cursor-pointer"
        @click="$bvModal.show('resetPassword')"
        >Esqueci minha senha</span
      >
    </div>

    <b-modal id="resetPassword" centered hide-footer header-bg-variant="white">
      <div class="d-flex flex-column justify-content-center align-items-start">
        <h1 class="mb-1">Trocar senha</h1>
        <p class="h5 mb-2">
          Identifique-se para receber um email com as instruções e link para criar uma nova senha.
        </p>

        <validation-observer ref="resetForm" #default="{ invalid }" class="w-100">
          <b-form-group label="Email" label-for="email" class="d-flex flex-column mb-3">
            <validation-provider
              #default="{ errors }"
              name="Email"
              vid="email"
              rules="required|email"
            >
              <b-form-input
                id="email"
                v-model="resetPassword.email"
                :state="errors.length > 0 ? false : null"
                name="email"
                class="w-100"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <div class="d-flex flex-row justify-content-around mt-1">
            <b-button
              variant="outline-primary"
              class="mb-1 mr-1"
              @click="$bvModal.hide('modalResendInvite')"
              >Cancelar</b-button
            >
            <b-button
              variant="primary"
              class="mb-1"
              @click="sendResetPasswordEmail"
              :disabled="invalid"
              >Continuar</b-button
            >
          </div>
        </validation-observer>
      </div>
    </b-modal>
    <b-modal id="resetSuccesfullyMessage" centered hide-footer header-bg-variant="white">
      <div class="d-flex flex-column justify-content-center align-items-start">
        <h1 class="mb-1">Link enviado para o email digitado</h1>
        <p class="h5 mb-2">
          Verifique o seu email. Enviamos as instruções e um link para você refazer a sua senha,
          para o email <strong>{{ resetPassword.email }}</strong
          >, que você digitou.
        </p>

        <p class="h5 mb-2">
          Caso você não receba o email em alguns minutos, verifique a sua caixa de spam ou refaça
          esse processo.
        </p>
      </div>
    </b-modal>
  </b-col>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
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
  BSpinner,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

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
    BSpinner,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      loading: false,
      logoBig: require('@/assets/images/logo/logo-grande-ac.svg'),
      auxLogo: require('@/assets/images/img-pag-cartao.png'),
      password: '',
      userEmail: '',
      required,
      email,
      resetPassword: {
        email: '',
      },
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    async login() {
      try {
        this.loading = true
        const success = await this.$refs.loginForm.validate()
        if (!success) return

        const { data } = await this.$store.dispatch('auth/login', {
          email: this.userEmail,
          password: this.password,
        })

        this.$ability.update(data.user_data.ability)

        if (data.user_data.user_type === 'cedente')
          await this.$store.dispatch('auth/getCurrentEconomicGroupData')

        this.$router
          .replace(
            getHomeRouteForLoggedInUser(
              data.user_data.user_type,
              this.$store.state.auth.currentEconomicGroup,
            ),
          )
          .then(() => {
            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Boas vindas ${data.user_data.name}`,
                icon: 'CoffeeIcon',
                avatarVariant: 'success',
                titleVariant: 'success',
                text: `Login efetuado com sucesso!`,
              },
            })
          })
      } catch (error) {
        this.$swal({
          title: 'Erro!',
          text: error.response.data.error,
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      } finally {
        this.loading = false
      }
    },
    async sendResetPasswordEmail() {
      try {
        const success = await this.$refs.resetForm.validate()
        if (!success) return
        this.$swal.showLoading()
        await this.$store.dispatch('auth/sendResetPasswordEmail', {
          email: this.resetPassword.email,
        })
        this.$swal.close()
        this.$bvModal.hide('resetPassword')
        this.$bvModal.show('resetSuccesfullyMessage')
        this.resetPassword.email = ''
      } catch (error) {
        console.log(error)
        this.$swal({
          title: 'Erro!',
          text: error.response.data,
          icon: 'error',
          confirmButtonText: 'Ok',
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
