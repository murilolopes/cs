<template>
  <div>
    <bank-accounts />
  </div>
</template>

<script>
import BankAccountCard from "@/views/cedente/user/components/BankAccountCard";
import BankAccountForm from "@/views/cedente/user/components/BankAccountForm";
import BankAccounts from "@/views/cedente/user/components/BankAccounts";
import { BButton } from "bootstrap-vue";

export default {
  name: "BankAccount",
  components: {
    BankAccountForm,
    BankAccountCard,
    BankAccounts,
    BButton,
  },
  data() {
    return {
      bankAccountInfos: {},
      showForm: true,
      hasAccount: false,
    };
  },
  async mounted() {
    await this.getCompany();
  },
  methods: {
    async updateList() {
      this.showForm = false;
      await this.getCompany();
    },
    async getCompany() {
      const { data } = await this.$store.dispatch("cedente/fetch", this.$route.params.idMatriz);
      this.bankAccountInfos = data.conta_corrente;
      if (this.bankAccountInfos) {
        this.hasAccount = true;
        this.showForm = false;
      }
    },
    async afterDestroy() {
      this.bankAccountInfos = {};
      await this.getCompany();
      this.showForm = true;
      this.hasAccount = false;
    },
  },
  computed: {
    isCreating() {
      return !this.bankAccountInfos || this.showForm === true;
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/base/pages/app-file-manager";
</style>
