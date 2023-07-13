<template>
  <div>
    <representative-form v-if="isEditing" :representativeData="representanteToEdit" @cancel="hiddingForm" @saved="hideFormShowCard"/>
    <b-card class="cc-bg-light" v-else>
      <b-row>
        <b-col cols="12" class="d-flex justify-content-between align-items-end">
          <div class="d-flex flex-column">
            <div class="d-flex flex-row justify-content-between align-items-center mb-1">
              <h4 class="mb-0 mr-1">{{ representante.nome }}</h4>
              <representative-type :type="representante.tipo" />
            </div>
            <span class="h6">{{ representante.email }}</span>
          </div>
          <b-button variant="outline-primary" size="sm" @click="showEditForm" v-if="editable">Editar</b-button>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col cols="2">
          <div class="d-flex flex-column">
            <h4>Telefone</h4>
            <span class="h6">{{ representante.celular }}</span>
          </div>
        </b-col>
        <b-col cols="2">
          <div class="d-flex flex-column">
            <h4>CPF</h4>
            <span class="h6">{{ representante.cpf }}</span>
          </div>
        </b-col>
        <b-col cols="3">
          <div class="d-flex flex-column">
            <h4>RG</h4>
            <span class="h6">{{ representante.rg }} {{ representante.orgao_emissor_rg  }}/{{ representante.rg_uf }}</span>
          </div>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col cols="4">
          <div class="d-flex flex-column">
            <h4 class="mb-0"> Comprovante de residência </h4>
            <div class="d-flex justify-content-start align-items-end">
              <b-badge variant="light-primary" class="mt-1 mr-1 w-fit">
                <feather-icon icon="PaperclipIcon" size="16" /> {{ extractNameFromS3Url(representante.comprovante_residencia?.url) }}
              </b-badge>
              <feather-icon icon="DownloadIcon" size="20" stroke="#093272" class="cursor-pointer" @click="downloadURI(representante.comprovante_residencia?.url)" v-if="downloadable" />
            </div>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="d-flex flex-column">
            <h4 class="mb-0"> Documento de identidade </h4>
            <div class="d-flex justify-content-start align-items-end">
              <b-badge variant="light-primary" class="mt-1 mr-1 w-fit">
                <feather-icon icon="PaperclipIcon" size="16" />  {{ extractNameFromS3Url(representante.documento_identidade?.url) }}
              </b-badge>
              <feather-icon icon="DownloadIcon" size="20" stroke="#093272" class="cursor-pointer" @click="downloadURI(representante.documento_identidade?.url)" v-if="downloadable" />
            </div>
          </div>
        </b-col>
        <b-col cols="4" v-if="representante.procuracao?.url">
          <div class="d-flex flex-column">
            <h4 class="mb-0"> Procuração </h4>
            <div class="d-flex justify-content-start align-items-end">
              <b-badge variant="light-primary" class="mt-1 mr-1 w-fit">
                <feather-icon icon="PaperclipIcon" size="16" />  {{ extractNameFromS3Url(representante.procuracao?.url) }}
              </b-badge>
              <feather-icon icon="DownloadIcon" size="20" stroke="#093272" class="cursor-pointer" @click="downloadURI(representante.procuracao?.url)" v-if="downloadable" />
            </div>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import { BCard, BRow, BCol, BButton, BBadge } from 'bootstrap-vue'
import RepresentativeForm from "@/views/cedente/user/components/RepresentativeForm";
import RepresentativeType from "@/views/cedente/user/components/RepresentativeType";
import { extractNameFromS3Url, downloadURI } from "@core/comp-functions/forms/cc-dropzone";

export default {
  name: 'RepresentativeCard',
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BBadge,
    RepresentativeForm,
    RepresentativeType
  },
  props: {
    representativeData: {
      type: Object,
      default: () => ({}),
    },
    editable: {
      type: Boolean,
      default: false,
    },
    downloadable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEditing: false,
      representante: {
        comprovante_residencia: {
          url: ''
        },
        documento_identidade: {
          url: ''
        },
        procuracao: {
          url: ''
        },
      }
    };
  },
  mounted() {
    this.representante = this.representativeData
  },
  methods: {
    hiddingForm() {
      this.isEditing = false
      this.representante = this.representativeData
    },
    showEditForm() {
      this.isEditing = true;
      this.representanteToEdit = this.representante
    },
    hideFormShowCard() {
      this.isEditing = false;
      this.representante = this.representativeData
    },
    extractNameFromS3Url(url) {
      return extractNameFromS3Url(url)
    },
    downloadURI(url) {
      return downloadURI(url)
    }
  },
};
</script>
