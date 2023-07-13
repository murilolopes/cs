<template>
  <layout-vertical>
    <router-view />

    <template #footer>
      <complete-registration-footer v-if="completingRegistration" />
    </template>
  </layout-vertical>
</template>

<script>
import CompleteRegistrationFooter from '@/views/cedente/user/components/CompleteRegistrationFooter.vue'
import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue'

export default {
  components: {
    CompleteRegistrationFooter,
    LayoutVertical,
  },
  computed: {
    completingRegistration() {
      return this.$route.name === 'complete-economic-group-registration'
    },
  },
}
</script>
