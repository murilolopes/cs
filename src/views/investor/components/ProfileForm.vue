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
            <b-button variant="outline-primary bg-white text-dark" @click="$emit('cancel')">
              Cancelar
            </b-button>
            <b-button
              variant="primary bg-white text-dark ml-2"
              @click="updateProfile()"
              :disabled="invalid"
            >
              Salvar
            </b-button>
          </div>
        </div>
        <hr />
        <b-form-group label-class="font-weight-bold" label-cols="12" class="mb-0">
          <b-form-row>
            <b-col cols="3">
              <b-form-group label="Nome" label-for="nome">
                <validation-provider #default="{ errors }" name="nome" vid="nome" rules="required">
                  <b-form-input
                    id="nome"
                    v-model="user.nome"
                    :state="errors.length > 0 ? false : null"
                    name="nome"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group label="Celular" label-for="telefone">
                <validation-provider
                  #default="{ errors }"
                  name="telefone"
                  vid="telefone"
                  rules="required"
                >
                  <b-form-input
                    id="telefone"
                    v-model="user.telefone"
                    v-mask="['(##) #####-####']"
                    :state="errors.length > 0 ? false : null"
                    name="telefone"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group label="CPF" label-for="cpf">
                <b-form-input
                  id="cpf"
                  v-model="user.cpf"
                  v-mask="'###.###.###-##'"
                  disabled
                  name="cpf"
                />
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group label="Email" label-for="apto_para_operar">
                <validation-provider
                  #default="{ errors }"
                  name="email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="email"
                    v-model="user.email"
                    :state="errors.length > 0 ? false : null"
                    name="email"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col cols="3">
              <b-form-group>
                <label for="basic-password">Password</label>
                <b-input-group>
                  <b-form-input id="basic-password" placeholder="********" disabled />
                  <b-input-group-append is-text id="passwordIcon">
                    <feather-icon
                      icon="EditIcon"
                      class="cursor-pointer text-warning"
                      size="22"
                      @click="$bvModal.show('modal-password')"
                    />
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-form-row>
        </b-form-group>
      </validation-observer>
    </b-form>

    <b-modal id="modal-password" centered hide-footer header-bg-variant="white">
      <div class="d-flex flex-column justify-content-center align-items-start">
        <h4 class="mb-2">Alterar senha da conta</h4>

        <validation-observer ref="resetForm" #default="{ invalid }" class="w-100">
          <b-form-group label="Senha atual" label-for="password" class="d-flex flex-column mb-2">
            <validation-provider
              #default="{ errors }"
              name="Senha"
              vid="password"
              rules="required|password"
            >
              <b-form-input
                id="password"
                v-model="newPassword.password"
                :state="errors.length > 0 ? false : null"
                name="password"
                class="w-100"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Nova senha" label-for="password" class="d-flex flex-column mb-2">
            <validation-provider
              #default="{ errors }"
              name="Senha"
              vid="password"
              rules="required|password"
            >
              <b-form-input
                id="password"
                v-model="newPassword.newPassword"
                :state="errors.length > 0 ? false : null"
                name="password"
                class="w-100"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
          <b-form-group
            label="Confirme a nova senha"
            label-for="password"
            class="d-flex flex-column mb-2"
          >
            <validation-provider
              #default="{ errors }"
              name="Senha"
              vid="password"
              rules="required|password"
            >
              <b-form-input
                id="password"
                v-model="newPassword.newPasswordConfirmation"
                :state="errors.length > 0 ? false : null"
                name="password"
                class="w-100"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>

          <div class="d-flex flex-row justify-content-around mt-1">
            <b-button variant="outline-primary" class="mb-1 mr-1" @click=""> Cancelar </b-button>
            <b-button variant="primary" class="mb-1" @click="" :disabled="invalid">
              Continuar
            </b-button>
          </div>
        </validation-observer>
      </div>
    </b-modal>
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
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
  BFormTextarea,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, cpf } from '@validations'
import { mask } from 'vue-the-mask'

export default {
  name: 'ProfileForm',
  components: {
    BCard,
    BCol,
    BImg,
    BForm,
    BBadge,
    BButton,
    BFormRow,
    BFormGroup,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    BFormTextarea,
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
      newPassword: {
        password: '',
        newPassword: '',
      },
      user: {
        nome: '',
        telefone: '',
        cpf: '',
        email: '',
      },
    }
  },
  mounted() {
    this.user.nome = this.profile.nome
    this.user.telefone = this.profile.telefone
    this.user.cpf = this.profile.cpf
    this.user.email = this.profile.email
  },
  methods: {
    async updateProfile() {
      try {
        await this.$store.dispatch('investor/updateInvestorProfile', this.user)
        this.$swal.fire({
          title: 'Sucesso!',
          text: 'Perfil atualizado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        })
        this.$emit('cancel')
      } catch (error) {}
    },
  },
}
</script>

<style lang="scss">
#passwordIcon {
  .input-group-text {
    background-color: #efefef !important;
  }
}
</style>
