<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <div class="d-flex justify-content-center align-items-center">
        <span>
          Portal do
          <h4>{{ portalByUserType.title }}</h4>
        </span>
        <b-img :src="portalByUserType.icon" class="ml-1" />
      </div>
      <!-- Bookmarks Container -->
      <!-- <bookmarks /> -->
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <!-- <locale /> -->
      <!-- <dark-Toggler class="d-none d-lg-block" /> -->
      <!-- <search-bar /> -->
      <!-- <cart-dropdown /> -->
      <!-- <notification-dropdown /> -->
      <!-- <user-dropdown /> -->
      <user-data />
      <nav-bar-divisor />
      <logout-button />
    </b-navbar-nav>
  </div>
</template>

<script>
import { BImg, BLink, BNavbarNav } from 'bootstrap-vue'
import Bookmarks from './components/Bookmarks.vue'
import Locale from './components/Locale.vue'
import SearchBar from './components/SearchBar.vue'
import DarkToggler from './components/DarkToggler.vue'
import CartDropdown from './components/CartDropdown.vue'
import NotificationDropdown from './components/NotificationDropdown.vue'
import UserDropdown from './components/UserDropdown.vue'
import LogoutButton from './components/LogoutButton'
import UserData from './components/UserData'
import NavBarDivisor from './components/NavBarDivisor'

export default {
  components: {
    BImg,
    BLink,
    LogoutButton,
    UserData,
    NavBarDivisor,
    BNavbarNav,
    Bookmarks,
    Locale,
    SearchBar,
    DarkToggler,
    CartDropdown,
    NotificationDropdown,
    UserDropdown,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    portalByUserType() {
      const types = {
        'Admin::User': {
          title: 'Administrador',
          icon: require('@/assets/images/portal-investidor-icon.svg'),
        },
        'Investidor::User': {
          title: 'Investidor',
          icon: require('@/assets/images/portal-investidor-icon.svg'),
        },
      }
      return (
        types[this.userType] || {
          title: 'Administrador',
          icon: require('@/assets/images/portal-investidor-icon.svg'),
        }
      )
    },
    userType() {
      return this.$store.state.auth.userData.type
    },
  },
}
</script>
