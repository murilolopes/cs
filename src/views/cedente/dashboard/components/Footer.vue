<template>
  <div class="clearfix mb-0">
    <b-row>
      <b-col class="d-flex p-3">
        <img class="mr-2" src="@/assets/images/dados.png" alt="Dados seguros" height="75" width="75">
        <div>
          <h4>Seus dados preservados</h4>
          <span>A CreditCorp antecipa as duplicatas que sua empresa tem a receber.</span>
        </div>
      </b-col>
      <b-col class="d-flex p-3">
        <img class="mr-2" src="@/assets/images/plataforma.png" alt="Dados seguros" height="75" width="75">
        <div>
          <h4>Plataforma segura</h4>
          <span>A CreditCorp antecipa as duplicatas que sua empresa tem a receber.</span>
        </div>
      </b-col>
      <b-col class="d-flex p-3">
        <img class="mr-2" src="@/assets/images/perfil.png" alt="Dados seguros" height="75" width="75">
        <div>
          <h4>Perfil protegido</h4>
          <span>A CreditCorp antecipa as duplicatas que sua empresa tem a receber.</span>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { BLink, BCard, BRow, BCol } from 'bootstrap-vue'

export default {
  components: {
    BLink,
    BCard,
    BRow,
    BCol
  },
}
</script>
