<template>
  <b-card class="mb-0" v-if="registrationStatus">
    <div class="row">
      <div class="col-2 d-flex justify-content-center align-items-center p-0 m-0">
        <b-img :src="registrationStatus.img" class="img-fluid" />
      </div>
      <div class="col-10 p-0">
        <div class="col-12 p-0">
          <h4>{{ registrationStatus.title }}</h4>
        </div>
        <div class="col-12 row p-0">
          <div class="col-9">
            <span class="mb-0" v-html="registrationStatus.subtitle"></span>
          </div>
          <div class="col-3 d-flex align-items-center justify-content-end p-0">
            <b-button
              variant="outline-primary"
              @click="$router.push({ name: 'complete-registration' })"
              >Continuar</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import { BCard, BButton, BImg } from "bootstrap-vue";

export default {
  name: "CompleteRegistrationAlert",
  components: {
    BCard,
    BButton,
    BImg,
  },
  computed: {
    registrationStatus() {
      const status = {
        nao_enviado: {
          title: "Complete seu cadastro",
          subtitle:
            `Regularize seu cadastro agora. ${this.pendingAssignorsCount} empresa(s) pendente(s).`,
          img: require("@/assets/images/dashboard/chart.svg"),
        },
        em_validacao: {
          title: "Cadastro em análise",
          subtitle:
            "Suas informações estão em processamento. Em breve você será informado sobre esta análise.",
          img: require("@/assets/images/dashboard/clock.svg"),
        },
        reprovado: {
          title: "Pendência no cadastro",
          subtitle: "Regularizar o seu cadastro antes de prosseguir.",
          img: require("@/assets/images/dashboard/alert-octagon.svg"),
        },
      };
      return status['nao_enviado'];
    },
    inAnalysis() {
      return (
        this.$store.state.auth.currentEconomicGroup.status_documentacao === "nao_enviado"
      );
    },
    pending() {
      return this.$store.state.auth.currentEconomicGroup.status_documentacao === "reprovado";
    },
    pendingAssignorsCount() {
      return this.$store.state.auth.currentEconomicGroup.cedentes.filter(
        (cedente) => cedente.status_documentacao === 'nao_enviado' || 
                     cedente.status_documentacao === 'reprovado'
      ).length;
    },
  },
};
</script>
