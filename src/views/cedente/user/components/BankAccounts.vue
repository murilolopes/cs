<template>
  <component :is="componentType">
    <b-card-title>Inclua seus dados bancários</b-card-title>
    <div class="d-flex text-nowrap align-items-center">
      <validation-observer ref="bankForm" #default="{invalid}">
        <b-row>
          <b-col cols="4">
            <validation-provider #default="{ errors }" name="Banco" rules="required" vid="Banco">
              <b-form-group label="Banco" label-for="bank-bank">
                <v-select id="bank-bank" v-model="bank.bank" name="bank-bank" :clearable="false" :options="$store.state.common.bank.list" :state="errors.length > 0 ? false:null" />
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="2">
            <validation-provider #default="{ errors }" name="Agência" rules="required" vid="Agência">
              <b-form-group label="Agência" label-for="bank-agencia">
                <b-form-input id="bank-agencia" v-model="bank.agencia" name="bank-agencia" type="number" v-mask="'########'" :state="errors.length > 0 ? false:null" no-wheel />
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="2">
            <validation-provider #default="{ errors }" name="Conta" rules="required" vid="Conta">
              <b-form-group label="Conta" label-for="bank-conta">
                <b-form-input id="bank-conta" v-model="bank.conta" name="bank-conta" type="number" v-mask="'###############'" :state="errors.length > 0 ? false:null" no-wheel />
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="2">
            <validation-provider #default="{ errors }" name="Dígito" rules="required" vid="Dígito">
              <b-form-group label="Dígito" label-for="bank-digito">
                <b-form-input id="bank-digito" v-model="bank.digito" name="bank-digito" type="number" v-mask="'#'" :state="errors.length > 0 ? false:null"/>
              </b-form-group>
            </validation-provider>
          </b-col>
          <b-col cols="2" class="d-flex align-items-end">
            <b-button variant="primary" class="d-flex align-items-center mb-1" size="sm" :disabled="invalid" @click="addBank">
              Incluir <feather-icon size="20" icon="PlusIcon" class="ml-50" />
            </b-button>
          </b-col>
        </b-row>
      </validation-observer>
    </div>
    <div class="mt-1">
      <vue-scrollbar :style="scrollbar" class="bg-transparent">
        <b-list-group>
          <b-list-group-item class="list-header text-dark font-weight-bolder">
            <b-row class="text-dark font-weight-bolder">
              <b-col cols="4">Bancos incluídos</b-col>
              <b-col cols="2">Agência</b-col>
              <b-col cols="2">Conta</b-col>
              <b-col cols="2">Dígito</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center cc-list-item-padding" v-if="!banks.length">Sem contas bancária cadastradas</b-list-group-item>
          <b-list-group-item class="" v-for="(bank, index) in banks" :key="index">
            <b-row class="d-flex align-items-center">
              <b-col cols="4">{{ bank?.banco?.nome }}</b-col>
              <b-col cols="2">{{ bank?.agencia }}</b-col>
              <b-col cols="2">{{ bank?.conta }}</b-col>
              <b-col cols="2">{{ bank?.digito }}</b-col>
              <b-col cols="2">
                <b-button size="sm" variant="flat-primary" class="d-flex align-items-center" @click="removeBank(bank.id)">
                  Excluir <feather-icon size="20" icon="Trash2Icon" class="ml-50" />
                </b-button>
              </b-col>
            </b-row>
          </b-list-group-item>
        </b-list-group>
      </vue-scrollbar>
    </div>
  </component>
</template>

<script>
import { BCard, BRow, BCol, BButton, BCardTitle, BListGroup, BListGroupItem, BFormInput, BInputGroup, BInputGroupAppend, BFormGroup } from "bootstrap-vue";
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import vSelect from 'vue-select'

import VueScrollbar from 'vue2-scrollbar';
import "vue2-scrollbar/dist/style/vue2-scrollbar.css"

export default {
  name: "BankAccountCard",
  components: { BCard, BRow, BCol, BButton, BCardTitle, BListGroup, BListGroupItem, BFormInput, BInputGroup, BInputGroupAppend, BFormGroup, VueScrollbar, ValidationObserver, ValidationProvider, vSelect },
  data() {
    return {
      componentType: '',
      banks: [],
      cedenteId: '',
      userType: '',
      banksOptions: [1, 2, 3],
      bank: {
        bank: '',
        agencia: '',
        conta: '',
        digito: '',
      },
      scrollbar: {
        maxHeight: "210px",
        width: "100%"
      },
    };
  },
  async mounted() {
    this.userType = this.$store.state.auth.userData.user_type;
    this.componentType = this.userType === 'admin' ? 'div' : 'b-card';
    this.cedenteId = this.userType === 'admin' ? this.$route.params.idMatriz : this.$route.params.id;

    await this.$store.dispatch("common/getBanks");

    const { data } = await this.$store.dispatch("cedente/getBankAccounts", this.cedenteId);
    this.banks = data;
  },
  methods: {
    async addBank() {
      try {
        this.bank.cedente_id = this.cedenteId
        this.bank.banco_id = this.bank.bank.value
        const newBank = await this.$store.dispatch('cedente/addBank', this.bank)
        this.bank.banco = { nome: this.bank.bank.label }
        this.banks.push({...newBank.data, ...this.bank})
        this.bank = {
          bank: '',
          agencia: '',
          conta: '',
          digito: '',
        };
        this.$refs.bankForm.reset();
      } catch (error) {
        console.log(error)
      }
    },
    async removeBank(id) {
      this.$swal.fire({
        title: "Deseja continuar?",
        text: "Você está prestes a excluir uma conta bancária.",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, excluir!",
      })
      .then(async (result) => {
        if (result.value) {
          try {
            const payload = {
              cedente_id: this.cedenteId,
              conta_corrente_id: id,
            }
            await this.$store.dispatch('cedente/removeBank', payload)
            this.banks = this.banks.filter(subsidiary => subsidiary.id !== id)
            this.$bvToast.toast('Conta bancária excluída com sucesso!', {
              title: 'Sucesso',
              variant: 'success',
              solid: true,
              autoHideDelay: 5000,
            });
          } catch (error) {
            console.log(error)
          }
        }
      });
    },
  },
};
</script>
