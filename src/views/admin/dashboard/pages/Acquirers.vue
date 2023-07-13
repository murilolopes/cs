<template>
  <b-row>
    <b-col cols="12">
      <b-table />
    </b-col>
  </b-row>
</template>

<script>
import { BTable, BRow, BCol } from 'bootstrap-vue'

export default {
  name: 'AssignorAcquirers',
  components: {
    BTable,
    BRow,
    BCol,
  },
}
</script>
