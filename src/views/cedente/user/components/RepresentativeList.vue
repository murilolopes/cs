<template>
  <div>
    <div v-for="(representative, index) in representatives" :key="index">
      <representative-form :representativeData="representative" v-if="representative.editing" class="mt-2" @cancel="hideForm(index)" @saved="hideForm(index)" />
      <representative-item :representative="representative" v-else class="" @deleted="fetchData"/>
    </div>
  </div>
</template>

<script>
import { BBadge, BButton } from 'bootstrap-vue'
import { BCardActions } from '@/@core/components/b-card-actions';
import RepresentativeItem from "@/views/cedente/user/components/RepresentativeItem";
import RepresentativeForm from "@/views/cedente/user/components/RepresentativeForm";

export default {
  name: 'RepresentativeList',
  components: {
    BBadge,
    BButton,
    BCardActions,
    RepresentativeItem,
    RepresentativeForm,
  },
  data() {
    return {
      representatives: []
    };
  },
  async mounted() {
    this.fetchData()
  },
  methods: {
    hideForm(index) {
      this.$set(this.representatives[index], 'editing', false);
    },
    async fetchData() {
      const { data } = await this.$store.dispatch('cedente/fetchRepresentatives', this.$route.params.id)
      this.representatives = data
    }
  }
};
</script>