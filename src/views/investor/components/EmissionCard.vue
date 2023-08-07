<template>
  <b-card class="border-light">
    <div class="emissao-card-header d-flex justify-content-between align-items-end mb-2">
      <b-img :src="emissaoImage(emission)" class="mr-1" />
      <div class="d-flex flex-column justify-content-start">
        <h4>
          {{ emissionTitle(emission) }}
        </h4>
        <div class="d-flex justify-content-between">
          <span>{{ emission.valor_global_emissao | moneyFormat }}</span>
          <feather-icon
            @click="favoriteEmission(emission)"
            icon="HeartIcon"
            size="20"
            class="text-secondary cursor-pointer"
            :class="{ 'filled-heart': emission.favorita }"
          />
        </div>
      </div>
    </div>
    <div class="emissao-card-data">
      <div class="d-flex justify-content-between border-top pt-50 pb-50">
        <span> Status </span>
        <b-badge
          :class="`badge badge-light-${emission.is_ativo ? 'success' : 'danger'} border-${
            emission.is_ativo ? 'success' : 'danger'
          }`"
        >
          <span class="text-dark">
            {{ emission.is_ativo ? 'Ativo' : 'Inativo' }}
          </span>
        </b-badge>
      </div>
      <div class="d-flex justify-content-between border-top pt-50 pb-50">
        <span> Emissão </span>
        <strong> {{ emission.numero_emissao }} </strong>
      </div>
      <div class="d-flex justify-content-between border-top pt-50 pb-50">
        <span> Data da Emissão </span>
        <strong> {{ emission.data_emissao | formatDate }} </strong>
      </div>
      <div class="d-flex justify-content-between border-top pt-50 pb-50">
        <span> Data do Vencimento </span>
        <strong> {{ emission.data_vencimento | formatDate }} </strong>
      </div>
      <div class="d-flex justify-content-between border-top pt-50 pb-50">
        <span> Código IF B3 </span>
        <strong> {{ emission.id }} </strong>
      </div>
      <div class="d-flex justify-content-between border-top pt-50 pb-50">
        <span> ISIN </span>
        <strong> {{ emission.codigo_isin }} </strong>
      </div>
      <div class="d-flex justify-content-between border-top pt-50 pb-50">
        <span> Emissor </span>
        <strong> {{ emission.emissor }} </strong>
      </div>
      <div class="d-flex justify-content-between border-top pt-50 pb-50">
        <span> Agente Fiduciário </span>
        <strong> {{ emission.agente_fiduciario }} </strong>
      </div>
      <div class="d-flex justify-content-between border-top pt-50 pb-50">
        <span> Remuneração </span>
        <strong> {{ emission.remuneracao }} </strong>
      </div>
    </div>
    <div class="emissao-card-action">
      <b-button
        variant="primary"
        class="emissoes-details-button w-100 border-primary"
        @click="$router.push({ name: 'investor.details', params: { id: emission.id } })"
      >
        <span class="text-dark d-flex justify-content-center align-items-center font-weight-bolder">
          Detalhes
          <feather-icon icon="ArrowRightIcon" size="20" class="ml-1" />
        </span>
      </b-button>
    </div>
  </b-card>
</template>

<script>
import { BCard, BImg, BBadge, BButton } from 'bootstrap-vue'
import { moneyFormat } from '@/@core/comp-functions/data_visualization/datatable'
import { formatDate } from '@core/utils/filter'
import { mask } from 'vue-the-mask'

export default {
  name: 'EmissionCard',
  components: {
    BCard,
    BImg,
    BBadge,
    BButton,
  },
  props: {
    emission: {
      type: Object,
      required: true,
    },
  },
  directives: { mask },
  filters: {
    moneyFormat,
    formatDate,
  },
  methods: {
    emissionTitle(emission) {
      let title = `${emission.tipo_emissao} - ${emission.nome_fantasia} - ${emission.tipo_suboordinacao}`
      const truncatedTitle = title.substring(0, 20)

      return title.length > 20 ? `${truncatedTitle}...` : truncatedTitle
    },
    emissaoImage(emissao) {
      const options = {
        cri: 'cri',
        cra: 'cra',
      }

      if (!options[emissao.tipo_emissao.toLowerCase()])
        return require('@/assets/images/recebíveis.svg')

      return require(`@/assets/images/${options[emissao.tipo_emissao.toLowerCase()]}.svg`)
    },
    favoriteEmission(emission) {
      try {
        const action = emission.favorita ? 'unfavorite' : 'favorite'
        this.$store.dispatch(`investor/${action}`, emission.id)
        this.emission.favorita = !this.emission.favorita
        // this.$emit('favoriteEmission', emission)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss">
@import '~@/assets/scss/variables/_variables.scss';

.filled-heart {
  fill: $secondary;
}
</style>
