<template>
  <div>
    <b-card class="cc-bg-light mb-0 card-actions-border">
      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column justify-content-between">
          <h4 class="mb-1">Empresa</h4>
          <div class="d-flex">
            <div class="mr-2">
              <span>Nome fantasia</span>
              <p class="text-dark">{{ company.nome_fantasia }}</p>
            </div>
            <div class="mr-2">
              <span>Razão Social</span>
              <p class="text-dark">{{ company.razao_social }}</p>
            </div>
            <div class="mr-2">
              <span>Website</span>
              <p class="text-dark">{{ company.website }}</p>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end align-items-start">
          <b-button variant="outline-primary bg-white" @click="$emit('open-edit')">Editar</b-button>
        </div>
      </div>

      <hr class="w-100" />

      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column justify-content-between">
          <h4 class="mb-1">Endereço</h4>
          <div class="d-flex">
            <div class="mr-2">
              <span>CEP</span>
              <p class="text-dark">{{ company.cep }}</p>
            </div>
            <div class="mr-2">
              <span>Logradouro</span>
              <p class="text-dark">{{ company.logradouro }}</p>
            </div>
            <div class="mr-2">
              <span>Número</span>
              <p class="text-dark">{{ company.logradouro_numero }}</p>
            </div>
            <div class="mr-2">
              <span>Complemento</span>
              <p class="text-dark">{{ company.complemento }}</p>
            </div>
            <div class="mr-2">
              <span>Bairro</span>
              <p class="text-dark">{{ company.bairro }}</p>
            </div>
            <div class="mr-2">
              <span>Cidade</span>
              <p class="text-dark">{{ company.cidade }}</p>
            </div>
            <div class="mr-2">
              <span>Estado</span>
              <p class="text-dark">{{ company.uf }}</p>
            </div>
          </div>
        </div>
      </div>

      <hr class="w-100" />

      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column justify-content-between">
          <h4 class="mb-0">Contrato social da empresa</h4>
          <div class="d-flex flex-column">
            <div class="d-flex align-items-center">
              <b-badge variant="light-primary" class="mt-50 w-100">
                <feather-icon icon="PaperclipIcon" size="16" />
                Anexo
              </b-badge>
              <feather-icon
                icon="Trash2Icon"
                size="20"
                class="mt-50 ml-50 cursor-pointer"
                stroke="#093272"
              />
            </div>
          </div>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>
import { BCard, BBadge, BCol, BRow, BButton } from 'bootstrap-vue'
import { extractNameFromS3Url, downloadURI } from '@core/comp-functions/forms/cc-dropzone'

export default {
  name: 'CompanyDataCard',
  props: {
    company: {},
  },
  components: {
    BCol,
    BRow,
    BCard,
    BBadge,
    BButton,
  },
  methods: {
    extractNameFromS3Url,
    downloadURI,
  },
}
</script>

<style scoped></style>
