<template>
  <div>
    <b-table id="transactions-table" responsive class="position-relative text-center border" :current-page="currentPage"
      :items="acquirer.titulos" :fields="fields" :per-page="perPage">
      <template #cell(data_vencimento)="data">
        <span>{{ dateFormatter(data.item.data_vencimento) }}</span>
      </template>
      <template #cell(valor_total_transacao)="data">
        <span>{{ moneyFormat(data.item.valor_total_transacao) }}</span>
      </template>
      <template #cell(valor_bruto)="data">
        <span>{{ moneyFormat(data.item.valor_bruto) }}</span>
      </template>
      <template #cell(valor_liquido)="data">
        <span>{{ moneyFormat(data.item.valor_liquido) }}</span>
      </template>
      <template #cell(taxa)="data">
        <span>{{ percentageFormatter(data.item.taxa) }}</span>
      </template>
      <template #cell(taxa_efetiva)="data">
        <span>{{ percentageFormatter(data.item.taxa_efetiva) }}</span>
      </template>
    </b-table>

    <div>
      <b-row class="mt-2">
        <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
          <div class="flex">
            <b-button variant="flat-primary" @click.prevent="download" >Exportar para Excel <img class="img-icon" height="17" width="16" src="@/assets/images/export_icon.svg" /> </b-button>
            <span class="text-muted"> {{ showing(acquirer) }} </span>
          </div>
        </b-col>
        <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">
          <b-pagination v-model="currentPage" :total-rows="acquirer.titulos.length" :per-page="perPage" first-number
            last-number prev-class="prev-item" next-class="next-item" class="mb-0" aria-controls="transactions-table" :disabled="!activePagination">
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import { BTable, BPagination, BRow, BCol, BButton } from "bootstrap-vue";
import {
  moneyFormat,
  dateFormatter,
  percentageFormatter,
} from "@/@core/comp-functions/data_visualization/datatable.js/";
import { downloadFromResponse } from '@/@core/comp-functions/forms/cc-dropzone'
import axios from '@axios'

export default {
  name: "AcquirerTransactionsDataTable",
  props: {
    acquirer: { type: Object, default: () => { } },
    valuesToSimulate: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    BTable,
    BPagination,
    BRow,
    BCol,
    BButton,
  },
  filters: {
    moneyFormat,
    dateFormatter,
  },
  data() {
    return {
      activePagination: false,
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          label: "Data de Vencimento",
          key: "data_vencimento",
          sortable: true,
        },
        {
          label: "Estabelecimento",
          key: "nome_estabelecimento",
          sortable: true,
        },
        {
          label: "Bandeira",
          key: "bandeira",
          sortable: true,
        },
        {
          label: "Valor da Transação",
          key: "valor_total_transacao",
          sortable: true,
        },
        {
          label: "Valor Antecipado",
          key: "valor_bruto",
          sortable: true,
        },
        {
          label: "Taxa(a.m.)",
          key: "taxa",
          sortable: true,
        },
        {
          label: "Taxa efetiva",
          key: "taxa_efetiva",
          sortable: true,
        },
        {
          label: "Valor Líquido",
          key: "valor_liquido",
          sortable: true,
        },
      ],
    };
  },
  methods: {
    download() {
      this.activePagination = false
      axios.post(`${process.env.VUE_APP_API_BASE_URL}/antecipa_transacoes/exportar_titulos`, this.valuesToSimulate, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('accessToken')
        },
        responseType: 'blob'
      }).then((response) => {
          downloadFromResponse(response.data, { mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', fileName: 'titulos.xlsx' })
      });
      this.activePagination = true
    },
    percentageFormatter,
    moneyFormat,
    dateFormatter,
    showing(acquirer) {
      const start =
        this.currentPage === 1 ? 1 : (this.currentPage - 1) * this.perPage + 1;
      let end = start === 1 ? this.perPage : start + this.perPage - 1;
      if (end > acquirer.titulos.length) end = acquirer.titulos.length;

      return `Mostrando de ${start} a ${end} de ${acquirer.titulos.length} registros`;
    },
  },
};
</script>
<style>
.img-icon {
  margin-left: 3px;
  margin-bottom: 3px;
}
</style>

