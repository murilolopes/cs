<template>
  <div>
    <div class="d-flex justify-content-between mb-1">
      <h3>Convites</h3>
      <b-button variant="primary" @click="showInviteForm = true" v-if="!isCreating">Criar novo convite</b-button>
    </div>
    <invite-card v-for="invite in invites" :key="invite.id" :invite="invite" @resent="getInvites" @deleted="getInvites" />
    <invite-form v-if="isCreating" @created="updateList" @cancel="showInviteForm = false" />
  </div>
</template>

<script>
import InviteForm from '@/views/admin/companies/components/InviteForm.vue'
import InviteCard from '@/views/admin/companies/components/InviteCard.vue'
import { BButton } from 'bootstrap-vue'

export default {
  name: 'GeneralData',
  components: {
    InviteForm,
    InviteCard,
    BButton
  },
  data() {
    return {
      invites: [],
      showInviteForm: false
    }
  },
  async mounted () {
    await this.getInvites()
  },
  methods: {
    async updateList () {
      this.showInviteForm = false
      await this.getInvites()
    },
    async getInvites() {
      const { data } = await this.$store.dispatch('cedente/getInvites', this.$route.params.id)
      this.invites = data
    }
  },
  computed: {
    isCreating () {
      return this.invites.length === 0 || this.showInviteForm === true
    }
  }
}
</script>

<style lang="scss">
@import "@core/scss/base/pages/app-file-manager";
</style>