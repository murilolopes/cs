<template>
  <b-row>
    <b-col cols="9">
      <h1>{{ title }}</h1>
      <h4>{{ subtitle }}</h4>
    </b-col>
    <b-col cols="3" align-self="end">
      <b-row align-h="end">
        <slot name="header-left" />
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'

export default {
  name: 'AppPageHeader',
  components: { BRow, BCol },
  props: {
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
  },
}
</script>

<style scoped>
</style>
