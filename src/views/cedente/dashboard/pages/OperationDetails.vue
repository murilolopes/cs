<template>
  <div>
    <h1>Pedido de antecipação concluído</h1>
    <h4>Seu pedido de antecipação está em fase de processamento.</h4>

    <b-row>
      <b-col cols="12" class="mt-2">
        <b-card class="pt-1 pb-0">
          <b-row class="font-medium-1">
            <b-col cols="2" class="float-left text-center mt-5">
              <img class="p-0" src="@/assets/images/detalhes_operacao_img.svg" width="348.65" height="170.67">
            </b-col>
            <b-col cols="4" class="float-left p-0 text-center mt-5">
            </b-col>
            <b-col cols="6" class="float-left">
              <b-card class="cc-bg-light px-1 pb-0 mb-0">
                <b-row>
                  <b-col class="mb-1">
                    Status
                  </b-col>
                  <b-col class="text-right">
                    <span class="badge badge-light-warning border-warning badge-pill">processando</span>
                  </b-col>
                </b-row>
                <b-row class="mb-1">
                  <div class="px-1 w-100">
                    <div class="separator w-100"></div>
                  </div>
                </b-row>
                <b-row class="mb-1">
                  <b-col>
                    Total títulos
                  </b-col>
                  <b-col class="text-right">
                    <h5 class="text-black">{{ totalTitulos }}</h5>
                  </b-col>
                </b-row>
                <b-row class="mb-1">
                  <b-col>
                    Total bruto
                  </b-col>
                  <b-col class="text-right">
                    <h5 class="text-black">{{ totalBruto }}</h5>
                  </b-col>
                </b-row>
                <b-row class="mb-1">
                  <div class="px-1 w-100">
                    <div class="separator w-100"></div>
                  </div>
                </b-row>
                <b-row>
                  <b-col>
                    <h3 class="text-black">Total selecionado</h3>
                  </b-col>
                  <b-col class="text-right">
                    <h3 class="text-black">{{ totalSelecionado }}</h3>
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="mt-2">
              <b-card class="warning-card p-0 m-0">
                <p class="text-black font-small-4"><strong>* Valor aproximado:</strong> Este é um valor aproximado, sujeito à alteração após a confirmação.</p>
              </b-card>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12">
        <b-card-actions v-for="(acquirer, index) in acquirersWithValues"
          :key="index"
          class="mt-2"
          :title="`${acquirer.credenciadora.razao_social} - ${moneyFormat(acquirer.valor_bruto)} - Taxa efetiva média: ${percentageFormatter(transaction.resumo?.taxa_efetiva)}`"
          action-collapse
          collapsed
        >
          <acquirer-transactions-data-table :acquirer="acquirer" />
        </b-card-actions>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BCard, BCol, BRow,
} from 'bootstrap-vue'
import { BCardActions } from '@/@core/components/b-card-actions'
import AcquirerTransactionsDataTable from '@/views/cedente/dashboard/components/AcquirerTransactionsDataTable.vue'
import {
  percentageFormatter,
  moneyFormat,
} from '@/@core/comp-functions/data_visualization/datatable.js/'

export default {
  name: "OperationDetails",
  components: {
    BCard,
    BCol,
    BRow,
    BCardActions,
    AcquirerTransactionsDataTable
  },
  data: () => {
    return {
      transaction : {},
    }
  },
  mounted() {
    this.transaction = this.$route.params.transaction;
  },
  computed: {
    acquirersWithValues() {
      if (!this.transaction.por_credenciadora) return []

      return this.transaction.por_credenciadora
    },
    totalTitulos() {
      if (!this.transaction.por_credenciadora) return 0

      let sum = 0
      this.transaction.por_credenciadora.forEach((el) => {
        sum += el.titulos.length
      })

      return sum
    },
    totalBruto() {
      if (!this.transaction.por_credenciadora) return 0

      return this.transaction.totalAmount
    },
    totalSelecionado() {
      if (!this.transaction.por_credenciadora) return 0

      return this.transaction.totalSelected
    }
  },
  methods: {
    percentageFormatter,
    moneyFormat,
  }
}
</script>

<style lang="scss">
.separator {
  border-top: solid 1px #DAE1E8;
}
.warning-card {
  background-color: rgba(248, 149, 77, 0.12);
  border: solid 1px rgba(248, 149, 77, 1);
  max-height: 53px;

  .card-body {
    padding: 15px;
  }
}
</style>
