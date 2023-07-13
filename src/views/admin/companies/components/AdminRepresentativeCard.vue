<template>
  <b-card :class="status.cardBorderClass">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <h3 class="mb-0 mr-1">
          {{ representative.nome }}
        </h3>
        <representative-type :type="representative.tipo" />
      </div>
      <b-button variant="flat-primary" class="d-flex align-items-center" @click="downloadAll">
        Baixar tudo deste representante <feather-icon size="20" icon="DownloadIcon" class="text-primary ml-1" />
      </b-button>
    </div>
    <hr>
    <div class="d-flex justify-content-between">
      <div class="d-flex flex-column justify-content-between">
        <div class="d-flex">
          <div class="mr-2">
            <span>CPF</span>
            <p class="text-dark">
              {{ representative.cpf }}
            </p>
          </div>
          <div class="mr-2">
            <span>RG</span>
            <p class="text-dark">
              {{ representative.rg }}
            </p>
          </div>
          <div class="mr-2">
            <span>Email</span>
            <p class="text-dark">
              {{ representative.email }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <hr>
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex">
        <div class="mr-2 d-flex flex-column">
          <span>Contrato social da empresa</span>
          <div class="d-flex align-items-center">
            <b-badge variant="light-primary" class="mt-50 w-100">
              <feather-icon icon="PaperclipIcon" size="16" />
              Anexo
            </b-badge>
            <feather-icon icon="DownloadIcon"
                          size="20"
                          class="mt-50 ml-50 cursor-pointer"
                          stroke="#093272"
                          @click="downloadFile(representative.comprovante_residencia.url)"
            />
          </div>
        </div>
        <div class="mr-2 d-flex flex-column">
          <span>Documento de identidade</span>
          <div class="d-flex align-items-center">
            <b-badge variant="light-primary" class="mt-50 w-100">
              <feather-icon icon="PaperclipIcon" size="16" />
              Anexo
            </b-badge>
            <feather-icon icon="DownloadIcon"
                          size="20"
                          class="mt-50 ml-50 cursor-pointer"
                          stroke="#093272"
                          @click="downloadFile(representative.documento_identidade.url)"
            />
          </div>
        </div>
        <div v-if="representative.procuracao.url" class="mr-2 d-flex flex-column">
          <span>Procuração</span>
          <div class="d-flex align-items-center">
            <b-badge variant="light-primary" class="mt-50 w-100">
              <feather-icon icon="PaperclipIcon" size="16" />
              Anexo
            </b-badge>
            <feather-icon icon="DownloadIcon"
                          size="20"
                          class="mt-50 ml-50 cursor-pointer"
                          stroke="#093272"
                          @click="downloadFile(representative.procuracao.url)"
            />
          </div>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <div class="mr-2">
          <feather-icon size="24" :icon="status.icon" class="mr-1" :class="status.variant" />
          <b-badge :variant="status.bgVariant" class="bg-warning-light text-dark p-50" :class="status.borderClass">
            {{ status.text }}
          </b-badge>
        </div>
        <b-button :disabled="disabledDisapprovedButton" class="mr-1" variant="outline-primary" @click="$bvModal.show(`disapproveModal-${representative.id}`)">
          Reprovar
        </b-button>
        <b-button :disabled="disabledApprovedButton" class="" variant="primary" @click="approve">
          Aprovar
        </b-button>
      </div>
    </div>

    <b-alert v-if="representative.status === 'reprovado'" show variant="danger" class="p-1 border-danger mb-0 mt-2 d-flex align-items-center">
      <feather-icon size="18" icon="AlertTriangleIcon" class="text-danger mr-1" />  <strong class="text-dark mb-0 mr-1"> Motivo da reprovação: </strong>
      <span class="mb-0 text-dark">{{ representative.motivo_da_reprovacao }}</span>
    </b-alert>

    <b-modal :id="`disapproveModal-${representative.id}`" centered header-bg-variant="white" hide-footer>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <h3 class="mt-2 text-primary">
          Motivo da reprovação
        </h3>

        <p>O motivo da sua reprovação ajudará nosso cliente a entender quais ações precisão ser feitas para finalizar o cadastro.</p>

        <b-form-textarea v-model="reason" rows="3" max-rows="6" class="mb-1" />

        <div class="my-2">
          <b-button class="mr-2" variant="outline-primary" @click="$bvModal.hide(`disapproveModal-${representative.id}`)">
            Cancelar
          </b-button>
          <b-button variant="primary" @click="disapprove">
            Continuar
          </b-button>
        </div>
      </div>
    </b-modal>
  </b-card>
</template>

<script>
import {
  BBadge, BButton, BCard, BAlert, BFormTextarea,
} from 'bootstrap-vue'
import RepresentativeType from '@/views/cedente/user/components/RepresentativeType.vue'

export default {
  name: 'RepresentativeList',
  components: {
    BBadge,
    BButton,
    BAlert,
    BCard,
    BFormTextarea,
    RepresentativeType,
  },
  props: {
    representative: {
      type: Object,
      default: () => ({
        id: 1,
        status: '',
      }),
    },
  },
  data() {
    return {
      types: {},
      reason: '',
      downloadableItems: [],
    }
  },
  computed: {
    disabledDisapprovedButton() {
      return this.representative.status === 'reprovado' || this.representative.status === 'blocked'
    },
    disabledApprovedButton() {
      return this.representative.status === 'aprovado' || this.representative.status === 'blocked'
    },
    status() {
      const status = {
        reprovado: {
          cardBorderClass: 'border-danger',
          borderClass: 'border-danger',
          bgVariant: 'light-danger',
          variant: 'text-danger',
          textClass: '',
          icon: 'XCircleIcon',
          text: 'Reprovado',
        },
        aprovado: {
          cardBorderClass: 'border-success',
          borderClass: 'border-success',
          bgVariant: 'light-success',
          variant: 'text-success',
          textClass: '',
          icon: 'CheckCircleIcon',
          text: 'Aprovado',
        },
      }

      return status[this.representative.status] || {
        cardBorderClass: 'border-light cc-bg-light',
        borderClass: 'border-warning',
        bgVariant: 'light-warning',
        variant: 'text-warning',
        textClass: 'Aguardando análise',
        icon: 'ClockIcon',
        text: 'Aguardando análise',
      }
    },
  },
  mounted() {
    const urls = [this.representative.procuracao?.url,
    this.representative.documento_identidade?.url,
    this.representative.comprovante_residencia?.url,
    ]

    this.downloadableItems = urls.filter(item => Boolean(item))
  },
  methods: {
    downloadFile(file, index = 0) {
      const link = document.createElement('a')
      link.href = file
      link.setAttribute('target', '_blank')
      link.setAttribute('download', `anexo${index}.pdf`)
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    downloadAll() {
      this.downloadableItems.map((item, index) => this.downloadFile(item, index))
    },
    edit() {
      this.$set(this.representative, 'editing', true)
    },
    async approve() {
      this.$bvModal.hide(`disapproveModal-${this.representative.id}`)
      try {
        this.$swal.fire({
          title: 'Deseja continuar?',
          text: 'Você está prestes a aprovar o representante legal da empresa.',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Sim, aprovar!',
        })
          .then(async result => {
            if (result.value) {
              this.$swal.showLoading()
              await this.$store.dispatch('cedente/approveRepresentante', this.representative.id)
              this.representative.status = 'aprovado'
              this.$swal.fire('Pronto!', 'Representante legal aprovado com sucesso', 'success')
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
    async disapprove() {
      console.log(this.representative)
      console.log(this.representative)
      console.log(this.reason)
      this.$bvModal.hide(`disapproveModal-${this.representative.id}`)
      try {
        this.$swal.fire({
          title: 'Deseja continuar?',
          text: 'Você está prestes a reprovar o representante legal da empresa.',
          icon: 'warning',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Sim, reprovar!',
        })
          .then(async result => {
            if (result.value) {
              this.$swal.showLoading()
              await this.$store.dispatch('cedente/repproveRepresentante', { id: this.representative.id, motivo_da_reprovacao: this.reason })
              this.representative.status = 'reprovado'
              this.representative.motivo_da_reprovacao = this.reason
              this.$bvModal.hide('disapproveCompanyModal')
              this.$swal.fire('Pronto!', 'Representante legal reprovado com sucesso', 'success')
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
