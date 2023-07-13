<template>
  <cc-datatable>
    <template #table-caption>
      <h4>Acompanhe abaixo todas as suas operações realizadas</h4>
    </template>
    <template #table-header-actions>
      <b-button variant="primary" @click="toCredit()">Nova Antecipação</b-button>
    </template>
  </cc-datatable>
</template>

<script>
import { BButton, BCard, BCol, BModal, BRow, BTable, BBadge } from 'bootstrap-vue';
import CcDatatable from '@/views/common/crud/components/Datatable';

export default {
  name: 'Concessoes',
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    CcDatatable,
    BModal,
    BButton,
    BBadge,
  },
  data() {
    return {};
  },
  methods: {
    toCredit() {
      this.$router.push({ name: 'dashboard' });
    },
  },
};
</script>

<style scoped></style>
