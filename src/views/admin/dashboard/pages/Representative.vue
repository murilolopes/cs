<template>
  <div>
    <div class="d-flex justify-content-between mb-1">
      <h3>Representantes legais</h3>
      <b-button variant="primary" @click="showForm = true" v-if="!isCreating">Adicionar representante</b-button>
    </div>
    <representative-card v-for="representative in representatives" :key="representative.id" :representativeData="representative" @resent="getCompany" @deleted="getCompany" editable />
    <representative-form v-if="isCreating" @created="updateList" @cancel="showForm = false" @saved="updateList" />
  </div>
</template>

<script>
import RepresentativeForm from '@/views/cedente/user/components/RepresentativeForm.vue'
import RepresentativeCard from '@/views/cedente/user/components/RepresentativeCard.vue'
import { BButton } from 'bootstrap-vue'

export default {
  name: 'Representative',
  components: {
    RepresentativeForm,
    RepresentativeCard,
    BButton
  },
  data() {
    return {
      representatives: [],
      showForm: false
    }
  },
  async mounted () {
    await this.getCompany()
  },
  methods: {
    async updateList () {
      this.showForm = false
      await this.getCompany()
    },
    async getCompany() {
      const { data } = await this.$store.dispatch('cedente/fetch', this.$route.params.id)
      this.representatives = data.representantes_legais
    }
  },
  computed: {
    isCreating () {
      return this.representatives.length === 0 || this.showForm === true
    }
  }
}
</script>

<style lang="scss">
@import "@core/scss/base/pages/app-file-manager";
</style>