<template>
  <b-card>
    <b-row>
      <b-col md="6">
        <b-form-group
          label="Nome"
          label-for="user-input-name"
        >
          <b-form-input
            id="user-input-name"
            placeholder="Nome"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Email"
          label-for="mc-email"
        >
          <b-form-input
            id="mc-email"
            placeholder="Email"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Senha"
          label-for="user-input-password"
        >
          <b-form-input
            id="user-input-password"
            placeholder="Senha"
            type="password"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Confirmar senha"
          label-for="user-input-password"
        >
          <b-form-input
            id="user-input-password"
            placeholder="Confirmar senha"
            type="password"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="Status"
          label-for="extract-filter-status"
        >
          <v-select
            id="extract-filter-status"
            :options="statusOptions"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col class="d-flex justify-content-end">
        <b-button
          type="submit"
          variant="primary"
          class="mr-1"
        >
          Salvar
        </b-button>
        <b-button
          type="reset"
          variant="outline-secondary"
        >
          Limpar
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard,
  BFormGroup,
  BFormInput,
  BButton,
  BRow,
  BCol,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  name: 'UserForm',
  components: {
    BRow,
    BCol,
    BCard,
    BFormGroup,
    BFormInput,
    BButton,
    vSelect,
  },
  data() {
    return {
      statusOptions: [],
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
