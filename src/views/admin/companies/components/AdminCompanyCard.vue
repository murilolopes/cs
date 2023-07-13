<template>
  <div>
    <b-card class="mb-0" :class="status.cardBorderClass">
      <div class="d-flex justify-content-between align-items-start">
        <div class="d-flex flex-column mb-2">
          <p class="mb-0">Matriz</p>
          <h3 class="mb-0">{{ company.nome_fantasia }}</h3>
        </div>
        <div class="d-flex">
          <p class="mb-0 text-primary font-weight-bolder mr-1">Apto para operar</p>
          <b-form-checkbox button-variant="success" v-model="apto" class="switch-icon-left custom-control-success" switch>
            <span class="switch-icon-left">
              <feather-icon icon="CheckIcon" class="text-primary" />
            </span>
          </b-form-checkbox>
        </div>
      </div>

      <div class="d-flex justify-content-between">
        <div class="d-flex justify-content-between">
          <div class="mr-2">
            <span>CNPJ</span>
            <p class="text-dark">{{ company.cnpj }}</p>
          </div>
          <div class="mr-2">
            <span>Website</span>
            <p class="text-dark">{{ company.website || '-' }}</p>
          </div>
        </div>
      </div>

      <hr class="w-100" />

      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column justify-content-between">
          <h4 class="mb-1">Filiais</h4>
          <div class="d-flex">
            <div class="mr-2" v-if="!company.filiais?.length">
              <p class="text-dark mb-0">Sem filiais cadastradas</p>
            </div>
            <div v-else>
              <div class="mr-2" v-for="(filial, index) in company.filiais" :key="index">
                <p class="text-dark mb-0">{{ filial.cnpj }}</p>
              </div>
            </div>
          </div>
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
                <span>Estado</span>
                <p class="text-dark">{{ company.uf }}</p>
              </div>
              <div class="mr-2">
                <span>Cidade</span>
                <p class="text-dark">{{ company.cidade }}</p>
              </div>
              <div class="mr-2">
                <span>Logradouro</span>
                <p class="text-dark">{{ company.logradouro }}</p>
              </div>
              <div class="mr-2">
                <span>Bairro</span>
                <p class="text-dark">{{ company.bairro }}</p>
              </div>
              <div class="mr-2">
                <span>Número</span>
                <p class="text-dark">{{ company.logradouro_numero }}</p>
              </div>
              <div class="mr-2">
                <span>Complemento</span>
                <p class="text-dark">{{ company.complemento }}</p>
              </div>
          </div>
        </div>
      </div>

      <hr class="w-100" />

      <div class="d-flex justify-content-between">
        <div class="d-flex flex-column justify-content-between">
          <h4 class="mb-1">Grupo econômico</h4>
          <div class="d-flex align-items-center">
            <p class="text-dark mb-0 mr-1">{{ company.grupo_economico.nome }}</p>
            <b-button
              variant="flat-primary"
              size="sm"
              :to="{ name: 'admin-economicGroup.show' }"
            > Ver grupo econômico <feather-icon size="16" icon="ArrowRightIcon" /> </b-button>
          </div>
        </div>
      </div>

      <hr class="w-100" />

      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex flex-column justify-content-between">
          <h4 class="mb-0">Contrato social da empresa</h4>
          <div class="d-flex flex-column">
            <div class="d-flex align-items-center">
              <b-badge variant="light-primary" class="mt-50 w-100">
                <feather-icon icon="PaperclipIcon" size="16" />
                Anexo
              </b-badge>
              <feather-icon icon="DownloadIcon" size="20" class="mt-50 ml-50 cursor-pointer" stroke="#093272" @click="downloadFile" />
            </div>
          </div>
        </div>
        <div class="d-flex align-items-center">
          <div class="mr-2">
            <feather-icon size="24" :icon="status.icon" class="mr-1" :class="status.variant" />
            <b-badge :variant="status.bgVariant" class="bg-warning-light text-dark p-50" :class="status.borderClass"> {{ status.text }} </b-badge>
          </div>
          <b-button :disabled="disabledDisapprovedButton" class="mr-1" variant="outline-primary" @click="$bvModal.show('disapproveCompanyModal')">Reprovar</b-button>
          <b-button :disabled="disabledApprovedButton" variant="primary" @click="approve">Aprovar</b-button>
        </div>
      </div>
    </b-card>

    <b-modal id="disapproveCompanyModal" centered header-bg-variant="white" hide-footer>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <h3 class="mt-2 text-primary">Motivo da reprovação</h3>

        <p>O motivo da sua reprovação ajudará nosso cliente a entender quais ações precisão ser feitas para finalizar o cadastro.</p>

        <b-form-textarea v-model="reason" rows="3" max-rows="6" class="mb-1" />

        <div class="my-2">
          <b-button class="mr-2" variant="outline-primary" @click="$bvModal.hide('disapproveCompanyModal')">Cancelar</b-button>
          <b-button variant="primary" :disabled="!reason.length" @click="disapprove">Continuar</b-button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { BCard, BBadge, BCol, BRow, BButton, BFormGroup, BFormCheckbox, BFormTextarea } from "bootstrap-vue";

