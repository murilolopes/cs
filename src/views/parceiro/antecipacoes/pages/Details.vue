<template>
  <div>
    <b-card class="bg-transparent">
      <b-row>
        <b-col cols="6">
          <h1 class="mb-0">Detalhes de antecipação</h1>
        </b-col>
        <b-col cols="6" class="text-right">
          <b-button
            variant="outline-primary"
            @click="$router.push({ name: 'parceiro-antecipacoes.index' })"
          >
            <feather-icon icon="ArrowLeftIcon" /> Voltar</b-button
          >
        </b-col>
      </b-row>
    </b-card>
    <details-card
      :showResult="true"
      :showResume="false"
      :transaction="solicitacao_antecipacao"
      @reset="reset"
      @followStatus="followStatus"
    ></details-card>
  </div>
</template>

<script>
import DetailsCard from "@/views/cedente/dashboard/components/DetailsCard";
import { moneyFormat } from "@/@core/comp-functions/data_visualization/datatable";
import { BCard, BRow, BCol, BButton } from "bootstrap-vue";

export default {
  name: "Details",
  components: {
    DetailsCard,
    BButton,
    BCard,
    BRow,
    BCol,
  },
  mounted() {
    this.setData();
  },
  data() {
    return {
      solicitacao_antecipacao: {},
    };
  },
  methods: {
    async setData() {
      let id = this.$route.params.id;
      const { data } = await this.$store.dispatch(
        "cedente/creditSolicitationDetails",
        id
      );
      this.solicitacao_antecipacao = data;
      this.solicitacao_antecipacao.invoiceCount = data.resumo.quantidade_titulos;
      this.solicitacao_antecipacao.totalAmount = moneyFormat(data.resumo.valor_bruto);
      this.solicitacao_antecipacao.totalNetAmount = moneyFormat(
        data.resumo.valor_liquido
      );
      this.solicitacao_antecipacao.totalSelected = moneyFormat(
        data.resumo.total_selecionado
      );
      this.solicitacao_antecipacao.data_solicitacao = data.solicitacao.data_pedido;
      this.solicitacao_antecipacao.data_resgate = data.solicitacao.data_resgate;
      this.solicitacao_antecipacao.status = data.solicitacao.status;
      this.solicitacao_antecipacao.date = data.solicitacao.created_at;
      this.solicitacao_antecipacao.por_credenciadora = data.por_credenciadora;
    },
    reset() {
      return this.$router.push({ name: "parceiro-dashboard.index" });
    },
    followStatus() {
      return this.$router.push({ name: "parceiro-antecipacoes.index" });
    },
  },
};
</script>
