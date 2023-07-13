<template>
  <div>
    <validation-observer ref="inviteForm" #default="{invalid}">
      <b-row>
        <b-col cols="4">
          <b-form-group label="Nome" label-for="nome">
            <validation-provider #default="{ errors }" name="Nome" vid="nome" rules="required">
              <b-form-input id="nome" v-model="invite.nome_contato" :state="errors.length > 0 ? false:null" name="nome" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Email" label-for="email">
            <validation-provider #default="{ errors }" name="Email" vid="email" rules="required|email">
              <b-form-input id="email" v-model="invite.email_contato" :state="errors.length > 0 ? false:null" name="email" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col cols="4">
          <b-form-group label="Celular" label-for="celular">
            <validation-provider #default="{ errors }" name="Celular" vid="celular" rules="required">
              <b-form-input id="celular" v-model="invite.celular_contato" :state="errors.length > 0 ? false:null" v-mask="['(##) # ####-####']" name="celular" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="12" class="d-flex flex-row justify-content-end">
          <b-button variant="outline-primary" @click="$emit('cancel')" class="mr-1">Cancelar</b-button>
          <b-button variant="primary" :disabled="invalid" @click="createInvite">Criar convite</b-button>
        </b-col>
      </b-row>
    </validation-observer>
  </div>
</template>

<script>
import { BRow, BCol, BFormInput, BFormGroup, BButton } from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email } from '@validations'
import vSelect from 'vue-select'
import {mask} from 'vue-the-mask'


export default {
  name: 'InviteForm',
  components: {
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    BButton,
    ValidationObserver,
    ValidationProvider,
    vSelect
  },directives:{ mask },
  props: {},
  data() {
    return {
      invite: {
        nome_contato: '',
        email_contato: '',
        celular_contato: '',
      },
      required,
      email
    };
  },
  async mounted() {
    const { data } = await this.$store.dispatch('cedente/getInvites', this.$route.params.id)
  },
  methods: {
    async createInvite() {
      try {
        this.$swal.fire({
          title: 'Deseja continuar?',
          text: 'Você está prestes a enviar um convite para a empresa.',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Continuar!'
        }).then(async (result) => {
          if (result.value) {
            this.$swal.showLoading()
            await this.$store.dispatch('cedente/createInvite', { id: this.$route.params.id, payload: this.invite })
            this.$emit('created')
            this.$swal.fire('Salvo!', 'Dados salvos com sucesso.', 'success')
          }
        })
      } catch (error) {
        console.log(error)
        this.$swal.fire('Erro!', 'Ocorreu um erro ao atualizar taxas e limites.', 'error')
      }
    }
  }
};
</script>
