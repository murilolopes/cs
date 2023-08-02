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
        'Admin::User': [
          {
            title: 'Dashboard Admin',
            icon: 'GridIcon',
            route: 'admin.dashboard',
            action: 'admin-read',
            resource: 'admin-user',
          },
          {
            title: 'Perfil',
            icon: 'UserIcon',
            route: 'admin.profile',
            action: 'admin-read',
            resource: 'admin-user',
          },
        ],
        'Investidor::User': [
          {
            title: 'Emissões',
            icon: 'DollarSignIcon',
            route: 'investor.emissions',
            action: 'investidor-read',
            resource: 'investidor-user',
          },
          {
            title: 'Calculadora',
            icon: 'GridIcon',
            route: 'investor.calculator',
            action: 'investidor-read',
            resource: 'investidor-user',
          },
          {
            title: 'Perfil',
            icon: 'UserIcon',
            route: 'investor.profile',
            action: 'investidor-read',
            resource: 'investidor-user',
          },
        ],
      }
      return menus[this.$store.state.auth.userData.type]
    },
  },
}
</script>
