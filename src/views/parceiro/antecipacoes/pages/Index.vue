<template>
    <div>
      <b-card class="bg-transparent mb-0">
        <b-row align-h="end" align-v="end">
          <b-col cols="12">
            <h1 class="mb-0">Operações na plataforma</h1>
            <h4>Visualize abaixo as operações realizadas na plataforma</h4>
          </b-col>
        </b-row>
      </b-card>
      <b-row align-v="start">
        <b-col cols="12">
          <datatable ref="antecipacoesDatatable">
          </datatable>
        </b-col>
      </b-row>
    </div>
  </template>

  <script>
  import { BCard, BCol, BRow } from "bootstrap-vue";
  import Datatable from "@/views/common/crud/components/Datatable";

  export default {
    name: "Antecipacoes",
    components: {
      BCard,
      BRow,
      BCol,
      Datatable,
    },
  };
  </script>

  <style scoped></style>