export default {
  name: "AdminCompanyCard",
  components: {
    BCol,
    BRow,
    BCard,
    BBadge,
    BButton,
    BFormGroup,
    BFormCheckbox,
    BFormTextarea,
  },
  data() {
    return {
      apto: false,
      reason: '',
      company: {
        status: ''
      }
    };
  },
  async mounted() {
    const { data } = await this.$store.dispatch("cedente/fetch", this.$route.params.idMatriz);
    this.company = data;
  },
  methods: {
    async approve() {
      try {
        this.$swal.fire({
          title: "Deseja continuar?",
          text: "Você está prestes a aprovar a documentação da empresa.",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Sim, aprovar!",
        })
        .then(async (result) => {
          if (result.value) {
            this.$swal.showLoading();
            await this.$store.dispatch("cedente/approve", { cedente_id: this.company.id });
            this.company.status_documentacao = 'aprovado';
            this.$swal.fire("Pronto!", "Documentação aprovada com sucesso", "success");
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    async disapprove() {
      try {
        this.$swal.fire({
          title: "Deseja continuar?",
          text: "Você está prestes a reprovar a documentação da empresa.",
          icon: "warning",
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonText: "Sim, reprovar!",
        })
        .then(async (result) => {
          if (result.value) {
            this.$swal.showLoading();
            await this.$store.dispatch("cedente/repprove", { cedente_id: this.company.id, reason_disapproval: this.reason });
            this.company.status_documentacao = 'reprovado';
            this.$bvModal.hide('disapproveCompanyModal');
            this.$swal.fire("Pronto!", "Documentação reprovada com sucesso", "success");
          }
        });
      } catch (error) {
        console.log(error)
      }
    },
    downloadFile() {
      var link = document.createElement("a");
      link.setAttribute('download', 'contrato-social.pdf');
      link.setAttribute('target', '_blank')
      link.href = this.company.contrato_social.url;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  },
  computed: {
    disabledDisapprovedButton() {
      return this.company.status_documentacao === 'reprovado' || this.company.status === 'blocked';
    },
    disabledApprovedButton() {
      return this.company.status_documentacao === 'aprovado' || this.company.status === 'blocked';
    },
    status() {
      const status = {
        reprovado: {
          cardBorderClass: 'border-danger',
          borderClass: 'border-danger',
          bgVariant: 'light-danger',
          variant: 'text-danger',
          textClass: 'Reprovado',
          icon: 'XCircleIcon',
          text: 'Reprovado',
        },
        aprovado: {
          cardBorderClass: 'border-success',
          borderClass: 'border-success',
          bgVariant: 'light-success',
          variant: 'text-success',
          textClass: 'Aprovado',
          icon: 'CheckCircleIcon',
          text: 'Aprovado',
        },
        blocked: {
          cardBorderClass: 'border-dark',
          borderClass: 'border-dark',
          bgVariant: 'light-dark',
          variant: 'text-dark',
          textClass: 'Oferta desativada',
          icon: 'AlertOctagonIcon',
          text: 'Oferta desativada',
        }
      };

      return status[this.company.status_documentacao] || {
        cardBorderClass: 'border-light cc-bg-light',
        borderClass: 'border-warning',
        bgVariant: 'light-warning',
        variant: 'text-warning',
        textClass: 'Aguardando análise',
        icon: 'ClockIcon',
        text: 'Aguardando análise',
      };
    }
  },
  watch: {
    apto: {
      async handler() {
        try {
          await this.$store.dispatch("cedente/apto", { cedente_id: this.company.id, apto_para_operar: this.apto });
        } catch (error) {

        }
      },
      deep: true,
    },
  }
};
</script>
