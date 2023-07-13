<template>
  <div>
    <bank-account-form
      v-if="isEditing"
      :bankAccountData="bankAccountToEdit"
      @cancel="hiddingForm"
      @saved="hideFormShowCard"
      @deleted="hiddingForm"
    />
    <b-card class="cc-bg-light" v-else>
      <b-row>
        <b-col cols="12" class="d-flex justify-content-between align-items-center">
          <div class="d-flex flex-row align-items-center">
            <h4>{{ bankAccount.banco?.nome }}</h4>
            <div class="vl ml-1 mr-1" />
            <div class="mr-1">
              <h6>Agência</h6>
              <span>{{ bankAccount.agencia }}</span>
            </div>
            <div class="mr-1">
              <h6>Conta</h6>
              <span>{{ bankAccount.conta }}</span>
            </div>
            <div>
              <h6>Dígito</h6>
              <span>{{ bankAccount.digito }}</span>
            </div>
          </div>
          <b-button
            variant="outline-primary"
            size="sm"
            @click="showEditForm"
            v-if="editable"
            >Editar</b-button
          >
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { BCard, BRow, BCol, BButton } from "bootstrap-vue";
import BankAccountForm from "@/views/cedente/user/components/BankAccountForm.vue";

export default {
  name: "BankAccountCard",
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BankAccountForm,
  },
  props: {
    bankAccountData: {
      type: Object,
      default: () => {},
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEditing: false,
      bankAccount: {},
    };
  },
  mounted() {
    this.bankAccount = Object.assign({}, this.bankAccountData);
  },
  methods: {
    hiddingForm() {
      this.isEditing = false;
      this.bankAccount = this.bankAccountData;
    },
    showEditForm() {
      this.isEditing = true;
      this.bankAccountToEdit = this.bankAccount;
    },
    hideFormShowCard() {
      this.isEditing = false;
      this.bankAccount = this.bankAccountData;
    },
  },
};
</script>
