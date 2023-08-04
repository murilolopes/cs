<template>
  <b-row>
    <b-col cols="12">
      <b-card class="mb-1 emission-card-border">
        <h4 class="font-weight-bolder">Calculadora CREDITSEC</h4>
        <hr />
        <div class="d-flex justify-content-between align-items-center">
          <b-button-group class="mb-2 text-nowrap mr-3">
            <b-button
              :variant="selectedButtonVariant.price"
              class="text-dark"
              @click="selectButton('price')"
            >
              <strong>Preço</strong>
            </b-button>
            <b-button
              :variant="selectedButtonVariant.tax"
              class="text-dark"
              @click="selectButton('tax')"
            >
              <strong>Taxas</strong>
            </b-button>
          </b-button-group>

          <b-button
            variant="primary"
            class="text-dark"
            @click="calculateTax"
            :disabled="!canCalculateTax"
          >
            <strong>Calcular</strong>
          </b-button>
        </div>
        <div class="d-flex justify-content-end align-items-end text-nowrap">
          <b-form-group label="Código IF B3" label-for="if_b3" class="mb-0 max-w-10">
            <b-form-input v-model="codigo_isin" name="if_b3" :disabled="!!this.isin" />
          </b-form-group>
          <b-form-group label="Data do Cálculo" label-for="calcDate" class="mb-0 ml-1">
            <div class="input-icon">
              <flat-pickr
                v-model="calcDate"
                class="form-control"
                :config="{ dateFormat: 'd/m/Y' }"
              />
              <feather-icon icon="CalendarIcon" size="22" class="icon-position text-success" />
            </div>
          </b-form-group>
          <div
            v-if="selectedButton === 'tax'"
            class="d-flex justify-content-end align-items-end ml-1"
          >
            <b-form-group label="Taxa" label-for="tax" class="mb-0">
              <v-select v-model="tax" :options="taxOptions" :clearable="false" />
            </b-form-group>
            <feather-icon icon="PlusIcon" size="22" class="mb-75 mr-1 ml-1" />
            <b-form-group class="mb-0 max-w-6">
              <money v-model="taxValue" class="form-control" v-bind="percentage" maxlength="7" />
            </b-form-group>
          </div>
          <div v-else class="ml-1">
            <b-form-group class="mb-0">
              <money v-model="moneyValue" class="form-control" />
            </b-form-group>
          </div>
          <feather-icon icon="PauseIcon" size="22" class="rotate-90 mb-75 mr-1 ml-1" />
          <b-form-group class="mb-0">
            <b-form-input v-model="result" name="result" disabled />
          </b-form-group>
        </div>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow,
  BCol,
  BImg,
  BCard,
  BTable,
  BBadge,
  BFormInput,
  BFormGroup,
  BButton,
  BButtonGroup,
} from 'bootstrap-vue'
import { moneyFormat } from '@/@core/comp-functions/data_visualization/datatable'
import flatPickr from 'vue-flatpickr-component'
import { formatDate } from '@core/utils/filter'
import { mask } from 'vue-the-mask'
import vSelect from 'vue-select'

export default {
  name: 'EmissionCard',
  components: {
    BRow,
    BCol,
    BImg,
    BCard,
    BTable,
    BBadge,
    BButton,
    vSelect,
    flatPickr,
    BFormInput,
    BFormGroup,
    BButtonGroup,
  },
  directives: { mask },
  props: {
    isin: {
      type: String,
      default: '',
    },
  },
  filters: {
    moneyFormat,
    formatDate,
  },
  data() {
    return {
      result: '',
      taxValue: '',
      moneyValue: '',
      codigo_isin: '',
      calcDate: '',
      percentage: {
        max: 100,
        suffix: '%',
        prefix: '',
        precision: 2,
      },
      if_b3: '',
      selectedButton: 'price',
      tax: {
        label: 'IPCA (Acumulado) + X%',
        value: 1,
      },
      taxOptions: [
        {
          label: 'IPCA (Acumulado) + X%',
          value: 1,
        },
        {
          label: 'X% do valor na data',
          value: 2,
        },
      ],
    }
  },
  mounted() {
    this.codigo_isin = this.isin
  },
  methods: {
    selectButton(type) {
      this.result = ''
      this.selectedButton = type
    },
    async calculateTax() {
      this.$swal({
        title: 'Calculando...',
        onOpen: () => {
          this.$swal.showLoading()
        },
        allowOutsideClick: false,
      })
      try {
        let payload = {
          id: this.$route.params.id,
          data: this.calcDate,
          tipo: this.tax.value.toString(),
        }

        if (this.selectedButton === 'price') {
          payload.valor = this.moneyValue
        } else {
          payload.valor = this.taxValue
        }

        const { data } = await this.$store.dispatch('investor/calcDesagio', payload)
        this.result = moneyFormat(data.PrevisaoTotalPorCota)
      } catch (error) {
        console.log(1)
      } finally {
        this.$swal.close()
      }
    },
  },
  computed: {
    canCalculateTax() {
      return this.selectedButton === 'price'
        ? this.calcDate && this.moneyValue
        : this.calcDate && this.taxValue && this.tax.value
    },
    selectedButtonVariant() {
      const types = {
        price: 'outline-primary',
        tax: 'outline-primary',
      }

      types[this.selectedButton] = 'primary'

      return types
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';

.max-w-6 {
  max-width: 6rem;
}
.max-w-10 {
  max-width: 10rem;
}

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

.input-icon {
  position: relative;
  display: inline-block;
}

.icon-position {
  position: absolute;
  right: 10px;
  top: 8px;
}

.pus-table th {
  background-color: #eff4f6;
  color: #242a32;
}

.emission-card-border {
  border-radius: 8px;
  border: 1px solid #becad4;
}

.emission-card-bg {
  border-radius: 8px;
  border: 1px solid #becad4;
  background: #f8fafc;
}
</style>
