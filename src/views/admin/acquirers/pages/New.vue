<template>
  <b-row>
    <b-col cols="12">
      <b-row class="px-2 py-1">
        <b-col cols="12">
          <app-page-header title="Credenciadoras" subtitle="Informe abaixo os dados cadastrais da credenciadora" />
        </b-col>
      </b-row>
      <b-row align-v="start">
        <b-col cols="12">
          <b-card variant="white">
            <acquirer-form @cancel="$router.push({name: 'admin-credenciadoras.index'})" />
          </b-card>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import {
  BCard, BCol, BRow,
} from 'bootstrap-vue'
import AcquirerForm from '@views/admin/acquirers/components/AcquirerForm.vue'
import AppPageHeader from '@core/components/app-page-header/AppPageHeader.vue'

export default {
  name: 'NewAcquirer',
  components: {
    AppPageHeader,
    AcquirerForm,
    BCard,
    BCol,
    BRow,
  },
}
</script>
