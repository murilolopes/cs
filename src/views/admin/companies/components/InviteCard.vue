<template>
  <b-card
    class="d-flex flex-column justify-content-center align-items-start p-1 cc-bg-light"
  >
    <b-row>
      <b-col
        cols="12"
        class="d-flex flex-row justify-content-between align-items-center p-0 mb-1"
      >
        <div class="d-flex flex-row align-items-centers p-0">
          <h6>{{ invite.nome_contato }}</h6>
          <div v-if="invite.aceito">
            <b-badge pill class="alert-success border-success ml-2">Aceito</b-badge>
          </div>

          <div v-else>
            <b-badge
              pill
              class="alert-warning border-warning ml-2"
              v-if="invite.ultimo_envio"
              >Aguardando cadastro</b-badge
            >
            <b-badge pill class="alert-info border-info ml-2" v-else
              >Aguardando envio</b-badge
            >
          </div>
        </div>
        <div class="d-flex flex-row align-items-start p-0" v-if="!invite.aceito">
          <div class="d-flex flex-column align-items-start mr-2">
            <div id="copyTooltip" class="cursor-pointer" @click="copyLink">
              <b-badge class="alert-primary border-primary"
                ><feather-icon
                  icon="CopyIcon"
                  size="20"
                  color="#093272"
                  class="mr-1"
                />Link de cadastro</b-badge
              >
              <b-tooltip
                ref="tooltip"
                triggers="click"
                target="copyTooltip"
                title="Copiado!"
                variant="primary"
                :delay="{ show: 100, hide: 500 }"
              />
            </div>
          </div>
          <div class="d-flex flex-column align-items-start">
            <div class="cursor-pointer" @click="deleteInvite">
              <b-badge class="alert-primary border-primary"
                ><feather-icon
                  icon="TrashIcon"
                  size="20"
                  color="#093272"
                  class="mr-1"
                />Excluir convite</b-badge
              >
            </div>
          </div>
        </div>
      </b-col>
      <div class="d-flex flex-row justify-content-between align-items-end p-0 w-100">
        <div class="d-flex flex-column align-items-start justify-content-center">
          <div class="d-flex flex-row align-items-start">
            <div class="d-flex flex-column align-items-start mr-2">
              <span>Último envio</span>
              <h6>{{ formatDate(invite.ultimo_envio) }}</h6>
            </div>
            <div class="d-flex flex-column align-items-start mr-2">
              <span>Telefone</span>
              <h6>{{ invite.celular_contato }}</h6>
            </div>
            <div class="d-flex flex-column align-items-start">
              <span>E-mail</span>
              <h6>{{ invite.email_contato }}</h6>
            </div>
          </div>
        </div>
        <div class="d-flex flex-row align-items-center p-0">
          <div class="d-flex flex-row align-items-start p-0" v-if="!invite.aceito">
            <b-button variant="primary" @click="checkSpan">{{
              invite.ultimo_envio ? "Reenviar email" : "Enviar email"
            }}</b-button>
          </div>
        </div>
      </div>
    </b-row>

    <b-modal id="modalResendInvite" centered hide-footer header-bg-variant="white">
      <div class="d-flex flex-column justify-content-center align-items-center">
        <h1 class="mb-1">Alerta de span</h1>
        <p class="h4 text-center mb-3">
          Com esta ação você fará um reenvio de comunicado com menos de 24 horas do último
          envio efetuado.
        </p>

        <p class="h4">Você tem certeza que deseja continuar?</p>

        <div class="d-flex flex-row justify-content-between mt-1">
          <b-button
            variant="outline-primary"
            class="mb-1 mr-1"
            @click="$bvModal.hide('modalResendInvite')"
            >Cancelar</b-button
          >
          <b-button variant="primary" class="mb-1" @click="resendInvite"
            >Continuar</b-button
          >
        </div>
      </div>
    </b-modal>
  </b-card>
</template>

<style>
.card-body {
  width: 100%;
}
</style>

<script>
import { BCard, BRow, BCol, BButton, BBadge, BTooltip, VBTooltip } from "bootstrap-vue";
import { formatDate } from "@/@core/utils/filter";

export default {
  name: "InviteCard",
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BBadge,
    BTooltip,
  },
  props: {
    invite: {
      type: Object,
      default: () => {},
    },
  },
  directives: {
    "b-tooltip": VBTooltip,
  },
  methods: {
    checkSpan() {
      if (this.haveLessThan24hours()) return this.$bvModal.show("modalResendInvite");

      this.resendInvite();
    },
    async resendInvite() {
      try {
        this.$swal
          .fire({
            title: "Deseja continuar?",
            text: "Você está prestes a reenviar o convite para a empresa.",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sim, enviar!",
          })
          .then(async (result) => {
            if (result.value) {
              this.$swal.showLoading();
              await this.$store.dispatch("cedente/resendInvite", this.invite.id);
              this.$emit("resent");
              this.$bvModal.hide("modalResendInvite");
              this.$swal.fire("Pronto!", "Convite reenviado com sucesso.", "success");
            }
          });
      } catch (error) {
        this.$bvModal.hide("modalResendInvite");
        this.$swal.fire("Oops...", "Ocorreu um erro ao reenviar o convite.", "error");
      }
    },
    async deleteInvite() {
      const assignorId = this.$route.params.id;
      // const inviteId = this.invite.id;
      try {
        this.$swal
          .fire({
            title: "Deseja continuar?",
            text: "Você está prestes a deletar o convite.",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Sim, deletar!",
          })
          .then(async (result) => {
            if (result.value) {
              this.$swal.showLoading();
              await this.$store.dispatch("cedente/deleteInvite", {
                assignorId,
              });
              this.$emit("deleted");
              this.$swal.fire("Pronto!", "Convite deletado com sucesso.", "success");
            }
          });
      } catch (error) {
        this.$swal.fire("Oops...", "Ocorreu um erro ao deletar o convite.", "error");
      }
    },
    copyLink() {
      this.$copyText(this.invite.url_convite).then((e) => {
        setTimeout(() => this.$refs.tooltip.$emit("close"), 750);
      });

      setTimeout(() => {
        this.$refs.tooltip.$emit("close");
      }, 750);
    },
    haveLessThan24hours() {
      const lastSend = new Date(this.invite.ultimo_envio);
      const now = new Date();
      const diff = now.getTime() - lastSend.getTime();
      const diffHours = diff / (1000 * 3600);
      return diffHours < 24;
    },
    formatDate() {
      if (!this.invite.ultimo_envio) return "Não enviado";

      return formatDate(this.invite.ultimo_envio);
    },
  },
};
</script>
