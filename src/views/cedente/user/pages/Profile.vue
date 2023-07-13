<template>
  <div>
    <b-card>
      <b-row>
        <b-col cols="12">
          <b-alert class="p-1" show variant="warning" v-if="inAnalysis"><p><b>Cadastro em análise: </b>Suas informações estão em processamento. Em breve você será informado sobre esta análise</p></b-alert>
          <b-alert class="p-1 border-danger" show variant="danger" v-if="repproved"><p><b>Regularize seu cadastro: </b> {{ $store.state.auth.userData.empresa.ultima_validacao_documentacao.reason_disapproval }}.</p></b-alert>
        </b-col>
        <b-col cols="12">
          <b-row class="pb-2">
            <b-col class="d-flex align-items-start">
              <h4>Dados da Empresa</h4>
            </b-col>
            <b-col class="d-flex justify-content-end">
              <p><b-badge class="border-warning" v-if="inAnalysis" variant="light-warning" pill>Em análise</b-badge>
              <b-badge class="border-danger" v-if="repproved" variant="light-danger" pill>Reprovada</b-badge>
              <b-badge class="border-success" v-if="approved" variant="light-success" pill>Aprovada</b-badge>
              </p>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <CompanyDocumentCard :company="cedente" />
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="12">
          <b-row class="pb-2">
            <b-col class="d-flex align-items-start">
              <h4>Representantes legais da empresa</h4>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12">
              <representative-card v-for="representante in cedente.representantes_legais" :representativeData="representante" :key="representante.id" editable />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {BAlert, BBadge, BCard, BCol, BRow} from "bootstrap-vue";
import AppPageHeader from "@core/components/app-page-header/AppPageHeader";
import RepresentativeCard from "@/views/cedente/user/components/RepresentativeCard";
import CompanyDocumentCard from "@/views/admin/companies/components/CompanyDocumentCard";

export default {
  name: 'CompanyUserProfile',
  components: {
    RepresentativeCard,
    AppPageHeader,
    BCard, BRow, BCol, BAlert, BBadge,
    CompanyDocumentCard
  },
  data() {
    return {
      title: 'Minha Conta',
    }
  },
  methods: {
  },
  computed: {
    cedente() {
      return this.$store.state.cedente.current
    },
    repproved() {
      return this.$store.state.auth.userData.empresa.status_documentacao === 'reprovado'
    },
    inAnalysis() {
      return ['pendente', 'em_progresso'].includes(this.$store.state.auth.userData.empresa.status_documentacao)
    },
    approved() {
      return this.$store.state.auth.userData.empresa.status_documentacao === 'aprovado'
    }
  }
}
</script>
