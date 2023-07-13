<template>
  <b-card-actions actionCollapse actionDelete collapsed class="card-actions-border mt-2 " @delete-action="deleteRepresentative">
    <template #title>
      <div class="d-flex justify-content-between w-fit">
        <div class="d-flex align-items-center">
          <h3 class="mb-0 mr-1">{{ representative.nome }}</h3>
          <representative-type :type="representative.tipo" />
        </div>
      </div>
    </template>
    <hr class="mt-0">
    <div class="d-flex justify-content-between">
      <div class="d-flex flex-column justify-content-between">
        <div class="d-flex">
          <div class="mr-2">
            <span>CPF</span>
            <p class="text-dark">{{ representative.cpf }}</p>
          </div>
          <div class="mr-2">
            <span>RG</span>
            <p class="text-dark">{{ representative.rg }}</p>
          </div>
          <div class="mr-2">
            <span>Email</span>
            <p class="text-dark">{{ representative.email }}</p>
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
            <feather-icon icon="Trash2Icon" size="20" class="mt-50 ml-50 cursor-pointer" stroke="#093272" />
          </div>
        </div>
        <div class="mr-2 d-flex flex-column">
          <span>Documento de identidade</span>
          <div class="d-flex align-items-center">
            <b-badge variant="light-primary" class="mt-50 w-100">
              <feather-icon icon="PaperclipIcon" size="16" />
              Anexo
            </b-badge>
            <feather-icon icon="Trash2Icon" size="20" class="mt-50 ml-50 cursor-pointer" stroke="#093272" />
          </div>
        </div>
        <div class="mr-2 d-flex flex-column">
          <span>Procuração</span>
          <div class="d-flex align-items-center">
            <b-badge variant="light-primary" class="mt-50 w-100">
              <feather-icon icon="PaperclipIcon" size="16" />
              Anexo
            </b-badge>
            <feather-icon icon="Trash2Icon" size="20" class="mt-50 ml-50 cursor-pointer" stroke="#093272" />
          </div>
        </div>
      </div>
      <b-button variant="outline-primary bg-white" @click="edit">Editar</b-button>
    </div>
  </b-card-actions>
</template>

<script>
import { BBadge, BButton } from 'bootstrap-vue'
import { BCardActions } from '@/@core/components/b-card-actions';
import RepresentativeType from "@/views/cedente/user/components/RepresentativeType";

export default {
  name: 'RepresentativeListItem',
  components: {
    BBadge,
    BButton,
    BCardActions,
    RepresentativeType,
  },
  props: {
    representative: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      types: {}
    };
  },
  methods: {
    edit() {
      this.$set(this.representative, 'editing', true);
    },
    async deleteRepresentative() {
      try {
        this.$swal
          .fire({
            title: "Confirmar exclusão de representante?",
            text: "Essa ação não poderá ser desfeita!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Excluir!",
          })
          .then(async (result) => {
            if (result.value) {
              this.$swal.fire({
                title: "Aguarde",
                text: "Aguarde um instante enquanto processamos a solicitação",
                showConfirmButton: false,
                allowOutsideClick: false,
                onBeforeOpen: () => {
                  this.$swal.showLoading();
                },
              });
              const payload = {
                id: this.representative.id,
                cedente_id: this.representative.cedente_id,
              };
              await this.$store.dispatch("cedente/destroyRepresentative", payload);
              this.$emit("deleted");
              this.$swal.fire({
                title: "Sucesso!",
                text: "Exclusão finalizada com sucesso.",
                icon: "success",
                confirmButtonText: "Ok",
              });
            }
          });
      } catch (error) {

      }
    }
  },
};
</script>