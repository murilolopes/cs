<template>
  <div>
    <b-card>
      <div class="d-flex flex-row justify-content-between align-items-start">
        <div class="d-flex flex-column align-items-start mb-1 p-0">
          <p class="h3 mb-0">Grupo econômico</p>
          <h3 class="text-dark mb-2">{{ economicGroupName }}</h3>
          <span class="bs-height-lg">Preencha e envie as informações referentes à cada Matriz registrada</span>
        </div>
        <div class="d-flex flex-row align-items-center justify-content-end">
          <b-button variant="outline-primary" @click="$router.push({
            name: 'economic-group.cedentes.new'
          })">Incluir CNPJ +</b-button>
        </div>
      </div>

      <b-row align-v="start">
        <b-col sm="12" md="6" v-for="cedente in cedentes" :key="cedente.id">
          <economic-group-information-card :cedente="cedente" />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BButton,
} from "bootstrap-vue";
import EconomicGroupInformationCard from "@/views/cedente/user/components/EconomicGroupInformationCard";

export default {
  name: "CompleteRegistration",
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    EconomicGroupInformationCard,
  },
  data() {
    return {
      economicGroupName: '',
      cedentes: []
    };
  },
  async mounted() {
    try {
      const { data } = await this.$store.dispatch("auth/getCurrentEconomicGroupData");
      this.economicGroupName = data.nome
      this.cedentes = data.cedentes
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
