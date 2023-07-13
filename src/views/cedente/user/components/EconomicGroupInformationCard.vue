<template>
  <b-card :border-variant="borderVariant" :class="{ 'pending-documentation-bg-color': documentationInProgress }">
    <div class="d-flex flex-row justify-content-between align-items-start w-100">
      <div class="d-flex flex-column align-items-start justify-content-start w-50">
        <h3 class="mb-0" v-if="cedente.nome_fantasia.length > 20" tabindex="0" v-b-tooltip.hover :title="cedente.nome_fantasia">{{ truncateCedenteName }}</h3>
        <h3 class="mb-0" v-else>{{ cedente.nome_fantasia }}</h3>
        <p class="lead text-dark">{{ cedente.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5') }}</p>
        <p class="lead text-muted">{{ subsidiarySizeLabel }}</p>
      </div>

      <div class="d-flex flex-row align-items-start justify-content-end w-50">
        <div class="d-flex flex-column justify-content-between align-items-end gap-1">
          <div class="d-flex flex-row align-items-center">
            <feather-icon :icon="badgeStatus.icon" size="26" :class="`text-${badgeStatus.variant}`" />
            <b-badge :variant="`light-${badgeStatus.variant}`" :class="`border-${badgeStatus.variant} ml-1`">{{
              badgeStatus.text }}</b-badge>
          </div>
          <div class="d-flex flex-row align-items-center">
            <b-button variant="primary" v-if="showAnalisyButton" @click="goToCedentePage">{{ buttonLabel }}</b-button>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import {
  BCard,
  BBadge,
  BButton,
  VBTooltip
} from "bootstrap-vue";

export default {
  name: "EconomicGroupInformationCard",
  components: {
    BCard,
    BBadge,
    BButton,
  },
  props: {
    cedente: {
      type: Object,
      required: true,
      default: () => ({
        status: "nao_enviado",
        filiais: [],
      }),
    },
  },
  directives: {
    'b-tooltip': VBTooltip,
  },
  methods: {
    goToCedentePage() {
      const routeName = this.userType === 'cedente' ? 'complete-economic-group-registration' : 'admin-economicGroup.general-data';
      const params = this.userType === 'cedente' ? { id: this.cedente.id } : { id: this.cedente.grupo_economico_id, idMatriz: this.cedente.id };

      console.log(params)

      this.$router.push({ name: routeName, params });
    },
  },
  computed: {
    documentationInProgress() {
      return !['aprovado', 'reprovado'].includes(this.cedente.status_documentacao);
    },
    userType() {
      return this.$store.state.auth.userData.user_type
    },
    buttonLabel() {
      const label = {
        cedente: 'Preencher informações agora',
        admin: 'Analisar informações',
      }
      return label[this.userType]
    },
    showAnalisyButton() {
      const status = {
        cedente: {
          nao_enviado: true,
          em_validacao: false,
          aprovado: false,
          reprovado: true,
          blocked: false,
        },
        admin: {
          nao_enviado: true,
          em_validacao: true,
          aprovado: false,
          reprovado: true,
          blocked: true,
        },
      }

      return status[this.userType][this.cedente.status_documentacao]
    },
    subsidiarySizeLabel() {
      if (this.cedente.filiais?.length === 0) return "Sem filiais";

      return `+${this.cedente.filiais?.length} ${this.cedente.filiais?.length > 1 ? "Filiais incluídas" : "Filial incluída"}`;
    },
    borderVariant() {
      const status = {
        em_validacao: "light",
        nao_enviado: "light",
        reprovado: "danger",
        aprovado: "success",
        blocked: "light",
      }

      return status[this.cedente.status_documentacao]
    },
    badgeStatus() {
      const status = {
        cedente: {
          nao_enviado: {
            icon: 'AlertCircleIcon',
            variant: 'warning',
            text: 'Aguardando seu preenchimento',
          },
          em_validacao: {
            icon: 'ClockIcon',
            variant: 'warning',
            text: 'Informações em análise',
          },
          aprovado: {
            icon: 'CheckCircleIcon',
            variant: 'success',
            text: 'Aprovado',
          },
          reprovado: {
            icon: 'AlertOctagonIcon',
            variant: 'danger',
            text: 'Pendência no cadastro',
          },
          blocked: {
            icon: 'XCircleIcon',
            variant: 'dark',
            text: 'Conta temporariamente bloqueada',
          },
        },
        admin: {
          nao_enviado: {
            icon: 'AlertCircleIcon',
            variant: 'warning',
            text: 'Informações incompletas',
          },
          em_validacao: {
            icon: 'ClockIcon',
            variant: 'warning',
            text: 'Aguardando análise',
          },
          aprovado: {
            icon: 'CheckCircleIcon',
            variant: 'success',
            text: 'Aprovado',
          },
          reprovado: {
            icon: 'AlertOctagonIcon',
            variant: 'danger',
            text: 'Reprovado',
          },
          blocked: {
            icon: 'XCircleIcon',
            variant: 'dark',
            text: 'Oferta desativada',
          },
        }
      }

      return status[this.userType][this.cedente.status_documentacao]
    },
    truncateCedenteName() {
      return this.cedente.nome_fantasia.slice(0, this.cedente.nome_fantasia.length - 10).trim() + '...'
    },
  },
};
</script>

<style lang="scss">
.pending-documentation-bg-color {
  background-color: #F8FAFC !important;
}

.gap-1 {
  gap: 1.5rem;
}
</style>
