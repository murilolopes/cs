<template>
  <div>
    <b-row>
      <b-col>
        <Form />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue'
import Form from '../components/Form.vue'

export default {
  name: 'NewUser',
  components: { Form, BRow, BCol },
}
</script>
