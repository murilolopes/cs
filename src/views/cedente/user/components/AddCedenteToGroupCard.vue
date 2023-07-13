<template>
    <b-card id="AddCnpjCard" body-class="px-3 pb-3" centered hide-footer header-bg-variant="white">
        <slot name="header"></slot>
        <div class="d-flex flex-column align-items-start">
            <h1>Inclusão de CNJP</h1>
            <h4>
                Adicione os CNPJs de Matrizes ou Filiais do seu grupo econômico.
            </h4>
        </div>
        <div>
            <validation-observer ref="newCedenteInput" #default="{ invalid }">
                <div class="d-flex flex-row justify-content-between align-items-start p-1 bg-gray border-gray mt-2">

                    <validation-provider #default="{ errors }" vid="cnpj" name="CNPJ" rules="required|cnpjRule"
                        class="w-100">
                        <b-form-input id="cnpj" v-model="cnpj" :state="errors.length > 0 ? false : null"
                            placeholder="Adicione um novo CNPJ" v-mask="'##.###.###/####-##'" />
                        <small class="text-danger">{{ errors[0] }}</small>
                    </validation-provider>
                    <b-button variant="primary" :disabled="invalid" class="text-nowrap ml-2" @click="addCnpj">
                        Incluir CNPJ <feather-icon icon="PlusIcon" />
                    </b-button>

                </div>
            </validation-observer>
        </div>
        <div class="mt-3">
            <b-button class="mr-2" variant="outline-primary" @click="$bvModal.hide('AddCnpjModal')">Cancelar</b-button>
            <b-button variant="primary" @click="ok">Continuar</b-button>
        </div>
    </b-card>
</template>

<script>
import {
    BButton,
    BModal,
    BRow,
    BCol,
    BCard,
    BFormInput,
} from 'bootstrap-vue'
import { ValidationObserver, ValidationProvider } from "vee-validate";
import { mask } from 'vue-the-mask'
import { required, cnpj as cnpjRule } from '@validations'

export default {
    name: 'AddCedenteToEconomicGroup',
    props: {
        cnpjs: {
            type: Array,
            default: () => []
        },
    },
    components: {
        BButton,
        BRow,
        BCol,
        BModal,
        BCard,
        BFormInput,
    },
    directives: {
        mask,
    },
    data: () => {
        return {
            cnpj: '',
            alreadyExists: false,
            cnpjRule,
            required,
        };
    },
};
</script>
