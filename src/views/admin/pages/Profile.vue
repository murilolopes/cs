<template>
  <b-card> perfil </b-card>
</template>

<script>
import { BRow, BCol, BImg, BCard, BButton, BFormInput } from 'bootstrap-vue'
import ProfileForm from '@/views/investor/components/ProfileForm.vue'

export default {
  name: 'Profile',
  components: {
    BRow,
    BCol,
    BImg,
    BCard,
    BButton,
    BFormInput,
    ProfileForm,
  },
  data() {
    return {
      showForm: false,
    }
  },
  mounted() {},
}
</script>

<style lang="scss">
.card-cs-border {
  border-radius: 8px;
  border: 1px solid #becad4;
}

.card-cs-bg {
  border-radius: 8px;
  background: #f8fafc;
}
</style>
