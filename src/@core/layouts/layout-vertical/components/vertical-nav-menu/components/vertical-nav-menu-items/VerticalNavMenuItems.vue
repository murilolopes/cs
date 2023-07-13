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
          {
            title: 'Antecipações',
            icon: 'DollarSignIcon',
            route: 'admin-antecipacoes.index',
            action: 'admin-read',
            resource: 'admin-user',
          },
          {
            title: 'Credenciadoras',
            icon: 'CreditCardIcon',
            route: 'admin-credenciadoras.index',
            action: 'admin-read',
            resource: 'admin-user',
          },
          {
            title: 'Operações',
            icon: 'CheckSquareIcon',
            route: 'admin-operations.index',
            action: 'admin-read',
            resource: 'admin-user',
          },
          {
            title: 'Conciliação',
            icon: 'DollarSignIcon',
            route: 'admin-conciliation.index',
            action: 'admin-read',
            resource: 'admin-user',
          },
        ],
        cedente: [
          {
            title: 'Dashboard',
            icon: 'GridIcon',
            route: 'dashboard',
            action: 'cedente-read',
            resource: 'cedente-user',
          },
          {
            header: 'Cadastros',
            action: 'cedente-read',
            resource: 'cedente-user',
          },
          {
            title: 'Antecipações',
            icon: 'DollarSignIcon',
            route: 'antecipacoes.index',
            action: 'cedente-read',
            resource: 'cedente-user',
          },
          {
            header: 'Gestão',
            action: 'cedente-read',
            resource: 'cedente-user',
          },
          {
            title: 'Minha conta',
            icon: 'UserIcon',
            route: 'minha-conta',
            action: 'cedente-read',
            resource: 'cedente-user',
          },
        ],
        parceiro: [
          {
            title: 'Dashboard',
            icon: 'GridIcon',
            route: 'parceiro-dashboard.index',
            action: 'parceiro-read',
            resource: 'parceiro-user',
          },
          {
            title: 'Antecipações',
            icon: 'DollarSignIcon',
            route: 'parceiro-antecipacoes.index',
            action: 'parceiro-read',
            resource: 'parceiro-user',
          },
        ],
      }
      return menus[this.$store.state.auth.userData.user_type]
    },
  },
}
</script>
