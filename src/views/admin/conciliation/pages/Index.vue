<template>
  <div>
    <div class="file-manager-application">
      <div class="content-overlay" />
      <div class="header-navbar-shadow" />
      <div class="content-area-wrapper container-xxl p-0 overflow-visible">
        <div class="sidebar-left">
          <div class="sidebar">
            <div class="sidebar-file-manager">
              <div class="sidebar-inner">
                <div class="sidebar-list">
                  <div class="list-group p-2">
                    <h3 class="mt-1">Filtrar por</h3>
                    <div class="mt-2">
                      <v-select
                        v-model="filters.assignor"
                        :options="options.assignors"
                        placeholder="Cedente/grupo econômico"
                      />
                    </div>
                    <div class="mt-2">
                      <flat-pickr
                        v-model="filters.dueDate"
                        class="form-control"
                        :config="{ mode: 'range' }"
                        placeholder="Vencimento"
                      />
                    </div>
                    <div class="mt-2">
                      <v-select v-model="filters.acquirer" :options="options.acquirers" placeholder="Credenciadora" />
                    </div>
                    <div class="mt-2">
                      <v-select v-model="filters.flag" :options="options.flags" placeholder="Bandeira" />
                    </div>
                    <div class="mt-2">
                      <v-select v-model="filters.status" :options="options.statuses" multiple placeholder="Status" />
                    </div>
                    <div class="mt-2 d-flex justify-content-center">
                      <b-button variant="flat-primary" class="d-flex align-items-center" @click="clearFilters">
                        Limpar filtros <feather-icon size="22" icon="RotateCcwIcon" class="ml-2" />
                      </b-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="content-wrapper container-xxl p-0">
            <div class="body-content-overlay" />
            <div class="content-body">
              <div class="file-manager-main-content">
                <div class="file-manager-content-body h-100">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="justify-content-between align-items-center">
                      <div class="d-flex">
                        <div>
                          <b-button
                            id="conciliateButton"
                            variant="primary"
                            class="mr-2"
                            :disabled="!selectedRows.length"
                            @click="conciliate"
                          >
                            Dar baixa em selecionados
                            <img class="img-icon" height="18" width="18" src="@/assets/images/receipt_off_icon.svg" />
                          </b-button>
                        </div>
                        <feather-icon class="arrow" icon="ArrowRightIcon" size="24" />
                        <div class="ml-2">
                          <span> URs selecionadas </span>
                          <h3>{{ selectedUrsValue }}</h3>
                        </div>
                      </div>
                      <div class="mt-2">
                        <b-form-checkbox
                          id="selectAllCheckBox"
                          v-model="selectedAll"
                          class="mr-3"
                          @change="selectAll($event)"
                        >
                          Selecionar todos
                        </b-form-checkbox>
                      </div>
                    </div>
                    <div>
                      <b-button variant="outline-primary">
                        Conciliação por upload
                        <img class="img-icon" height="17" width="16" src="@/assets/images/export_icon.svg" />
                      </b-button>
                      <div class="d-flex align-items-center mt-2 justify-content-end">
                        <label class="mb-0">Mostrar</label>
                        <v-select
                          v-model="perPage"
                          :options="options.perPage"
                          :clearable="false"
                          class="per-page-selector d-inline-block mx-50"
                        />
                        <label class="mb-0">registros</label>
                      </div>
                    </div>
                  </div>
                  <div class="mt-1">
                    <b-table
                      id="conciliation-table"
                      ref="conciliation-table"
                      class="mb-0"
                      hover
                      responsive
                      selectable
                      :items="items"
                      :fields="fields"
                      :per-page="perPage"
                      @row-selected="onRowSelected"
                    >
                      <template #cell(select)="data">
                        <b-form-checkbox v-model="data.rowSelected" class="mr-3" @change="selectRow(data, $event)" />
                      </template>
                      <template #cell(status)="data">
                        <span
                          class="d-flex align-items-center justify-content-center text-center"
                          v-html="data.value"
                        />
                      </template>
                    </b-table>
                    <div class="cc-datatable-header-bg px-2 py-1">
                      <div class="d-flex align-items-center justify-content-end">
                        <span class="h4 mr-2 mb-0"> Total em URs disponíveis </span>
                        <h2 class="mb-0">
                          {{ availableUrsValue }}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                    <div class="d-flex align-items-center mt-1">
                      <b-button variant="flat-primary" class="mr-2" @click="exportUrs">
                        Exportar para Excel
                        <img class="img-icon" height="17" width="16" src="@/assets/images/export_icon.svg" />
                      </b-button>
                      <span v-show="items.length" class="mb-0 h5 mr-2"> {{ showing }} </span>
                    </div>
                    <div class="align-items-center mt-1 left-auto">
                      <b-pagination
                        v-model="currentPage"
                        :total-rows="totalRows"
                        :per-page="perPage"
                        first-number
                        last-number
                        class="mb-0"
                        :disabled="!activePagination"
                      >
                        <template #prev-text>
                          <feather-icon icon="ChevronLeftIcon" size="18" />
                        </template>
                        <template #next-text>
                          <feather-icon icon="ChevronRightIcon" size="18" />
                        </template>
                      </b-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BCard,
  BCol,
  BRow,
  BFormTags,
  BButton,
  BFormCheckbox,
  BTable,
  BPagination,
} from 'bootstrap-vue';
import vSelect from 'vue-select';
import flatPickr from 'vue-flatpickr-component';
import { formatDate } from '@core/utils/filter';
import { moneyFormat, moneyFormatDatatable, urStatusBadge } from '@/@core/comp-functions/data_visualization/datatable';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import { exportToXLS } from '@/@core/comp-functions/export/xlsexport';

