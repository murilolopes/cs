<template>
  <div>
    <datatable ref="liquidationDatatable" />

    <b-modal
      id="reportPaymentModal"
      centered
      hide-footer
      header-bg-variant="white"
    >
      <div class="d-flex flex-column justify-content-center align-items-center">
        <h1 class="mb-1">Informar pagamento</h1>
        <p class="h5 text-center mb-3">
          Esta ação informará ao sistema que a operação selecionada foi paga.
          Você tem certeza que deseja continuar?
        </p>

        <div class="d-flex flex-row justify-content-between mt-1">
          <b-button
            variant="outline-primary"
            class="mb-1 mr-1"
            @click="$bvModal.hide('reportPaymentModal')"
          >
            Cancelar
          </b-button>
          <b-button variant="primary" class="mb-1" @click="reportPayment">
            Informar pagamento
          </b-button>
        </div>
      </div>
    </b-modal>

    <b-modal
      id="bankAccountModal"
      centered
      hide-footer
      header-bg-variant="white"
    >
      <div class="d-flex flex-column p-2">
        <h1 class="mb-3">Conta bancária</h1>

        <div class="d-flex flex-column justify-content-start">
          <div class="d-flex justify-content-start">
            <div class="d-flex flex-column mr-1">
              <span class="h5">Agência</span>
              <span>{{ bankAccount.agencia }}</span>
            </div>
            <div class="d-flex flex-column mr-1">
              <span class="h5">Banco</span>
              <span>{{ bankAccount.banco?.nome }}</span>
            </div>
            <div class="d-flex flex-column">
              <span class="h5">Conta bancária</span>
              <span>{{ bankAccount.conta }}</span>
            </div>
          </div>

          <hr />

          <div class="d-flex justify-content-start">
            <div class="d-flex flex-column mr-1">
              <span class="h5">Razão social</span>
              <span>{{ solicitacao.cedente?.razao_social }}</span>
            </div>
            <div class="d-flex flex-column mr-1">
              <span>CNPJ</span>
              <span>{{ solicitacao.cedente?.cnpj }}</span>
            </div>
          </div>
        </div>

        <div class="d-flex flex-row justify-content-between mt-1">
          <b-button
            variant="primary"
            class="mt-3"
            @click="$bvModal.hide('bankAccountModal')"
          >
            Fechar
          </b-button>
        </div>
      </div>
    </b-modal>
    <operation-detail-modal />
  </div>
</template>

<script>
import ToastificationContent from "@/views/admin/liquidation/components/ToastificationContent.vue";
import Datatable from "@/views/common/crud/components/Datatable.vue";
import EventBus from "@/services/event_bus";
import { BButton } from "bootstrap-vue";
import { downloadFromResponse } from "@/@core/comp-functions/forms/cc-dropzone";
import OperationDetailModal from "../../liquidation/components/modals/OperationDetailModal.vue";

export default {
  name: "AdminLiquidationIndexPage",
  components: {
    Datatable,
    BButton,
    OperationDetailModal,
  },
  data() {
    return {
      selectedIds: [],
      bankAccount: {},
      solicitacao: {},
    };
  },
  mounted() {
    EventBus.$on("informar-pagamento", this.showReportPaymentModal);
    EventBus.$on("view-field-click", this.showBankAccountModal);
    EventBus.$on("baixar-CNAB", this.baixarCnab);
  },
  methods: {
    async baixarCnab(ids) {
      try {
        this.selectedIds = ids.map((id) => id.id);
        const response = await this.$store.dispatch(
          "admin/baixarCnab",
          this.selectedIds
        );

        downloadFromResponse(response.data, {
          mimeType: "text/plain",
          fileName: "cnab.txt",
        });
      } catch (error) {
        console.log(error);
      }
    },
    async reportPayment() {
      try {
        this.$swal.showLoading();
        await this.$store.dispatch("admin/reportPayment", this.selectedIds);
        this.$bvModal.hide("reportPaymentModal");
        this.$swal.close();
        this.$refs.liquidationDatatable.refresh();
        this.$toast({
          component: ToastificationContent,
          position: "top-right",
          props: {
            title: "Pagamento informado",
            icon: "CheckCircleIcon",
            avatarVariant: "success",
            TitleVariant: "black",
            text: "Você acaba de informar o pagamento das operações selecionadas.",
          },
        });
      } catch (error) {
        this.$swal({
          icon: "error",
          title: "Oops...",
          text: "Ocorreu um erro ao informar o pagamento",
        });
      }
    },
    showReportPaymentModal(ids) {
      this.selectedIds = ids.map((id) => id.id);
      this.$bvModal.show("reportPaymentModal");
    },
    async showBankAccountModal(item) {
      try {
        this.solicitacao = item;
        const { data } = await this.$store.dispatch(
          "admin/bankAccount",
          item.id
        );
        this.bankAccount = data;
        this.$bvModal.show("bankAccountModal");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
