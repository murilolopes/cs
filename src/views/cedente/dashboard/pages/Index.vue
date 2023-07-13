<template>
  <div class="mb-220">
    <b-row class="mb-2">
      <div class="col-lg-7">
        <h1 class="text-dark">Antecipação de agenda de cartões de crédito</h1>
        <h4>{{  subtitle }}</h4>
      </div>
      <div class="col-lg-5 d-flex justify-content-end align-items-center">
        <complete-registration-alert v-if="algoNaoEstiverCerto > 0" />
      </div>
    </b-row>

    <credit-advance-card v-show="!showDetails && !showResult" ref="creditAdvanceCard" @proceed-with-advance="nextStep" @no-agenda="noAgenda = true" />

    <details-card
      ref="detailsCard"
      v-if="showDetails"
      :showResume="showDetails"
      :showResult="showResult"
      :transaction="solicitation"
      :valuesToSimulate="valuesToSimulate"
      @confirmAntecipation="confirmAntecipation"
      @reset="reset"
      @followStatus="$router.push({ name: 'antecipacoes.index' })"
    />

    <b-modal
      id="complete-registration-modal"
      centered
      hide-footer
      header-bg-variant="white"
    >
      <div class="d-flex flex-column justify-content-start align-items-start">
        <h3 class="text-primary">Complete seu cadastro</h3>
        <br />
        <p>
          Para prosseguir com a contratação do seu crédito precisamos que você complete
          algumas informações de cadastro importantes e envie os seguintes documentos:
        </p>
        <ul>
          <li>Estatuto social</li>
          <li>Documento com foto</li>
          <li>Comprovante de residência</li>
        </ul>
        <span>Continuar para completar o seu cadastro agora?</span>
        <div class="mt-2 mb-1 d-flex justify-content-center w-100">
          <b-button
            variant="outline-primary"
            class="mr-2"
            @click="$bvModal.hide('complete-registration-modal')"
            >Cancelar</b-button
          >
          <b-button
            variant="primary"
            @click="$router.push({ name: 'complete-registration' })"
            >Continuar</b-button
          >
        </div>
      </div>
    </b-modal>

    <b-modal
      id="complete-documentation-modal"
      centered
      hide-footer
      header-bg-variant="white"
    >
      <div class="d-flex flex-column justify-content-center align-items-center">
        <span class="text-center mb-2"
          >Não é possível prosseguir com a contratação. Antes de continuar, destacamos que
          é indispensável regularizar o seu cadastro.</span
        >
        <b-button
          variant="primary"
          @click="$router.push({ name: 'minha-conta' })"
          class="mb-1"
          >Regularizar agora</b-button
        >
      </div>
    </b-modal>

    <b-modal id="in-progress-modal" centered hide-footer header-bg-variant="white">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <h3>Cadastro em análise</h3>
        <span class="text-center mb-2"
          >Suas informações precisam passar por um processo de análise e validação. Esse
          processo só ocorre na sua primeira contratação, ou em caso de eventuais
          alterações da documentação.</span
        >
        <span class="text-center mb-2"
          >Fique tranquilo, em até 48 horas você será informado para continuar com o seu
          processo de contratação de crédito.</span
        >
        <b-button
          variant="primary"
          class="mb-1"
          @click="$bvModal.hide('in-progress-modal')"
          >Aguardar</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
import { BRow, BCol, BCard, BButton, BModal, BImg } from "bootstrap-vue";
import CompleteRegistrationAlert from "@/views/cedente/dashboard/components/CompleteRegistrationAlert.vue";
import DetailsCard from "@/views/cedente/dashboard/components/DetailsCard";
import CreditAdvanceCard from "@/views/cedente/dashboard/components/CreditAdvanceCard";
import {
  moneyFormat,
} from "@core/comp-functions/data_visualization/datatable";

