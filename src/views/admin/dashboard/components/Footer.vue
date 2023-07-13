<template>
  <div class="clearfix mb-0">
    <b-row>
      <b-col class="d-flex p-3">
        <img class="mr-2" src="@/assets/images/dados.png" alt="Dados seguros" height="75" width="75">
        <div>
          <h4>Seus dados preservados</h4>
          <span>Toda comunicação é feita de forma segura com criptografia AES-256. </span>
        </div>
      </b-col>
      <b-col class="d-flex p-3">
        <img class="mr-2" src="@/assets/images/plataforma.png" alt="Dados seguros" height="75" width="75">
        <div>
          <h4>Plataforma segura</h4>
          <span>Utilizamos uma  Infraestrutura homologada com os mais rígidos certificados internacionais</span>
        </div>
      </b-col>
      <b-col class="d-flex p-3">
        <img class="mr-2" src="@/assets/images/perfil.png" alt="Dados seguros" height="75" width="75">
        <div>
          <h4>Perfil protegido</h4>
          <span>Nós trabalhamos dentro das normas da LGPD para garantir a proteção dos seus dados pessoais</span>
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
