<template>
  <b-card>
    <b-card-title>Inclua as filiais da sua empresa</b-card-title>
    <b-row>
      <b-col cols="12">
        <b-form-group :label="label" label-for="subsidiary">
          <b-input-group>
            <b-form-input placeholder="Ex: 0002-88" v-model="cnpj" v-mask="'####-##'" />
            <b-input-group-append>
              <b-button variant="primary" class="d-flex align-items-center" size="sm" :disabled="cnpj.length < 7" @click="addSubsidiary">
                Incluir <feather-icon size="20" icon="PlusIcon" />
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>

    <div class="mt-1">
      <vue-scrollbar :style="scrollbar" class="bg-transparent">
        <b-list-group>
          <b-list-group-item class="list-header text-dark font-weight-bolder">Empresas incluídas</b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center cc-list-item-padding" v-if="!cnpjs.length">Sem filiais cadastradas</b-list-group-item>
          <b-list-group-item class="d-flex justify-content-between align-items-center cc-list-item-padding" v-for="(subsidiary, index) in cnpjs" :key="index">
            {{ subsidiary }}
            <b-button size="sm" variant="flat-primary" class="d-flex align-items-center" @click="removeSubsidiary(index)">
              Excluir <feather-icon size="20" icon="Trash2Icon" class="ml-50" />
            </b-button>
          </b-list-group-item>
        </b-list-group>
      </vue-scrollbar>
    </div>
  </b-card>
</template>

<script>
import { BCard, BRow, BCol, BButton, BCardTitle, BListGroup, BListGroupItem, BFormInput, BInputGroup, BInputGroupAppend, BFormGroup } from "bootstrap-vue";
import VueScrollbar from 'vue2-scrollbar';
import "vue2-scrollbar/dist/style/vue2-scrollbar.css"

export default {
  name: "SubsidiaryCard",
  components: { BCard, BRow, BCol, BButton, BCardTitle, BListGroup, BListGroupItem, BFormInput, BInputGroup, BInputGroupAppend, BFormGroup, VueScrollbar },
  data() {
    return {
      label: '',
      cnpj: '',
      cnpjs: [],
      scrollbar: {
        maxHeight: "210px",
        width: "100%"
      },
    };
  },
  async mounted() {
    const payload = { cedente_id: this.$route.params.id }
    const { data } = await this.$store.dispatch('cedente/fetchSubsidiaries', payload)
    this.cnpjs = data

    this.label = `CNPJ: ${this.baseCnpj}`
  },
  methods: {
    async addSubsidiary() {
      try {
        let cnpj = `${this.baseCnpj}/${this.cnpj}`
        const payload = { cedente_id: this.$route.params.id, cnpj }
        const { data } = await this.$store.dispatch('cedente/addSubsidiary', payload)
        this.cnpjs.push(cnpj)
        this.cnpj = '';
      } catch (error) {
      }
    },
    async removeSubsidiary(index) {
      this.$swal.fire({
        title: "Excluir filial?",
        text: "Essa alteração não pode ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Não",
        confirmButtonText: "Sim, excluir!",
      })
      .then(async (result) => {
        if (result.value) {
          try {
            const payload = { cedente_id: this.$route.params.id, cnpj: this.cnpjs[index] }
            await this.$store.dispatch('cedente/removeSubsidiary', payload)
            this.cnpjs.splice(index, 1)
          } catch (error) {
            this.$swal.fire({
              title: "Erro!",
              text: "Ocorreu um erro ao cancelar a antecipação.",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
        }
      });
    }
  },
  computed: {
    baseCnpj() {
      return this.$store.state.auth.userData.grupo_economico.cedentes.filter(cedente => cedente.id === this.$route.params.id)[0].cnpj.split('/')[0]
    }
  }
};
</script>
