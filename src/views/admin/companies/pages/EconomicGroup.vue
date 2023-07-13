<template>
  <b-card>
    <div>
      <h4 class="mb-0">Empresas do grupo econômico:</h4>
      <h4 class="text-dark mb-2">{{ grupo_economico }}</h4>
    </div>

    <b-row>
      <b-col cols="6" v-for="cedente in cedentes.data" :key="cedente.id">
        <economic-group-information-card class="mt-1" :cedente="cedente" />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import { BButton, BCard, BCol, BRow } from 'bootstrap-vue'
import EconomicGroupInformationCard from "@/views/cedente/user/components/EconomicGroupInformationCard";

export default {
  name: 'EconomicGroup',
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    EconomicGroupInformationCard,
  },
  data() {
    return {
      cedentes: [],
      grupo_economico: ''
    };
  },
  async mounted() {
    try {
      const response = await this.$store.dispatch("cedente/getCedentesFromEconomicGroup", this.$route.params.id);
      this.cedentes = response.data
      this.grupo_economico = this.cedentes.data[0].grupo_economico.nome
    } catch (error) {
      console.log(error);
    }
  },
  methods: {},
  computed: {},
}
</script>