export default {
  name: "Dashboard",
  components: {
    BImg,
    BRow,
    BCol,
    BCard,
    BButton,
    BModal,
    DetailsCard,
    CreditAdvanceCard,
    CompleteRegistrationAlert,
  },
  data: () => {
    return {
      subtitle: "Defina abaixo o valor que você deseja contratar",
      noAgenda: false,
      showDetails: false,
      showResult: false,
      solicitation: {},
      solicitationStatusRequest: {},
      valuesToSimulate: [],
      solicitationId: null,
      counter: 0,
    };
  },
  async mounted() {
    // this.$store.dispatch("auth/getCurrentEconomicGroupData");
  },
  methods: {
    async nextStep(valuesToSimulate) {
      this.valuesToSimulate = valuesToSimulate
      this.showCreditAdvanceResume();
    },
    async confirmAntecipation() {
      try {
        this.$swal.fire({
          title: "Carregando informações",
          text: "Aguarde um instante enquanto carregamos as informações da operação",
          showConfirmButton: false,
          allowOutsideClick: false,
          imageUrl: "loading-antecipa.gif",
          imageAlt: 'Custom image'
        });
        const { data } = await this.$store.dispatch("dashboard/confirmAntecipation", this.solicitationPayload);
        this.solicitationId = data.solicitacao.id;
        this.waitingSolicitationStatus()
      } catch (error) {
        console.log("Erro ao solicitar antecipação de agenda")
        console.log(error)
      }
    },
    reset() {
      this.showDetails = false;
      this.showResult = false;
      this.solicitation = {};
    },
    showCompleteRegistrationModal() {
      this.$bvModal.show("complete-registration-modal");
    },
    showCompleteDocumentationModal() {
      this.$bvModal.show("complete-documentation-modal");
    },
    showInProgressModal() {
      this.$bvModal.show("in-progress-modal");
    },
    async showCreditAdvanceResume() {
      if (this.statusDocumentation === "nao_enviado")
        return this.showCompleteRegistrationModal();
      if (this.statusDocumentation === "reprovado")
        return this.showCompleteDocumentationModal();
      if (this.statusDocumentation === "em_validacao") return this.showInProgressModal();

      // hasValueGreaterThan1000 = valuesToSimulate.some(v => v.valor_selecionado >= 1000)
      // if (!hasValueGreaterThan1000) return

      this.$swal.fire({
        title: "Carregando informações",
        text: "Aguarde um instante enquanto analisamos nosso banco de dados",
        showConfirmButton: false,
        allowOutsideClick: false,
        imageUrl: "loading-antecipa.gif",
        imageAlt: 'Custom image'
      });

      // const payload = valuesToSimulate.valor_solicitado_por_credenciadora.filter(v => v.valor_selecionado > 0)

      try {
        const { data } = await this.$store.dispatch("dashboard/preview", this.valuesToSimulate);
        this.showDetails = true;

        this.setSolicitation(data)

        // if (data.info) {
        //   this.$swal.fire({
        //     title: "Atenção!",
        //     text: data.info,
        //     icon: "warning",
        //     confirmButtonText: "Ok",
        //   });
        //   return
        // }

        // if (data.solicitacao.id) {
        //   this.solicitationId = data.solicitacao.id
        //   this.solicitationStatusRequest = await setInterval(this.checkSolicitationStatus, 1000);
        //   return
        // }
      } catch (error) {
        clearInterval(this.checkSolicitationStatus);

        this.$swal.fire({
          title: "Atenção!",
          text: error.response.data,
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
    },
    async waitingSolicitationStatus() {
      try {
        this.solicitationStatusRequest = await setInterval(this.checkSolicitationStatus, 1000);
      } catch (error) {
        clearInterval(this.checkSolicitationStatus);
        this.$swal.fire({
          title: "Atenção!",
          text: error.response.data,
          icon: "warning",
          confirmButtonText: "Ok",
        });
      }
    },
    async checkSolicitationStatus() {
      this.counter ++
      if(this.counter == 6) {
        clearInterval(this.solicitationStatusRequest)
        this.$router.push({
          name: "operation-details",
          params: {
            id: this.solicitationId,
            transaction: this.solicitation
          },
        })
        this.$swal.close()
      }
      try {
        const { data } = await this.$store.dispatch("dashboard/checkSolicitationStatus", this.solicitationId);
        if (data.status === "sucesso_webhook") {
          clearInterval(this.solicitationStatusRequest)
          this.$router.push({ name: "antecipacoes.details", params: { id: this.solicitationId } })

          this.$swal.close()
        } else if (data.status === "ERRO_REQUISICAO_WEBHOOK") {
          clearInterval(this.solicitationStatusRequest)
          this.$swal.fire({
            title: "Atenção!",
            text: "Ocorreu um erro ao processar a solicitação, tente novamente mais tarde.",
            icon: "warning",
            confirmButtonText: "Ok",
          });
        }
      } catch (error) {
        clearInterval(this.checkSolicitationStatus)
      }
    },
    setSolicitation(data) {
      this.solicitation = data;
      this.solicitation.invoiceCount = data.resumo.quantidade_titulos;
      this.solicitation.totalAmount = moneyFormat(data.resumo.total_bruto);
      this.solicitation.totalNetAmount = moneyFormat(data.resumo.total_liquido);
      this.solicitation.totalSelected = moneyFormat(data.resumo.total_solicitado);
      this.solicitation.data_pedido = data.resumo.data_pedido;
      this.solicitation.data_resgate = data.resumo.data_resgate;
      // this.solicitation.status = data.solicitacao.status;
      this.solicitation.confirmButtonDisabled = false
      this.showDetails = true;
      this.$swal.close()
    }
  },
  computed: {
    solicitationPayload() {
      let values = this.$refs?.creditAdvanceCard?.valuesToSimulate
      values.valor_solicitado_por_credenciadora = values.valor_solicitado_por_credenciadora.filter(v => v.valor_solicitado > 0)
      return {
        ...values
        // dias: this.$refs?.creditCardAdvanced?.period,
        // cnpjs: this.$refs?.creditCardAdvanced?.selectedCnpjs,
      };
    },
    statusDocumentation() {
      let algumAprovado = this.$store.state.auth.currentEconomicGroup.cedentes.some(cedente => {
        return cedente.status_documentacao === "aprovado"
      })

      if (algumAprovado) return "aprovado"

      return "nao_enviado"
    },
    algoNaoEstiverCerto() {
      return this.$store.state.auth.currentEconomicGroup.cedentes.filter(
        (c) => {
          return c.status_documentacao !== "aprovado" && c.status_documentacao !== "em_validacao"
        }
      ).length;
    },
  },
  watch: {
    noAgenda(newValue) {
      if (newValue === true) this.subtitle = 'Sem títulos para antecipar nesse momento'
    },
  },
};
</script>

<style lang="scss">
.mb-220 {
  margin-bottom: 220px;
}
</style>