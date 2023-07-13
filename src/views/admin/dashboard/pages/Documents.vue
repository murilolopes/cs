<template>
  <div>
    <b-alert
      show
      variant="danger"
      class="p-1 border-danger"
      v-if="repprovedDocumentation"
    >
      <strong>Motivo da reprovação: </strong
      >{{ company.ultima_validacao_documentacao.reason_disapproval }}
    </b-alert>
    <div class="d-flex flex-row justify-content-between align-items-center">
      <h3 class="mb-1">Documentos representantes legais</h3>
      <b-badge class="alert-danger border-danger" pill v-if="repprovedDocumentation"
        >Reprovado</b-badge
      >
      <b-badge class="alert-success border-success" pill v-if="approvedDocumentation"
        >Aprovado</b-badge
      >
    </div>
    <representative-card
      v-for="representative in representatives"
      :representative-data="representative"
      :key="representative.id"
      :editable="false"
      downloadable
    />
    <h3 class="mb-1">Documentos da empresa</h3>
    <company-document-card :company="company" />
    <div class="d-flex flex-row justify-content-end">
      <b-button
        variant="outline-primary"
        @click="$bvModal.show('reasonDisapproval')"
        class="mr-1"
        :disabled="repprovedDocumentation"
        >Reprovar</b-button
      >
      <b-button variant="primary" @click="approve" :disabled="approvedDocumentation"
        >Aprovar</b-button
      >
    </div>

    <b-modal id="reasonDisapproval" centered hide-footer header-bg-variant="white">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <h3 class="mb-1">Motivo da reprovação</h3>
        <b-form-textarea
          id="reason"
          v-model="reason_disapproval"
          rows="3"
          max-rows="6"
          class="mb-1"
        />
        <h6>Visualização do cliente:</h6>
        <b-alert show variant="danger" class="p-1" v-if="reason_disapproval.length">{{
          reason_disapproval
        }}</b-alert>
        <div class="d-flex flex-row justify-content-between mt-1">
          <b-button variant="outline-primary" class="mb-1 mr-1" @click="hideModal"
            >Cancelar</b-button
          >
          <b-button
            variant="primary"
            class="mb-1"
            @click="repprove"
            :disabled="!reason_disapproval.length"
            >Continuar</b-button
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { BLink, BButton, BFormTextarea, BModal, BAlert, BBadge } from "bootstrap-vue";
import RepresentativeCard from "@/views/cedente/user/components/RepresentativeCard.vue";
import CompanyDocumentCard from "@/views/admin/companies/components/CompanyDocumentCard.vue";
import BankAccountCard from "@/views/cedente/user/components/BankAccountCard.vue";

export default {
  name: "Documents",
  components: {
    BLink,
    BButton,
    RepresentativeCard,
    CompanyDocumentCard,
    BModal,
    BFormTextarea,
    BAlert,
    BBadge,
    BankAccountCard,
  },
  data() {
    return {
      company: {},
      representatives: [],
      reason_disapproval: "",
    };
  },
  created() {
    this.getDocumentData();
  },
  methods: {
    async approve() {
      try {
        this.$swal
          .fire({
            title: "Deseja continuar?",
            text: "Você está prestes a aprovar a documentação para a empresa.",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sim, aprovar!",
          })
          .then(async (result) => {
            if (result.value) {
              this.$swal.showLoading();
              await this.$store.dispatch("cedente/approve", {
                cedente_id: this.company.id,
              });
              await this.getDocumentData();
              this.$swal.fire(
                "Aprovado!",
                "Documentação aprovada com sucesso.",
                "success"
              );
            }
          });
      } catch (error) {
        console.log(error);
        this.$swal.fire("Erro!", "Ocorreu um erro ao aprovar a documentação.", "error");
      }
    },
    repprove() {
      try {
        this.$swal
          .fire({
            title: "Deseja continuar?",
            text: "Você está prestes a reprovar a documentação para a empresa.",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sim, reprovar!",
          })
          .then(async (result) => {
            if (result.value) {
              this.$swal.showLoading();
              await this.$store.dispatch("cedente/repprove", {
                cedente_id: this.company.id,
                reason_disapproval: this.reason_disapproval,
              });
              await this.getDocumentData();
              this.hideModal();
              this.$swal.fire(
                "Reprovado!",
                "Documentação reprovada com sucesso.",
                "success"
              );
            }
          });
      } catch (error) {
        console.log(error);
        this.$swal.fire("Erro!", "Ocorreu um erro ao reprovar a documentação.", "error");
      }
    },
    hideModal() {
      this.$bvModal.hide("reasonDisapproval");
      this.reason_disapproval = "";
    },
    async getDocumentData() {
      const { data } = await this.$store.dispatch("cedente/fetch", this.$route.params.id);
      this.company = data;
      this.representatives = data.representantes_legais;
    },
  },
  computed: {
    repprovedDocumentation() {
      return this.company.status_documentacao === "reprovado";
    },
    approvedDocumentation() {
      return this.company.status_documentacao === "aprovado";
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/base/pages/app-file-manager";
</style>
