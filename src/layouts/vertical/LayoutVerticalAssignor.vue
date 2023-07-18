<template>
  <div class="file-manager-application">
    <div class="content-overlay" />
    <div class="header-navbar-shadow" />
    <div class="content-area-wrapper container-xxl p-0">
      <div class="sidebar-left">
        <div class="sidebar">
          <div class="sidebar-file-manager" :class="showMenu ? 'show' : null">
            <div class="sidebar-inner">
              <div class="sidebar-list">
                <div class="list-group cc-list-group">
                  <div class="my-drive" />
                  <b-link
                    class="list-group-item list-group-item-action d-flex justify-content-start align-items-center"
                    :to="{ name: 'admin-economicGroup.companies' }"
                    exact-active-class="active"
                  >
                    <feather-icon icon="DollarSignIcon" size="16" class="mr-1" />
                    Empresas
                  </b-link>
                  <b-link
                    class="list-group-item list-group-item-action d-flex justify-content-start align-items-center"
                    :to="{ name: 'admin-economicGroup.users' }"
                    exact-active-class="active"
                  >
                    <feather-icon icon="UsersIcon" size="16" class="mr-1" />
                    Usuários
                  </b-link>
                  <b-link
                    class="list-group-item list-group-item-action d-flex justify-content-start align-items-center"
                    :to="{ name: 'admin-economicGroup.invites' }"
                    exact-active-class="active"
                  >
                    <feather-icon icon="UserCheckIcon" size="16" class="mr-1" />
                    Convites
                  </b-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="content-wrapper container-xxl p-0">
          <div class="body-content-overlay" :class="showMenu ? 'show' : null" @click="hideMenu" />
          <div class="content-body">
            <div class="file-manager-main-content">
              <!-- <div class="file-manager-content-header w-100">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="sidebar-toggle d-block d-xl-none float-left align-middle ml-1">
                    <feather-icon
                      icon="MenuIcon"
                      size="26"
                      class="font-medium-5"
                      @click="showMenu = !showMenu"
                    />
                  </div>
                </div>
              </div> -->
              <div class="file-manager-content-body h-100">
                <router-view />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BLink, BButton } from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BLink,
  },
  data() {
    return {
      showMenu: false,
    }
  },
  computed: {
    allFiles() {
      const { representantes_legais } = this.currentAssignor
      let urls = [this.currentAssignor.contrato_social?.url]
      representantes_legais.map((rl) => {
        urls.push(rl.documento_identidade?.url)
        urls.push(rl.comprovante_residencia?.url)
        urls.push(rl.procuracao?.url)
        return rl
      })
      urls = urls.filter((item) => Boolean(item))
      return urls
    },
    currentAssignor() {
      return this.$store.state.cedente.current
    },
  },
  watch: {
    $route() {
      this.hideMenu()
    },
  },
  methods: {
    hideMenu() {
      this.showMenu = false
    },
    downloadFile(url) {
      const link = document.createElement('a')
      const filename = url.split('?')[0].split('/').pop()
      link.href = url
      link.setAttribute('target', '_blank')
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    downloadAll() {
      this.allFiles.map((item) => this.downloadFile(item))
    },
  },
}
</script>

<style lang="scss">
.content-area-wrapper {
  height: auto !important;
}

.cc-list-group {
  .list-group-item {
    padding: 0.6rem 1.3rem !important;
    border: 0;
    border-radius: 0;
  }
}
</style>
