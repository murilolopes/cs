<template>
  <div>
    <admin-company-card />
    <h4 class="my-2">Dados e documentos dos representantes legais</h4>
    <admin-representative-card v-for="representante in representatives" :key="representante.id" :representative="representante"/>
  </div>
</template>

<script>
import AdminCompanyCard from '@/views/admin/companies/components/AdminCompanyCard.vue'
import AdminRepresentativeCard from '@/views/admin/companies/components/AdminRepresentativeCard.vue'

export default {
  name: 'GeneralData',
  components: {
    AdminCompanyCard,
    AdminRepresentativeCard,
  },
  data() {
    return {
      representatives: [],
    };
  },
  async mounted() {
    const { data } = await this.$store.dispatch("cedente/fetch", this.$route.params.idMatriz);
    this.representatives = data.representantes_legais;
  },
}
</script>

<style lang="scss">
@import "@core/scss/base/pages/app-file-manager";
</style>