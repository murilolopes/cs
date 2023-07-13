<template>
  <div>
    <b-row>
      <b-col>
        <datatable ref="antecipacoesDatatable">
          <template #table-caption>
            <div class="d-flex justify-content-start">
              <h4>Acompanhe abaixo todas as suas operações realizadas</h4>
            </div>
          </template>
        </datatable>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BCard, BCol, BRow } from 'bootstrap-vue';
import Datatable from '@/views/common/crud/components/Datatable';

export default {
  name: 'Antecipacoes',
  components: {
    BCard,
    BRow,
    BCol,
    Datatable,
  },
};
</script>

<style scoped></style>
