<template>
  <div>
    <b-card class="cc-bg-light">
      <b-row>
        <b-col cols="12" class="d-flex justify-content-start">
          <div class="d-flex flex-column mr-3">
            <h4>Nome fantasia</h4>
            <span class="h6">{{ company.nome_fantasia }}</span>
          </div>
          <div class="d-flex flex-column mr-3">
            <h4>Web site</h4>
            <span class="h6">{{ company.website }}</span>
          </div>
          <div class="d-flex flex-column mr-3">
            <h4>Razão social</h4>
            <span class="h6">{{ company.razao_social }}</span>
          </div>
          <div class="d-flex flex-column mr-3">
            <h4>CNPJ</h4>
            <span class="h6">{{
              company.cnpj?.replace(
                /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                "$1.$2.$3/$4-$5"
              )
            }}</span>
          </div>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col sm="12" md="4" lg="2" class="mb-1">
          <h4>CEP</h4>
          <span class="h6">{{ company.cep }}</span>
        </b-col>
        <b-col sm="12" md="4" lg="2" class="mb-1">
          <h4>Estado</h4>
          <span class="h6">{{ company.uf }}</span>
        </b-col>
        <b-col sm="12" md="4" lg="2" class="mb-1">
          <h4>Cidade</h4>
          <span class="h6">{{ company.cidade }}</span>
        </b-col>
        <b-col sm="12" md="4" lg="2" class="mb-1">
          <h4>Logradouro</h4>
          <span class="h6">{{ company.logradouro }}</span>
        </b-col>
        <b-col sm="12" md="4" lg="2" class="mb-1">
          <h4>Bairro</h4>
          <span class="h6">{{ company.bairro }}</span>
        </b-col>
        <b-col sm="12" md="4" lg="2" class="mb-1">
          <h4>Número</h4>
          <span class="h6">{{ company.logradouro_numero }}</span>
        </b-col>
        <b-col sm="12" md="4" lg="2" class="mb-1">
          <h4>Complemento</h4>
          <span class="h6">{{ company.complemento }}</span>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="12" class="d-flex justify-content-start">
          <div class="d-flex flex-column">
            <h4 class="mb-0">Estatuto social</h4>
            <!-- TODO do a component -->
            <div
              class="d-flex justify-content-start align-items-end"
              v-if="company.contrato_social?.url"
            >
              <b-badge variant="light-primary" class="mt-1 mr-1 w-fit">
                <feather-icon icon="PaperclipIcon" size="16" />
                {{ extractNameFromS3Url(company.contrato_social?.url) }}
              </b-badge>
              <feather-icon
                icon="DownloadIcon"
                size="20"
                stroke="#093272"
                class="cursor-pointer"
                @click="downloadURI(company.contrato_social?.url)"
              />
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { BCard, BRow, BCol, BButton, BBadge } from "bootstrap-vue";
import {
  extractNameFromS3Url,
  downloadURI,
} from "@core/comp-functions/forms/cc-dropzone";

export default {
  name: "CompanyDocumentCard",
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BBadge,
  },
  props: {
    company: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    extractNameFromS3Url,
    downloadURI,
  },
};
</script>
