<template>
  <div v-if="renderComponent">
    <b-card
      class="mb-0"
      :title="category.category"
      v-for="(category, index) in filters"
      :key="index"
    >
      <b-row v-for="(field, idx) in category.fields" :key="idx">
        <b-col cols="12">
          <b-form-group class="mb-2">
            <v-select
              v-if="field.type === 'select'"
              :id="`field-${field.key}`"
              v-model="filterValues[field.key]"
              :options="field.options"
              :placeholder="field.label"
              class="placeholder-dark"
            />

            <b-form-input
              v-else-if="field.type === 'text'"
              :id="`field-${field.key}`"
              v-model="filterValues[field.key]"
              class="form-control placeholder-dark"
              :placeholder="field.label"
            ></b-form-input>

            <div v-else-if="field.type === 'slider'">
              <h6>{{ field.label }}</h6>
              <vue-slider v-model="filterValues[field.key]" />
            </div>

            <flat-pickr
              v-else
              :id="`field-${field.key}`"
              v-model="filterValues[field.key]"
              class="form-control placeholder-dark"
              :config="{ mode: 'range' }"
              :placeholder="field.label"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-card>
    <b-row class="px-2">
      <b-col cols="12" class="d-flex flex-row justify-content-start">
        <b-button variant="outline-primary" @click="clearFilters">
          <feather-icon icon="RotateCcwIcon" /> Limpar filtros</b-button
        >
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCard, BButton, BFormGroup, BFormInput, BRow, BCol } from 'bootstrap-vue'
import Filters from '../components/Filters.vue'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'
import VueSlider from 'vue-slider-component'

export default {
  name: 'Filters',
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    Filters,
    vSelect,
    flatPickr,
    VueSlider,
    BFormGroup,
    BFormInput,
  },
  data() {
    return {
      renderComponent: true,
      filterValues: {},
      statusOptions: [],
    }
  },
  async mounted() {
    if (
      !this.$route.meta.indexObject?.filters?.length ||
      this.$route.meta.indexObject?.filters?.length < 2
    )
      return
    // !TODO: refatorar essa parte onde pega o index 1 para pegar de acordo com o filtro que tenha campo que precisa de request.
    this.statusOptions = this.$route.meta.indexObject?.filters[1].fields.filter(
      async (field, index) => {
        if (!!field.action) {
          try {
            const { data } = await this.$store.dispatch(field.action, {
              model: field.model,
              model_label: field.modelLabel,
              model_value: field.modelValue,
            })
            this.$nextTick(() => (field.options = data))
          } catch (error) {
            this.$nextTick(() => (field.options = []))
          }
        }
      },
    )
    this.forceRerender()
  },
  computed: {
    filters() {
      return this.$route.meta.indexObject?.filters
    },
  },
  methods: {
    clearFilters() {
      this.filterValues = {}
    },
    async forceRerender() {
      this.renderComponent = false
      await this.$nextTick()
      this.renderComponent = true
    },
  },
  watch: {
    filterValues: {
      handler() {
        let filters = {}

        Object.entries(this.filterValues).filter((obj) => {
          let key = obj[0]
          let value = typeof obj[1] === 'string' ? obj[1] : obj[1]?.value || ''

          if (value.match(/[0-9] to [0-9]/g)) value = value.split(' to ')
          if (value) filters[key] = value
        })

        this.$emit('updateFilterValues', filters)
      },
      deep: true,
    },
  },
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
.placeholder-dark {
  &::placeholder {
    color: #66788b;
    opacity: 1;
  }
}
</style>