export default {
  name: 'AdminConciliationIndexPage',
  components: {
    BInputGroup,
    BPagination,
    BFormInput,
    BInputGroupAppend,
    BFormCheckbox,
    BButton,
    BFormTags,
    BTable,
    flatPickr,
    vSelect,
    BCard,
    BRow,
    BCol,
  },
  data() {
    return {
      activePagination: false,
      selectedAll: false,
      totalRows: 0,
      selectedRows: [],
      items: [],
      fields: [
        {
          label: '',
          key: 'select',
        },
        {
          label: 'Vencimento',
          key: 'data_liquidacao',
          formatter: formatDate,
        },
        {
          label: 'Credenciadora',
          key: 'credenciadora.nome_fantasia',
        },
        {
          label: 'Bandeira',
          key: 'credit_card_brand.name',
        },
        {
          label: 'Cedente',
          key: 'cedente.nome_fantasia',
        },
        {
          label: 'Grupo econômico',
          key: 'grupo_economico.nome',
        },
        {
          label: 'Status',
          key: 'status',
          formatter: urStatusBadge,
        },
        {
          label: 'Valor UR',
          key: 'valor_constituido_total',
          formatter: moneyFormatDatatable,
        },
      ],
      currentPage: 1,
      perPage: 10,
      filters: {
        assignor: '',
        acquirer: '',
        flag: '',
        status: '',
        dueDate: '',
      },
      options: {
        acquirers: [],
        flags: [],
        assignors: [],
        perPage: [
          { value: 10, label: '10' },
          { value: 25, label: '25' },
          { value: 50, label: '50' },
        ],
        statuses: [
          { value: 'contratada', label: 'Pendentes' },
          { value: 'baixada', label: 'Baixadas' },
          { value: 'contestada', label: 'Contestadas' },
          { value: 'validada', label: 'Validadas' },
          { value: 'cancelada', label: 'Canceladas' },
          { value: 'validacao_falhou', label: 'Falhas' },
        ],
      },
    };
  },
  computed: {
    selectedUrsValue() {
      return moneyFormat(this.selectedRows.reduce((acc, row) => acc + parseFloat(row.valor_liquido), 0));
    },
    availableUrsValue() {
      return moneyFormat(this.items.reduce((acc, row) => acc + parseFloat(row.valor_liquido), 0));
    },
    showing() {
      const start = this.currentPage === 1 ? 1 : (this.currentPage - 1) * this.perPage + 1;
      const end = start === 1 ? this.perPage : start + this.perPage - 1;

      return `Mostrando de ${start} a ${end} de ${this.totalRows} registros`;
    },
    payload() {
      const filters = {
        cedente_id: this.filters.assignor?.value,
        credenciadora_id: this.filters.acquirer?.value,
        credit_card_brand_id: this.filters.flag?.value,
      };

      if (this.filters.dueDate.includes(' to ')) {
        filters.data_liquidacao_inicial = format(
          parse(this.filters?.dueDate.split(' to ')[0], 'yyyy-MM-dd', new Date()),
          'dd/MM/yyyy',
        );
        filters.data_liquidacao_final = format(
          parse(this.filters?.dueDate.split(' to ')[1], 'yyyy-MM-dd', new Date()),
          'dd/MM/yyyy',
        );
      } else if (this.filters.dueDate) {
        filters.data_liquidacao_inicial = format(parse(this.filters.dueDate, 'yyyy-MM-dd', new Date()), 'dd/MM/yyyy');
      }

      if (this.filters.status) filters.status = this.filters.status.map((status) => status.value);

      return {
        page: this.currentPage,
        per_page: this.perPage?.value || this.perPage,
        ...filters,
      };
    },
  },
  watch: {
    payload: {
      handler() {
        this.fetchUrs();
      },
      deep: true,
    },
  },
  async mounted() {
    await this.getFlags();
    await this.getAssignors();
    await this.getAcquires();
    await this.fetchUrs();
  },
  methods: {
    onRowSelected(items) {
      this.selectedRows = items;
    },
    selectRow(row, value) {
      this.$refs['conciliation-table'][value ? 'selectRow' : 'unselectRow'](row.index);
    },
    selectAll(value) {
      this.selectedAll = value;
      this.$refs['conciliation-table'][value === true ? 'selectAllRows' : 'clearSelected']();
    },
    async fetchUrs() {
      this.activePagination = false;
      try {
        const { data } = await this.$store.dispatch('admin/fetchUrs', this.payload);
        this.items = data.data;
        this.perPage = data.per_page;
        this.totalRows = data.total;
        this.currentPage = data.current_page;
      } catch (error) {
        console.log(error);
      }
      this.activePagination = true;
    },
    async getFlags() {
      try {
        const { data } = await this.$store.dispatch('admin/fetchCreditCardBrandsByUrs');
        this.options.flags = data.map((flag) => ({
          value: flag.id,
          label: flag.name,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    async getAssignors() {
      try {
        const { data } = await this.$store.dispatch('admin/fetchAssignorsByUrs');
        this.options.assignors = data.map((assignor) => ({
          value: assignor.id,
          label: assignor.nome_fantasia,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    async getAcquires() {
      try {
        const { data } = await this.$store.dispatch('admin/fetchAcquirersWithoutPaginateByUrs');
        this.options.acquirers = data.map((acquirer) => ({
          value: acquirer.id,
          label: acquirer.nome_fantasia,
        }));
      } catch (error) {
        console.log(error);
      }
    },
    async conciliate() {
      this.$swal({
        title: 'Conciliar URs',
        text: 'Você tem certeza que deseja conciliar as URs selecionadas?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, conciliar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true,
      }).then(async (result) => {
        if (result.value) {
          try {
            this.$swal.showLoading();
            await this.$store.dispatch(
              'admin/conciliateUrs',
              this.selectedRows.map((row) => row.id),
            );
            this.$swal.fire({
              title: 'Conciliação realizada com sucesso!',
              icon: 'success',
              showConfirmButton: true,
            });
            this.clearFilters();
            this.fetchUrs();
            this.selectAll(false);
          } catch (error) {
            console.log(error);
          }
        }
      });
    },
    clearFilters() {
      this.filters = {
        assignor: '',
        acquirer: '',
        flag: '',
        status: '',
        dueDate: '',
      };
    },
    exportUrs() {
      const urs = [];

      this.items.filter((ur) => {
        ur.nome_cedente = ur.cedente.nome_fantasia;
        ur.nome_credenciadora = ur.credenciadora.nome_fantasia;
        ur.nome_bandeira = ur.credit_card_brand.name;
        urs.push(ur);
      });

      urs.filter((ur) => {
        delete ur.cedente;
        delete ur.credenciadora;
        delete ur.credit_card_brand;
      });

      return exportToXLS(urs, 'Urs');
    },
  },
};
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/base/pages/app-file-manager';

.content-area-wrapper {
  height: auto !important;
}

.form-control-assignor {
  border-right: none;
}

.cc-datatable-header-bg {
  background-color: #eff4f6;
  color: #242a32;
}

#conciliation-table th {
  background-color: #eff4f6;
  color: #242a32;
}

.vs__dropdown-option {
  white-space: normal;
}

.arrow {
  margin-top: 8px;
}

.img-icon {
  margin-left: 4px;
  margin-bottom: 2px;
}

.left-auto {
  margin-left: auto;
}

.overflow-visible {
  overflow: visible !important;
}
</style>
