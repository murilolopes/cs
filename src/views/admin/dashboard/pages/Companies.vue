<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-1">
      <div class="d-flex justify-content-between align-items-center">
        <h4 class="mb-0 mr-1">Empresas do grupo econômico:</h4>
        <h3 class="mb-0">Millennium Falcon</h3>
      </div>
      <div class="d-flex flex-row align-items-center">
        <span class="font-weight-bold mr-1"> Apto para operar </span>
        <b-form-checkbox
          id="canOperate"
          v-model="apto_para_operar"
          switch
          class="custom-control-success"
        >
          <span class="switch-icon-left">
            <feather-icon icon="CheckIcon" />
          </span>
          <span class="switch-icon-right">
            <feather-icon icon="XIcon" />
          </span>
        </b-form-checkbox>
      </div>
    </div>
    <div class="">
      <div class="p-1 bg-gray border-gray">
        <validation-observer
          ref="businessGroup"
          #default="{ invalid }"
          class="d-flex flex-row justify-content-between align-items-start"
        >
          <validation-provider
            #default="{ errors }"
            mode="lazy"
            vid="cnpj"
            name="CNPJ"
            :rules="`required|cnpj`"
            class="w-100 mr-2"
          >
            <b-form-input
              id="cnpj"
              v-model="company.cnpj"
              :state="errors.length > 0 ? false : null"
              placeholder="Adicione um novo CNPJ"
              v-mask="'##.###.###/####-##'"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <validation-provider
            #default="{ errors }"
            mode="lazy"
            vid="name"
            name="Nome"
            :rules="`required`"
            class="w-100"
          >
            <b-form-input
              id="name"
              v-model="company.name"
              :state="errors.length > 0 ? false : null"
              placeholder="Informe um Nome"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
          <b-button
            variant="primary"
            :disabled="invalid"
            class="text-nowrap ml-2"
            @click="addCompany"
          >
            Incluir CNPJ
          </b-button>
        </validation-observer>
      </div>
      <div class="cnpjListBody border-gray">
        <vue-scrollbar ref="Scrollbar" :style="scrollbar">
          <b-list-group flush>
            <b-list-group-item v-for="(company, index) in companies" :key="index">
              <div class="d-flex justify-content-between align-items-center">
                <span>
                  {{
                    company.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
                  }}
                </span>
                <span>
                  {{ company.name }}
                </span>
                <b-button variant="flat-warning" size="sm" @click="openModalDeleteCnpj(index)">
                  Excluir <feather-icon icon="Trash2Icon" />
                </b-button>
              </div>
            </b-list-group-item>
          </b-list-group>
        </vue-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BCard,
  BTable,
  BPagination,
  BButton,
  BRow,
  BCol,
  BListGroup,
  BListGroupItem,
  BFormCheckbox,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import DatatableFiltersHandlerSidebar from '@/views/common/crud/components/DatatableFiltersHandlerSidebar.vue'
import EventBus from '@/services/event_bus'
import { exportToXLS } from '@/@core/comp-functions/export/xlsexport'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, cnpj } from '@validations'
import VueScrollbar from 'vue2-scrollbar'
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css'

export default {
  name: 'Companies',
  components: {
    BRow,
    BCol,
    BCard,
    BTable,
    BPagination,
    BListGroup,
    BButton,
    vSelect,
    BFormCheckbox,
    BInputGroup,
    BFormGroup,
    BListGroupItem,
    BFormInput,
    BInputGroupAppend,
    DatatableFiltersHandlerSidebar,
    ValidationProvider,
    ValidationObserver,
    VueScrollbar,
  },
  data() {
    return {
      company: {
        cnpj: '',
        name: '',
      },
      companies: [
        {
          cnpj: '12345678901234',
          name: 'Empresa 1',
          name: 'Empresa 1',
        },
        {
          cnpj: '12345678901234',
          name: 'Empresa 2',
        },
      ],
      companyHeaders: [
        {
          key: 'cnpj',
          label: 'CNPJ',
        },
        {
          key: 'name',
          label: 'Nome',
        },
        {
          key: 'actions',
          label: '',
        },
      ],
      apto_para_operar: true,
      scrollbar: {
        maxHeight: '250px',
        width: '100%',
      },
    }
  },
  mounted() {},
  methods: {
    async addCompany() {
      console.log(1, this.company)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/base/pages/app-file-manager';

.border-gray {
  border: 1px solid #dae1e8;
}

.bg-gray {
  background-color: #eff4f6;
}
</style>
