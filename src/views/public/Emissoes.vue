<template>
  <div>
    <b-card>
      <b-row class="d-flex flex-row justify-content-between align-items-center">
        <b-col sm="12" md="6" lg="4" xl="4">
          <b-input-group class="input-group-merge mb-2">
            <b-input-group-prepend class="cs-select">
              <v-select
                v-model="search"
                :options="searchOptions"
                :clearable="false"
              />
            </b-input-group-prepend>
            <b-form-input
              id="x1"
              placeholder="Buscar"
              class="px-1"
              v-mask="'##/####'"
              @keypress.enter="updatePayload($event.target.value)"
              v-if="
                search.value === 'mes_emissao' ||
                search.value === 'mes_vencimento'
              "
            />
            <b-form-input
              id="x2"
              placeholder="Buscar"
              class="px-1"
              v-mask="''"
              @keypress.enter="updatePayload($event.target.value)"
              v-else
            />
            <b-input-group-append is-text>
              <feather-icon icon="SearchIcon" />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-col sm="12" md="6" lg="4" xl="4">
          <b-button-group class="mb-2 text-nowrap mr-3">
            <b-button
              :variant="selectedButtonVariant.all"
              class="text-dark"
              @click="selectButton('all')"
            >
              <strong>Todos</strong>
            </b-button>
            <b-button
              :variant="selectedButtonVariant.cri"
              class="text-dark"
              @click="selectButton('cri')"
            >
              <strong>CRI</strong>
            </b-button>
            <b-button
              :variant="selectedButtonVariant.cra"
              class="text-dark"
              @click="selectButton('cra')"
            >
              <strong>CRA</strong>
            </b-button>
            <b-button
              :variant="selectedButtonVariant.in_progress"
              class="text-dark"
              @click="selectButton('in_progress')"
            >
              <strong>Em andamento</strong>
            </b-button>
          </b-button-group>
        </b-col>
        <b-col
          class="d-flex flex-row justify-content-end align-items-center mb-2"
          sm="12"
          md="12"
          lg="4"
          xl="4"
        >
          <label class="mb-0 mr-1">Mostrar</label>
          <v-select
            v-model="perPage"
            :options="perPageOptions"
            :clearable="false"
          />
          <label class="mr-2 ml-1">registros</label>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          sm="6"
          md="6"
          lg="6"
          xl="4"
          v-for="(item, index) in items"
          :key="index"
        >
          <b-card>
            <div class="emissao-card-header d-flex align-items-end mb-2">
              <b-img :src="emissaoImage(item)" class="mr-1" />
              <div class="d-flex flex-column justify-content-start">
                <h4>
                  {{ item.tipo_emissao }} - {{ item.nome_fantasia }} -
                  {{ item.tipo_suboordinacao }}
                </h4>
                <span>{{ item.valor_global_emissao | moneyFormat }}</span>
              </div>
            </div>
            <div class="emissao-card-data">
              <div
                class="d-flex justify-content-between border-top pt-50 pb-50"
              >
                <span> Status </span>
                <b-badge
                  :class="`badge badge-light-${
                    item.is_ativo ? 'success' : 'danger'
                  } border-${item.is_ativo ? 'success' : 'danger'}`"
                >
                  <span class="text-dark">
                    {{ item.is_ativo ? "Ativo" : "Inativo" }}
                  </span>
                </b-badge>
              </div>
              <div
                class="d-flex justify-content-between border-top pt-50 pb-50"
              >
                <span> Emissão </span>
                <strong> {{ item.numero_emissao }} </strong>
              </div>
              <div
                class="d-flex justify-content-between border-top pt-50 pb-50"
              >
                <span> Data da Emissão </span>
                <strong> {{ item.data_emissao | formatDate }} </strong>
              </div>
              <div
                class="d-flex justify-content-between border-top pt-50 pb-50"
              >
                <span> Data do Vencimento </span>
                <strong> {{ item.data_vencimento | formatDate }} </strong>
              </div>
              <div
                class="d-flex justify-content-between border-top pt-50 pb-50"
              >
                <span> Código IF B3 </span>
                <strong> {{ item.id }} </strong>
              </div>
              <div
                class="d-flex justify-content-between border-top pt-50 pb-50"
              >
                <span> ISIN </span>
                <strong> {{ item.codigo_isin }} </strong>
              </div>
              <div
                class="d-flex justify-content-between border-top pt-50 pb-50"
              >
                <span> Emissor </span>
                <strong> {{ item.emissor }} </strong>
              </div>
              <div
                class="d-flex justify-content-between border-top pt-50 pb-50"
              >
                <span> Agente Fiduciário </span>
                <strong> {{ item.agente_fiduciario }} </strong>
              </div>
              <div
                class="d-flex justify-content-between border-top pt-50 pb-50"
              >
                <span> Remuneração </span>
                <strong> {{ item.remuneracao }} </strong>
              </div>
            </div>
            <div class="emissao-card-action">
              <b-button
                variant="primary"
                class="emissoes-details-button w-100 border-primary"
                @click="
                  $router.push({ name: 'detalhes', params: { id: item.id } })
                "
              >
                <span
                  class="text-dark d-flex justify-content-center align-items-center font-weight-bolder"
                >
                  Detalhes
                  <feather-icon icon="ArrowRightIcon" size="20" class="ml-1" />
                </span>
              </b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted"> {{ showing }} </span>
        </b-col>
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            first-number
            last-number
            prev-class="prev-item"
            next-class="next-item"
            class="mb-0"
            aria-controls="my-table"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { moneyFormat } from "@/@core/comp-functions/data_visualization/datatable";
// eslint-disable-next-line import/no-cycle
import { formatDate } from "@core/utils/filter";
import {
  BRow,
  BCol,
  BImg,
  BCard,
  BBadge,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend,
  BFormInput,
  BButton,
  BButtonGroup,
  BPagination,
} from "bootstrap-vue";
import vSelect from "vue-select";
import { mask } from "vue-the-mask";

export default {
  name: "Emissoes",
  components: {
    BRow,
    BCol,
    BImg,
    BCard,
    BBadge,
    BInputGroup,
    BButton,
    BButtonGroup,
    BInputGroupPrepend,
    BInputGroupAppend,
    vSelect,
    BFormInput,
    BPagination,
  },
  directives: { mask },
  filters: {
    moneyFormat,
    formatDate,
  },
  data() {
    return {
      items: [],
      currentPage: 1,
      search: {
        label: "Tipo de busca",
        value: "",
      },
      searchQuery: {
        key: "",
        value: "",
      },
      perPage: 10,
      totalRows: 0,
      selectedButton: "all",
      searchOptions: [
        {
          label: "Tipo de busca",
          value: "",
        },
        {
          label: "Por operação/Série",
          value: "serie",
        },
        {
          label: "Por emissão",
          value: "emissao",
        },
        {
          label: "Por ISIN",
          value: "codigo_isin",
        },
        {
          label: "Por IF B3",
          value: "codigo_cetip",
        },
        {
          label: "Por agente fiduciário",
          value: "agente_fiduciario",
        },
        {
          label: "Por mês da emissão",
          value: "mes_emissao",
        },
        {
          label: "Por mês da vencimento",
          value: "mes_vencimento",
        },
      ],
      perPageOptions: [10, 25, 50, 100],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    updatePayload(value) {
      this.searchQuery.key = this.search.value;
      this.searchQuery.value = value;
    },
    async getData() {
      try {
        const { data } = await this.$store.dispatch(
          "emissoes/fetch",
          this.emissoesPayload
        );
        this.items = data.data;
        this.currentPage = data.current_page;
        this.totalRows = data.total;
      } catch (error) {
        console.log(error);
      }
    },
    emissaoImage(emissao) {
      const options = {
        cri: "cri",
        cra: "cra",
      };

      // eslint-disable-next-line global-require, import/no-unresolved
      if (!options[emissao.tipo_emissao.toLowerCase()])
        return require("@/assets/images/recebíveis.svg");

      // eslint-disable-next-line import/no-dynamic-require, global-require
      return require(`@/assets/images/${
        options[emissao.tipo_emissao.toLowerCase()]
      }.svg`);
    },
    selectButton(type) {
      this.selectedButton = type;
    },
  },
  computed: {
    monthMask() {
      return this.searchQuery.value === "mes_emissao" ||
        this.searchQuery.value === "mes_vencimento"
        ? ["##/####"]
        : [""];
    },
    emissoesPayload() {
      let payload = {
        page: this.currentPage,
        per_page: this.perPage,
      };

      if (this.selectedButton !== "all")
        payload.tipo_emissao = this.selectedButton.toUpperCase();
      if (this.searchQuery.key && this.searchQuery.value)
        payload[this.searchQuery.key] = this.searchQuery.value;

      return payload;
    },
    selectedButtonVariant() {
      const types = {
        all: "outline-primary",
        cri: "outline-primary",
        cra: "outline-primary",
        in_progress: "outline-primary",
      };

      types[this.selectedButton] = "primary";

      return types;
    },
    showingStart() {
      if (this.totalRows === 0) return 0;

      return this.currentPage === 1
        ? 1
        : (this.currentPage - 1) * this.perPage + 1;
    },
    showingEnd() {
      let end = this.currentPage * this.perPage;
      if (end > this.totalRows) end = this.totalRows;

      return end;
    },
    showing() {
      return `Mostrando de ${this.showingStart} a ${this.showingEnd} de ${this.totalRows} registros`;
    },
  },
  watch: {
    emissoesPayload() {
      this.getData();
    },
  },
};
</script>

<style lang="scss">
.emissoes-details-button {
  background-color: #3fe4c6 !important;
  border: 1px solid #1eb499 !important;
}

.btn-primary {
  color: #000000 !important;
}

.cs-select .vs__dropdown-toggle {
  border-radius: 0.357rem 0 0 0.357rem;
}

.cs-select .vs--open .vs__dropdown-toggle {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
</style>
