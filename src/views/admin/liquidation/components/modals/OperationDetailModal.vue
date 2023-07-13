<template>
  <b-modal ref="OperationDetailModal"
    size="xl"
    hide-footer
    centered
    header-bg-variant="white"
    body-class="pl-3 pr-3 pb-3 pt-0"
  >
  <div class="d-flex flex-row justify-content-between">
    <span
      class="d-flex flex-row align-items-center"
      style="font-size: 16px; font-weight: bold;"
    >
    Operação {{ operation.operacao.id }}
    </span>
    <span class="d-flex flex-row justify-content-end justify-items-center mr-1">
      Data: {{ formatDate(operation.date) }}
    </span>
  </div>
  <div class="d-flex flex-row justify-content-between mt-1">
    <b-link
      class="d-flex flex-row align-items-center"
      @click="$router.push({ name: 'admin-economicGroup.show', params: { id: operation.grupo_economico.id } })"
    >
    {{ operation.grupo_economico.nome }}
    </b-link>
    <div class="d-flex flex-row justify-content-between">
      <b-button size="sm" variant="flat-primary" class="d-flex align-items-center mr-1"
      @click="baixarCnab(operation.operacao)">
        Baixar CNAB <feather-icon size="20" icon="DownloadIcon" class="ml-50" />
      </b-button>
    </div>
  </div>
  <div class="mt-1">
    <b-table
      id="contratos-table"
      ref="contratos-table"
      class="mb-0; border"
      hover
      responsive
      selectable
      :items="operation.contratos"
      :fields="fields"
    >
    <template #cell(status)="data">
      <span v-html="data.value" class="d-flex align-items-center justify-content-center text-center" />
    </template>
    </b-table>
  </div>
  </b-modal>
</template>

<script>
import { BModal, BCol, BRow, BButton, BTable, BLink } from 'bootstrap-vue'
import EventBus from '@/services/event_bus';
import {  moneyFormatDatatable, dateTimeFormatter } from "@/@core/comp-functions/data_visualization/datatable";

export default {
  name: 'OperationDetailModal',
  components: {
    BModal,
    BCol,
    BRow,
    BButton,
    BTable,
    BLink,
  },
  data() {
    return {
      operation: {
        grupo_economico: {},
        date: null,
        operacao: {},
        contratos: [],
      },
      fields: [ {
        label: 'Cedente',
        key: 'cedente',
        sortable: true,
      }, {
        label: 'Valor',
        key: 'valor',
        formatter: moneyFormatDatatable,
        sortable: true,
      }, {
        label: 'Banco',
        key: 'banco',
        sortable: true,
      }, {
        label: 'Agência',
        key: 'agencia',
        sortable: true,
      }, {
        label: 'Conta',
        key: 'conta',
        sortable: true,
      },{
        label: 'Dígito',
        key: 'digito',
        sortable: true,
      }]
    }
  },
  async mounted() {
    EventBus.$on('show-modal-on-action', this.getData)
  },
  methods: {
    async getData(item) {
      const { data } = await this.$store.dispatch('admin/operationDetails', item.id);

      if (data) {
        this.operation = data;
        this.$refs.OperationDetailModal.show()
      } else {
          console.error('Response data is undefined');
      }
    },
    formatDate() {
      if (!this.operation.date) return "-";

      return dateTimeFormatter(this.operation.date);
    },
    baixarCnab(item) {
      EventBus.$emit('baixar-CNAB', [item]);
    }
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import "@core/scss/base/pages/app-file-manager";

#contratos-table th {
  background-color: #EFF4F6;
  color: #242A32;
}
</style>