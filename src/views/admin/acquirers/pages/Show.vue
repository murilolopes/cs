<template>
  <b-card variant="white">
    <acquirer-form @cancel="$router.push({ name: 'admin-credenciadoras.index' })" />
  </b-card>
</template>

<script>
import { BCard, BCol, BRow } from 'bootstrap-vue';
import AcquirerForm from '@views/admin/acquirers/components/AcquirerForm.vue';
import AppPageHeader from '@core/components/app-page-header/AppPageHeader.vue';

export default {
  name: 'ShowAcquirer',
  components: {
    AppPageHeader,
    AcquirerForm,
    BCard,
    BCol,
    BRow,
  },
};
</script>
