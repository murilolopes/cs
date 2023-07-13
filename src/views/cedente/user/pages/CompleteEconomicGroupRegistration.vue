<template>
  <div>
    <b-row>
      <b-col cols="12">
        <b-card>
          <h3 class="mb-2">
            {{ cedente.nome_fantasia }} -
            {{ cedente.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') }}
          </h3>
          <company-form v-if="step === 1" :cedente="cedente" @updated="getCedente" />
          <!-- <company-card v-if="step === 2" :company="cedente" @open-edit="step = 1" /> -->
        </b-card>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="6">
        <subsidiaries :head-office="headOffice" />
      </b-col>
      <b-col cols="6">
        <bank-accounts :banks="cedente.contas_correntes" />
      </b-col>
    </b-row>
    <b-row class="mb-5">
      <b-col cols="12">
        <b-card>
          <div class="d-flex justify-content-between align-items-center">
            <h3 class="mb-0">Representantes legais</h3>
            <div class="d-flex justify-content-end">
              <b-button
                variant="outline-primary"
                class="d-flex align-items-center ml-1"
                @click="openRepresentativesModal"
              >
                Incluir representante já cadastrado
              </b-button>
              <b-button
                v-if="!showNewRepresentativeForm"
                variant="primary"
                class="d-flex align-items-center ml-1"
                @click="showNewRepresentativeForm = true"
              >
                Incluir novo representante <feather-icon size="20" icon="PlusIcon" class="ml-1" />
              </b-button>
            </div>
          </div>

          <representative-form
            v-if="showNewRepresentativeForm"
            class="mt-2 mb-2"
            @cancel="showNewRepresentativeForm = false"
            @saved="udpateList"
          />
          <representative-list ref="representativeList" />
        </b-card>
      </b-col>
    </b-row>

    <b-modal id="moreRepresentativesModal" centered hide-footer header-bg-variant="white">
      <div class="d-flex flex-column justify-content-start align-items-start">
        <h3 class="mb-0">Selecione um ou mais representantes</h3>

        <div class="mt-2 w-100 mb-2">
          <vue-scrollbar :style="scrollbar" class="bg-transparent">
            <b-list-group>
              <b-list-group-item class="list-header text-dark font-weight-bolder">
                Representantes já cadastrados
              </b-list-group-item>
              <b-list-group-item
                v-for="(representative, index) in economicGroupRepresentatives"
                :key="index"
                class="d-flex justify-content-start align-items-center cc-list-item-padding"
              >
                <b-form-checkbox v-model="selectedRepresentatives" :value="representative.id" />
                {{ representative.nome }}
                <!-- <b-button size="sm" variant="flat-primary" class="d-flex align-items-center" @click="removeSubsidiary(index)">
                  Excluir <feather-icon size="20" icon="Trash2Icon" class="ml-50" />
                </b-button> -->
              </b-list-group-item>
            </b-list-group>
          </vue-scrollbar>
        </div>

        <div class="d-flex flex-row justify-content-between mt-1">
          <b-button
            variant="outline-primary"
            class="mb-1 mr-1"
            @click="$bvModal.hide('moreRepresentativesModal')"
          >
            Cancelar
          </b-button>
          <b-button
            variant="primary"
            class="mb-1 d-flex align-items-center"
            :disabled="!selectedRepresentatives.length"
            @click="associateRepresentatives"
          >
            Incluir <feather-icon size="18" icon="PlusIcon" class="ml-1" />
          </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BBadge,
  BButton,
  BCardTitle,
  BInputGroup,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BFormCheckbox,
  BListGroup,
  BListGroupItem,
} from 'bootstrap-vue'
import CompanyForm from '@/views/cedente/user/components/CompanyForm.vue'
import CompanyCard from '@/views/cedente/user/components/CompanyCard.vue'
import Subsidiaries from '@/views/cedente/user/components/Subsidiaries.vue'
import BankAccounts from '@/views/cedente/user/components/BankAccounts.vue'
import RepresentativeForm from '@/views/cedente/user/components/RepresentativeForm.vue'
import RepresentativeList from '@/views/cedente/user/components/RepresentativeList.vue'

import VueScrollbar from 'vue2-scrollbar'
import 'vue2-scrollbar/dist/style/vue2-scrollbar.css'

export default {
  name: 'CompleteEconomicGroupRegistration',
  components: {
    BCard,
    BRow,
    BCol,
    BBadge,
    BButton,
    BCardTitle,
    BFormInput,
    BListGroup,
    BFormGroup,
    BInputGroup,
    BankAccounts,
    CompanyForm,
    BFormCheckbox,
    CompanyCard,
    Subsidiaries,
    VueScrollbar,
    BListGroupItem,
    BInputGroupAppend,
    RepresentativeForm,
    RepresentativeList,
  },
  data() {
    return {
      showMoreRepresentativesModal: false,
      showNewRepresentativeForm: false,
      step: 0,
      cedente: {
        cnpj: '',
      },
      headOffice: {
        cnpj: '',
      },
      subsidiaries: [],
      representatives: [],
      selectedRepresentatives: [],
      economicGroupRepresentatives: [],
      scrollbar: {
        maxHeight: '210px',
        width: '100%',
      },
    }
  },
  computed: {
    companyDataIsCompleted() {
      return (
        this.cedente.cnpj &&
        this.cedente.nome_fantasia &&
        this.cedente.razao_social &&
        this.cedente.cep &&
        this.cedente.logradouro &&
        this.cedente.logradouro_numero &&
        this.cedente.bairro &&
        this.cedente.cidade &&
        this.cedente.uf &&
        this.cedente.contrato_social
      )
    },
  },
  async mounted() {
    await this.getCedente()
    await this.getRepresentatives()
    // if (this.companyDataIsCompleted) this.step = 2
  },
  methods: {
    async udpateList() {
      this.showNewRepresentativeForm = false
      this.$refs.representativeList.fetchData()
    },
    async associateRepresentatives() {
      this.$swal
        .fire({
          title: 'Deseja continuar?',
          text: 'Você está prestes a associar os representantes para a empresa selecionada.',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Sim, continuar!',
        })
        .then(async (result) => {
          if (result.value) {
            this.$swal.fire({
              title: 'Aguarde',
              text: 'Aguarde um instante enquanto processamos a solicitação',
              showConfirmButton: false,
              allowOutsideClick: false,
              onBeforeOpen: () => {
                this.$swal.showLoading()
              },
            })

            await this.$store.dispatch('cedente/copyRepresentatives', {
              representante_legal_id: this.selectedRepresentatives,
              id: this.$route.params.id,
            })
            this.$bvModal.hide('moreRepresentativesModal')
            this.$refs.representativeList.fetchData()
            this.$swal.fire({
              title: 'Sucesso!',
              text: 'Associação finalizada com sucesso',
              icon: 'success',
              confirmButtonText: 'Ok',
            })
          }
        })
    },
    async getCedente() {
      try {
        const { data } = await this.$store.dispatch('cedente/getCedente', this.$route.params.id)
        this.cedente = data
        this.step = 1
      } catch (error) {
        console.log(error)
      }
    },
    async getRepresentatives() {
      const { data } = await this.$store.dispatch(
        'cedente/fetchRepresentatives',
        this.$route.params.id,
      )
      if (!data.length) {
        this.showNewRepresentativeForm = true
      }
      this.representatives = data
    },
    async openRepresentativesModal() {
      await this.getRepresentatives()
      const { data } = await this.$store.dispatch('cedente/fetchEconomicGroupRepresentatives')
      const currentRepresentativesIds = this.representatives.map((r) => r.id)

      this.economicGroupRepresentatives = data.filter(
        (representative) => !currentRepresentativesIds.includes(representative.id),
      )

      this.$bvModal.show('moreRepresentativesModal')
      this.showNewRepresentativeForm = false
    },
  },
}
</script>

<style lang="scss">
.list-header {
  background: #eff4f6;
}
</style>
