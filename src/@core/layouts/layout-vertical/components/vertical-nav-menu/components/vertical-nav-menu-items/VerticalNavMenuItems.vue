<template>
  <ul>
    <component
      :is="resolveNavItemComponent(item)"
      v-for="item in menus"
      :key="item.header || item.title"
      :item="item"
    />
  </ul>
</template>

<script>
import { resolveVerticalNavMenuItemComponent as resolveNavItemComponent } from '@core/layouts/utils'
import { provide, ref } from 'vue'
import VerticalNavMenuHeader from '../vertical-nav-menu-header'
import VerticalNavMenuLink from '../vertical-nav-menu-link/VerticalNavMenuLink.vue'
import VerticalNavMenuGroup from '../vertical-nav-menu-group/VerticalNavMenuGroup.vue'

export default {
  components: {
    VerticalNavMenuHeader,
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
  },
  setup() {
    provide('openGroups', ref([]))

    return {
      resolveNavItemComponent,
    }
  },
  computed: {
    menus() {
      const menus = {
        admin: [
          {
            title: 'Dashboard Admin',
            icon: 'GridIcon',
            route: 'admin-dashboard',
            action: 'admin-read',
            resource: 'admin-user',
          },
        ],
        investidor: [
          {
            title: 'Emissões',
            icon: 'DollarSignIcon',
            route: 'investor.emissions',
            action: 'admin-read',
            resource: 'admin-user',
          },
          {
            title: 'Calculadora',
            icon: 'GridIcon',
            route: 'admin-dashboard',
            action: 'admin-read',
            resource: 'admin-user',
          },
          {
            title: 'Minha conta',
            icon: 'UserIcon',
            route: 'admin-dashboard',
            action: 'admin-read',
            resource: 'admin-user',
          },
        ],
      }
      return menus[this.$store.state.auth.userData.user_type]
    },
  },
}
</script>
