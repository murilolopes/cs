<template>
  <validation-observer ref="bankAccountForm" #default="{ invalid }">
    <b-row>
      <b-col cols="3">
        <b-form-group label="Banco" label-for="registration-bank">
          <validation-provider
            #default="{ errors }"
            name="Banco"
            vid="bank"
            rules="required"
          >
            <v-select
              id="registration-bank"
              v-model="bankAccount.banco_id"
              label="texto"
              :clearable="false"
              :options="$store.state.common.bank.list"
              :reduce="(bank) => bank.id"
              class="per-page-selector d-inline-block w-100"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group label="Agência" label-for="registration-agency">
          <validation-provider
            #default="{ errors }"
            name="Agência"
            vid="agency"
            rules="required"
          >
            <b-form-input
              id="registration-agency"
              v-model="bankAccount.agencia"
              :state="errors.length > 0 ? false : null"
              name="registration-agency"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group label="Conta" label-for="registration-account">
          <validation-provider
            #default="{ errors }"
            name="Conta"
            vid="account"
            rules="required"
          >
            <b-form-input
              id="registration-account"
              v-model="bankAccount.conta"
              :state="errors.length > 0 ? false : null"
              name="registration-account"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
      <b-col cols="3">
        <b-form-group label="Dígito" label-for="registration-digit">
          <validation-provider
            #default="{ errors }"
            name="Dígito"
            vid="digit"
            rules="required"
          >
            <b-form-input
              id="registration-digit"
              v-model="bankAccount.digito"
              :state="errors.length > 0 ? false : null"
              name="registration-digit"
              maxlength="1"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row class="mb-1">
      <b-col
        cols="12"
        class="d-flex flex-row"
        :class="{
          'justify-content-between': bankAccount.id,
          'justify-content-end': !bankAccount.id,
        }"
      >
        <b-button
          v-show="bankAccount.id"
          @click="deleteBankAccount"
          variant="outline-primary"
        >
          <feather-icon icon="TrashIcon" size="16" /> Excluir conta
        </b-button>
        <div>
          <b-button variant="outline-primary" class="mr-1" @click="clearForm()"
            >Cancelar</b-button
          >
          <b-button variant="primary" :disabled="invalid" @click="save">{{
            saveButtonLabel
          }}</b-button>
        </div>
      </b-col>
    </b-row>
  </validation-observer>
</template>

<script>
import { BRow, BCol, BFormInput, BFormGroup, BButton } from "bootstrap-vue";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import vSelect from "vue-select";
import { required } from "@validations";

export default {
  name: "BankAccountForm",
  components: {
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    BButton,
    ValidationObserver,
    ValidationProvider,
    vSelect,
  },
  props: {
    bankAccountData: {
      type: Object,
      default: () => ({
        banco_id: "",
        conta: "",
        agencia: "",
        digito: "",
        cedente_id: "",
      }),
    },
  },
  data() {
    return {
      bankAccount: {
        id: null,
        banco_id: "",
        conta: "",
        agencia: "",
        digito: "",
        cedente_id: "",
      },
      required,
    };
  },
  async mounted() {
    await this.$store.dispatch("common/getBanks");

    if (this.bankAccountData.id)
      this.bankAccount = Object.assign({}, this.bankAccountData);
  },
  methods: {
    async save() {
      try {
        this.$swal.showLoading();
        await this.$store.dispatch("cedente/saveCompanyBankAccount", {
          ...this.bankAccount,
          cedente_id: this.$route.params.id,
        });
        this.$swal.fire({
          title: "Sucesso!",
          text: "Dados salvos com sucesso!",
          icon: "success",
        });
        this.$emit("saved");
      } catch (error) {
        console.log("error", error);
        this.$swal.fire({
          title: "Erro!",
          text: "Não foi possível salvar os dados!",
          icon: "error",
        });
      }
    },
    async deleteBankAccount() {
      try {
        this.$swal.showLoading();
        await this.$store.dispatch("cedente/destroyBankAccount", {
          ...this.bankAccount,
          cedente_id: this.$route.params.id,
        });
        this.$swal.fire({
          title: "Sucesso!",
          text: "Dados salvos com sucesso!",
          icon: "success",
        });
        this.$emit("deleted");
      } catch (error) {
        console.log("error", error);
        this.$swal.fire({
          title: "Erro!",
          text: "Não foi possível salvar os dados!",
          icon: "error",
        });
      }
    },
    clearForm() {
      this.bankAccount = this.bankAccountData;
      this.$emit("cancel");
    },
  },
  computed: {
    saveButtonLabel() {
      return !this.bankAccount.id ? "Adicionar conta" : "Salvar alterações";
    },
  },
};
</script>
