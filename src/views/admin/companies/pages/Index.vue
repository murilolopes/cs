<template>
  <div>
    <cc-datatable ref="client-datatable" :filterValues="[]">
      <template #table-caption>
        <h4>Gerencie as empresas da plataforma</h4>
      </template>
    </cc-datatable>

    <b-modal id="import-list" centered header-bg-variant="white" hide-footer>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <h3 class="mt-2 text-primary">Importar lista de clientes</h3>
        <div class="d-flex flex-column align-items-center w-75">
          <cc-dropzone standalone ref="emissao" v-model.sync="file" subtitle="Envie seu arquivo no formato XLSX." acceptFormats=".xlsx" />
        </div>
        <p><a
            href='https://creditcorp-public-assets.s3.sa-east-1.amazonaws.com/credito-frete/Template+importa%C3%A7%C3%A3o+de+empresas.xlsx'>Clique
          aqui</a> para baixar o template.</p>
        <div class="mt-3 mb-3">
          <b-button class="mr-2" variant="outline-primary" @click="$bvModal.hide('import-list')">Cancelar</b-button>
          <b-button :disabled="!hasFile" variant="primary" @click="importClients">Importar</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {BButton, BCard, BCol, BModal, BRow, BTable} from 'bootstrap-vue'
import CcDatatable from '@/views/common/crud/components/Datatable.vue'
import CcDropzone from '@/@core/components/cc-dropzone/CcDropzone.vue';

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BTable,
    CcDatatable,
    BModal,
    BButton,
    CcDropzone,
  },
  data() {
    return {
      file: {}
    }
  },
  methods: {
    showImportList() {
      this.$bvModal.show('import-list')
    },
    async importClients() {
      try {
        this.$swal.showLoading()
        await this.$store.dispatch('dashboard/importClients', this.file)
        this.$refs['client-datatable'].refresh()
        this.$swal.fire({
          title: 'Sucesso!',
          text: 'Lista importada com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        })
        this.$bvModal.hide('import-list')
      } catch (error) {
        this.$swal.fire({
          title: 'Erro!',
          text: 'Ocorreu um erro ao importar a lista!',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    },
    showModal() {
      this.$bvModal.show('import-list')
    },
  },
  computed: {
    hasFile() {
      return this.file instanceof File
    }
  }
}
</script>

<style lang="scss">

#my-table th {
  width: 10px;
  div {
    padding: 0;
    float: left;
  }
}

#my-table th[aria-colindex="4"] {
  div {
    float: none !important;
  }
}

#my-table td {
  span {
    float: left;
  }
}

#my-table td[aria-colindex="4"] {
  span {
    float: none !important;
  }
}

#my-table td[aria-colindex="5"] {
  button {
    float: right;
  }
}

#my-table th[aria-colindex="5"] {
  width: auto !important;
}
</style>
