<template>
  <div>
    <validation-observer ref="loginForm" #default="{invalid}">
      <b-form class="auth-login-form" @submit.prevent="login">
        <h3 class="mb-1">Dados da empresa</h3>
        <b-row>
          <b-col cols="4">
            <b-form-group label="CNPJ" label-for="cnpj">
              <validation-provider #default="{ errors }" name="CNPJ" rules="required|cnpj"
                                   vid="cnpj">
                <b-form-input id="cnpj" v-model="company.cnpj" type="text" v-mask="'##.###.###/####-##'"
                              :state="errors.length > 0 ? false:null" name="cnpj"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Nome fantasia" label-for="fantasy_name">
              <validation-provider #default="{ errors }" name="Nome fantasia" rules="required" vid="fantasy_name">
                <b-form-input id="fantasy_name" v-model="company.nome_fantasia" :state="errors.length > 0 ? false:null"
                              name="fantasy_name"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Razão social" label-for="legal_name">
              <validation-provider #default="{ errors }" name="Razão social" rules="required" vid="legal_name">
                <b-form-input id="legal_name" v-model="company.legal_name" :state="errors.length > 0 ? false:null"
                              name="legal_name"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col cols="4">
            <b-form-group label="Web site" label-for="website">
              <validation-provider #default="{ errors }" name="Web site" vid="website">
                <b-form-input id="website" v-model="company.website" :state="errors.length > 0 ? false:null"
                              name="website"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Email" label-for="email">
              <validation-provider #default="{ errors }" name="Email" rules="required|email" vid="email">
                <b-form-input id="email" v-model="company.email" :state="errors.length > 0 ? false:null" name="email"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Telefone" label-for="phone">
              <validation-provider #default="{ errors }" name="Telefone" rules="required|email" vid="phone">
                <b-form-input id="phone" v-model="company.phone" :state="errors.length > 0 ? false:null" name="phone" type="tel" v-mask="'## ####-####'"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>

        <h3 class="mb-1">Endereço</h3>
        <b-row>
          <b-col cols="4">
            <b-form-group label="CEP" label-for="zipcode">
              <validation-provider #default="{ errors }" name="CEP" rules="required|CEP" vid="zipcode">
                <b-form-input id="zipcode" v-model="company.cep" :state="errors.length > 0 ? false:null"
                              name="zipcode" type="text" v-mask="'##.###-###'"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Estado" label-for="state">
              <validation-provider #default="{ errors }" name="Estado" rules="required" vid="state">
                <b-form-input id="state" v-model="company.state" :state="errors.length > 0 ? false:null" name="state"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="4">
            <b-form-group label="Cidade" label-for="city">
              <validation-provider #default="{ errors }" name="Cidade" rules="required" vid="city">
                <b-form-input id="city" v-model="company.city" :state="errors.length > 0 ? false:null" name="city"/>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>


        <b-button
            :disabled="invalid || loading"
            block
            type="submit"
            variant="primary"
        >
          {{ loading ? 'Carregando...' : 'Login' }}
          <b-spinner v-if="loading" small/>
        </b-button>
      </b-form>
    </validation-observer>
  </div>
</template>

<script>
import {mask} from 'vue-the-mask'
import {ValidationObserver, ValidationProvider} from 'vee-validate'
import {
  BAlert,
  BButton,
  BCard,
  BCardText,
  BCardTitle,
  BCol,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BImg,
  BInputGroup,
  BInputGroupAppend,
  BRow,
  BSpinner
} from 'bootstrap-vue'



export default {
  name: 'CompanyForm',
  components: {
    BRow,
    BCol,
    BCard,
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
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    mask
  },
  data() {
    return {
      company: {
        cnpj: '',
        nome_fantasia: '',
        razao_social: '',
        website: '',
        email: '',
        phone: '',
      }
    }
  },
}
</script>
