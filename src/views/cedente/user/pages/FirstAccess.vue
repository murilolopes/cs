<template>
  <div>
    <b-card class="p-5 d-flex justify-content-start" style="max-width: 520px;" v-if="step === 1">
      <b-img :src="acLogo" class="mb-2" style="max-width: 147px;"/>
      <h2 class="mb-3 text-dark">Vamos começar!</h2>
      <h4 class="mb-1 text-dark">Nomeie seu Grupo Econômico</h4>
      <h5 class="mb-2 text-gray">Um grupo econômico pode incluir Matrizes e filiais com múltiplos CNPJs das suas empresas.</h5>
      <validation-observer ref="businessGroupName" #default="{ invalid }">
        <validation-provider #default="{ errors }" vid="businessGroupName" name="Nome" rules="required|min:3">
          <span class="h5 mt-2 text-dark">Dê um nome para o seu grupo econômico</span>
          <b-form-input id="businessGroupName" class="mt-1" v-model="economicGroupName" :state="errors.length > 0 ? false : null"
            placeholder="Digite um nome" />
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>

        <b-button class="mt-1 w-fit" type="submit" variant="primary" block :disabled="invalid" @click="handleFirstStep">
          Salvar e continuar <feather-icon icon="ChevronRightIcon" />
        </b-button>
      </validation-observer>
    </b-card>

    <b-card class="p-3 d-flex justify-content-start" v-if="step === 2">
      <div class="d-flex flex-column align-items-start" v-if="$route.meta.step">
        <h5 class="text-dark">Inclusão de CNJP</h5>
        <h5 class="mb-3 text-gray">
          Adicione os CNPJs de Matrizes ou Filiais do seu grupo econômico.
        </h5>
      </div>
      <div v-else>
        <b-img :src="acLogo" class="mb-2" />
        <h2 class="mb-1 text-dark">{{ economicGroupName }}</h2>
        <h5 class="mb-2 text-gray">
          Confira abaixo as empresas pertencentes ao seu grupo econômico e <br>
          caso seja necessário, adicione outros CNPJs de Matrizes e Filiais.
        </h5>
      </div>

      <div class="p-0 m-0">
        <div class="cnpjListHeader p-1 bg-gray border-gray">
          <validation-observer ref="businessGroup" #default="{ invalid }"
            class="d-flex flex-row justify-content-between align-items-start">
            <validation-provider #default="{ errors }" mode="lazy" vid="cnpj" name="CNPJ"
              :rules="`required|cnpj|cnpjIsNotIncluded:${cnjpCustomRule}`" class="w-100">
              <b-form-input id="cnpj" v-model="cnpj" :state="errors.length > 0 ? false : null"
                placeholder="Adicione um novo CNPJ" v-mask="'##.###.###/####-##'" @blur="handleInputValidation" />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>
            <b-button variant="primary" :disabled="invalid" class="text-nowrap ml-2" @click="addCnpj">
              Incluir CNPJ <feather-icon icon="PlusIcon" />
            </b-button>
          </validation-observer>
        </div>
        <div class="cnpjListBody border-gray">
          <vue-scrollbar ref="Scrollbar" :style="scrollbar">
            <b-list-group flush>
              <b-list-group-item v-for="(cnpj, index) in cnpjs" :key="index">
                <div class="d-flex justify-content-between align-items-center">
                  {{ cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') }}
                  <b-button variant="flat-primary" size="sm" @click="openModalDeleteCnpj(index)"> Excluir <feather-icon
                      icon="Trash2Icon" /> </b-button>
                </div>
              </b-list-group-item>
            </b-list-group>
          </vue-scrollbar>
        </div>
      </div>

      <div class="mt-3" v-if="$route.meta.step">
        <b-button class="mr-2" variant="outline-primary"
          @click="$router.push({ name: 'minha-conta' })">Voltar</b-button>
        <b-button variant="primary" :disabled="this.cedenteAlreadyExists" @click="handleSecondStep">
          Continuar <feather-icon icon="ChevronRightIcon" size="12" />
        </b-button>
      </div>
      <div v-else class="d-flex justify-content-start">
        <b-button variant="outline-primary" class="mt-2 w-fit" @click="cancel">
          Voltar
        </b-button>
        <b-button variant="primary" class="mt-2 w-fit ml-1" block
          :disabled="!(cnpjs.length > 0) || generateDocumentButtonDisabled" @click="handleSecondStep">
          {{ generateDocumentButtonText }} <feather-icon icon="ChevronRightIcon" size="12" />
        </b-button>
      </div>
    </b-card>

    <b-card class="p-0 m-0" id="contrato" v-if="step === 3" no-body>
      <div class="h-100" id="visualizacao-contrato">
        <div style="z-index: 1" class="d-flex justify-content-between align-items-center p-3 shadow">
          <h4 class="mb-0">Revise o documento abaixo e confirme que você está de <br> acordo com os termos apresentados no
            mesmo.</h4>
          <b-button variant="primary" class="ml-5" @click="downloadMinuta"> Baixar Minuta <feather-icon class="ml-1"
              icon="DownloadIcon" /> </b-button>
        </div>
        <div class="" id="contrato">
          <vue-scrollbar ref="Scrollbar" :style="scrollbarPdf" :onMaxScroll="handleMaxScroll">
            <vue-pdf-embed :source="minutaFile" />
          </vue-scrollbar>
        </div>
        <div style="z-index: 1" id="contrato-footer" class="d-flex justify-content-center align-items-center w-100 ">
          <div>
            <b-button variant="outline-primary" @click="cancel"> Cancelar </b-button>
            <b-button variant="primary" class="ml-2" :disabled="!terms || finishFirstAccessLoading"
              @click="finishFirstAccess"> {{ finishFirstAccessButtonText }} </b-button>
          </div>
          <div class="d-flex align-items-center ml-2">
            <b-form-checkbox v-model="terms"/>
            <span class="text-dark">Confirmo que revisei o documento e estou de acordo com os<br> termos, e ciente que
              esse não poderá ser
              alterado no futuro.</span>
          </div>
        </div>
      </div>
    </b-card>

    <b-modal id="deleteCnpj" centered hide-footer header-bg-variant="white">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <h1 class="mb-1">Excluir CNPJ</h1>
        <p class="h4 text-center mb-3">
          Você tem certeza que deseja excluir este CNPJ?
        </p>

        <div class="d-flex flex-row justify-content-between mt-1">
          <b-button variant="outline-primary" class="mb-1 mr-1" @click="closeModalDeleteCnpj"> Cancelar </b-button>
          <b-button variant="primary" class="mb-1" @click="deleteCnpj"> Excluir CNPJ </b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { required, email, min, cnpj as cnpjRule, cnpjIsNotIncluded } from '@validations'
import { BCard, BCardHeader, BImg, BFormGroup, BFormInput, BForm, BButton, BListGroup, BListGroupItem, BFormCheckbox } from 'bootstrap-vue'
import VueScrollbar from 'vue2-scrollbar';
import VuePdfEmbed from 'vue-pdf-embed/dist/vue2-pdf-embed'
import "vue2-scrollbar/dist/style/vue2-scrollbar.css"
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  name: 'FirstAccessPage',
  components: {
    BCardHeader,
    BCard,
    BImg,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BListGroup,
    VuePdfEmbed,
    VueScrollbar,
    BFormCheckbox,
    BListGroupItem,
    ValidationProvider,
    ValidationObserver,
    ToastificationContent,
  },
  data() {
    return {
      step: 1,
      acLogo: require('@/assets/images/logo/ac-logotipo.svg'),
      economicGroupName: '',
      cnpj: '',
      cnpjs: [],
      minutaFile: '',
      cedenteAlreadyExists: false,
      finishFirstAccessLoading: false,
      generatingDocument: false,
      minutaReaded: false,
      terms: false,
      scrollbar: {
        maxHeight: "250px",
        width: "100%"
      },
      scrollbarPdf: {
        maxHeight: "500px",
        width: "100%"
      },
      required,
      cnpjRule,
      cnpjIsNotIncluded,
    }
  },
  async mounted() {
    if (Object.keys(this.$store.state.auth.currentEconomicGroup).length > 0) {
      const { data } = await this.$store.dispatch('auth/getCurrentEconomicGroupData')
      this.cnpjs = [...data.list_cnpjs] || []
    }

    if (this.$route.meta.step) this.step = this.$route.meta.step
    if (this.$store.state.auth.currentEconomicGroup?.situacao_cadastro === "cedentes_cadastrados" && !this.$route.meta.step) this.$router.push({ name: 'dashboard' })

    this.economicGroupName = this.$store.state.auth.currentEconomicGroup?.nome

    const step2Status = ['pendente_cadastro_cnpjs', 'pendente_geracao_documento_autorizacao_leitura', 'pendente_autorizacao_leitura']
    if (step2Status.includes(this.$store.state.auth.currentEconomicGroup?.situacao_cadastro)) this.step = 2
  },
  methods: {
    downloadMinuta() {
      const link = document.createElement('a')
      link.href = this.minutaFile
      link.setAttribute('target', '_blank')
      link.setAttribute('download', 'minuta.pdf')
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    async generateDocument() {
      try {
        this.generatingDocument = true
        const { data } = await this.$store.dispatch('firstAccess/generateMinuta')
        this.minutaFile = data
        this.step++
      } catch (error) {
        this.step = 2
      } finally {
        this.generatingDocument = false
      }
    },
    handleMaxScroll() {
      this.minutaReaded = true
    },
    async handleSecondStep() {
      if (this.regenerateDocument) return this.generateDocument()
      this.minutaFile = this.$store.state.auth.currentEconomicGroup?.documento_autorizacao_leitura_url
      this.step++
    },
    async handleFirstStep() {
      const groupId = this.$store.state.auth?.currentEconomicGroup?.id
      const payload = { nome: this.economicGroupName }

      try {
        if (!groupId) { await this.$store.dispatch('firstAccess/newEconomicGroup', payload) }
        else { await this.$store.dispatch('firstAccess/updateEconomicGroupName', payload) }

        this.step = 2
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Erro',
            icon: 'XCircleIcon',
            avatarVariant: 'danger',
            titleVariant: 'danger',
            text: error.response.data.join(','),
          },
        })
      }
    },
    cancel() {
      this.terms = false
      this.cnpj = ''
      this.step = this.step - 1 < 1 ? 1 : this.step - 1
    },
    async addCnpj() {
      if (!this.cnpj) return

      try {
        await this.$store.dispatch('firstAccess/addCnpj', this.cnpj.replace(/\D/g, ""))
        this.cnpjs.push(this.cnpj)
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Erro',
            icon: 'XCircleIcon',
            avatarVariant: 'danger',
            titleVariant: 'danger',
            text: error.response.data.join(','),
          },
        })
      } finally {
        this.cnpj = '';
        await this.$refs.businessGroup.reset()
      }
    },
    closeModalDeleteCnpj() {
      this.$bvModal.hide('deleteCnpj')
      this.selectedCnpj = ''
    },
    async deleteCnpj() {
      try {
        const cnpj = this.cnpjs[this.selectedCnpj].replace(/\D/g, "")
        await this.$store.dispatch('firstAccess/removeCnpj', cnpj)
        this.cnpjs.splice(this.selectedCnpj, 1)
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Sucesso',
            icon: 'CheckCircleIcon',
            avatarVariant: 'success',
            titleVariant: 'success',
            text: 'CNPJ removido com sucesso',
          },
        })
      } catch (error) {
        this.$toast({
          component: ToastificationContent,
          position: 'top-right',
          props: {
            title: 'Erro',
            icon: 'XCircleIcon',
            avatarVariant: 'danger',
            titleVariant: 'danger',
            text: error.response.data.join(','),
          },
        })
      } finally {
        this.closeModalDeleteCnpj()
      }
    },
    openModalDeleteCnpj(index) {
      this.selectedCnpj = index
      this.$bvModal.show('deleteCnpj')
    },
    async finishFirstAccess() {
      try {
        this.finishFirstAccessLoading = true
        await this.$store.dispatch('firstAccess/acceptTerms')
        await this.$store.dispatch('auth/getCurrentEconomicGroupData')
        this.$router.push({ name: 'dashboard' })
      } catch (error) {
        console.log(error)
      } finally {
        this.finishFirstAccessLoading = false
      }
    },
    async handleInputValidation($event) {
      try {
        this.cnpj = $event.target.value;
        this.cedenteAlreadyExists = Boolean(this.cnpjs.find(cnpj => cnpj === this.cnpj))
      } catch (error) {
        console.log(error);
        await this.$refs.businessGroup.reset()
        this.cnpj = '';
      }
    }
  },
  computed: {
    generateDocumentButtonDisabled() {
      return this.generatingDocument
    },
    generateDocumentButtonText() {
      return this.generatingDocument ? 'Gerando documento...' : 'Concordar e continuar'
    },
    regenerateDocument() {
      let array1 = this.cnpjs
      let array2 = this.$store.state.auth.currentEconomicGroup.list_cnpjs

      array1.map((item, index) => {
        array1[index] = item.replace(/\D/g, "")
      })
      array2.map((item, index) => {
        array2[index] = item.replace(/\D/g, "")
      })

      if (array1.length !== array2.length) return true

      array1.sort()
      array2.sort()

      for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return true
      }

      return false
    },
    finishFirstAccessButtonText() {
      return this.finishFirstAccessLoading ? 'Finalizando...' : 'Estou de acordo'
    },
    cnjpCustomRule() {
      return this.cnpjs.join(',')
    }
  }
}

</script>

<style lang="scss">
// Variaveis adicionadas para facilitar a edição
// não usar as variaveis do Sass pois o calc do sass
// não suporta operação com vh e px juntos
:root {
  --contrato-header-height: 100px;
  --contrato-footer-height: 100px;
}

.border-gray {
  border: 1px solid #DAE1E8;
}

.bg-gray {
  background-color: #EFF4F6;
}

#visualizacao-contrato {
  display: grid;
  grid-template-rows: var(--contrato-header-height) 1fr var(--contrato-footer-height);

  #contrato-footer {
    box-shadow: 0 -4px 24px 0 rgba(34, 41, 47, 0.1) !important;
  }

  #contrato {
    .vue-scrollbar__wrapper {
      max-height: calc(100vh - (var(--contrato-header-height) + var(--contrato-footer-height))) !important;
    }
  }
}
</style>
