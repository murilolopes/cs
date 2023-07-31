<template>
  <b-card class="card-cs-border card-cs-bg mb-0">
    <b-form>
      <validation-observer ref="ProfileForm" #default="{ invalid }">
        <div class="d-flex flex-row justify-content-between align-items-end">
          <div class="d-flex flex-row">
            <b-card class="mb-0 card-cs-border mr-2">
              <div class="d-flex flex-row m-auto mb-0">
                <feather-icon icon="UserIcon" size="40" class="text-warning mr-2" />
                <div class="d-flex flex-column justify-content-between">
                  <span>Nome</span>
                  <p class="mb-0">Luke Skywalker</p>
                </div>
              </div>
            </b-card>
          </div>

          <div>
            <b-button variant="outline-primary bg-white text-dark" @click="$emit('cancel')"
              >Cancelar</b-button
            >
            <b-button variant="primary bg-white text-dark ml-2">Editar</b-button>
          </div>
        </div>
        <hr />
        <b-form-group label-class="font-weight-bold" label-cols="12" class="mb-0">
          <b-form-row>
            <b-col cols="3">
              <b-form-group label="Nome" label-for="name">
                <validation-provider #default="{ errors }" name="name" vid="name" rules="required">
                  <b-form-input
                    id="name"
                    v-model="user.name"
                    :state="errors.length > 0 ? false : null"
                    name="name"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group label="Celular" label-for="phone">
                <validation-provider
                  #default="{ errors }"
                  name="phone"
                  vid="phone"
                  rules="required"
                >
                  <b-form-input
                    id="phone"
                    v-model="user.phone"
                    v-mask="['(##) #####-####']"
                    :state="errors.length > 0 ? false : null"
                    name="phone"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group label="CPF" label-for="cpf">
                <validation-provider
                  #default="{ errors }"
                  name="cpf"
                  vid="cpf"
                  rules="required|cpf"
                >
                  <b-form-input
                    id="cpf"
                    v-model="user.cpf"
                    v-mask="'#.##'"
                    :state="errors.length > 0 ? false : null"
                    name="cpf"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group v-slot="{ ariaDescribedby }" label="Email" label-for="apto_para_operar">
                <validation-provider
                  #default="{ errors }"
                  name="email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="email"
                    v-model="user.email"
                    v-mask="'#.##'"
                    :state="errors.length > 0 ? false : null"
                    name="email"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-form-group>
      </validation-observer>
    </b-form>
  </b-card>
</template>

<script>
import {
  BCard,
  BBadge,
  BForm,
  BFormGroup,
  BFormCheckbox,
  BFormRow,
  BCol,
  BButton,
  BFormInput,
  BImg,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, cpf } from '@validations'
import { mask } from 'vue-the-mask'

export default {
  name: 'EmissionCard',
  components: {
    BCard,
    BCol,
    BImg,
    BForm,
    BBadge,
    BButton,
    BFormRow,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    ValidationProvider,
    ValidationObserver,
  },
  directives: { mask },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {
        name: '',
        phone: '',
        cpf: '',
        email: '',
      },
    }
  },
  mounted() {
    this.user = this.profile
  },
  methods: {},
}
</script>

<style lang="scss"></style>
