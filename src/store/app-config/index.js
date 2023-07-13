export default {
  namespaced: true,
  state: {
    layout: {
      isRTL: false,
      skin: 'light',
      routerTransition: 'zoom-fade',
      type: 'vertical',
      contentWidth: ' full',
      menu: {
        hidden: false,
        navigationItems: {
          admin: [],
          cedente: [],
          parceiro: [],
        }
      },
      navbar: {
        type: 'floating',
        backgroundColor: '',
      },
      footer: {
        type: 'sticky',
      },
    },
  },
  mutations: {
    TOGGLE_RTL(state) {
      state.layout.isRTL = !state.layout.isRTL
      document.documentElement.setAttribute(
        'dir',
        state.layout.isRTL ? 'rtl' : 'ltr',
      )
    },
    UPDATE_SKIN(state, skin) {
      state.layout.skin = skin
      localStorage.setItem('vuexy-skin', skin)
      if (skin === 'dark') document.body.classList.add('dark-layout')
      else if (document.body.className.match('dark-layout')) document.body.classList.remove('dark-layout')
    },
    UPDATE_ROUTER_TRANSITION(state, val) {
      state.layout.routerTransition = val
    },
    UPDATE_LAYOUT_TYPE(state, val) {
      state.layout.type = val
    },
    UPDATE_CONTENT_WIDTH(state, val) {
      state.layout.contentWidth = val
    },
    UPDATE_NAV_MENU_HIDDEN(state, val) {
      state.layout.menu.hidden = val
    },
    UPDATE_NAVBAR_CONFIG(state, obj) {
      Object.assign(state.layout.navbar, obj)
    },
    UPDATE_FOOTER_CONFIG(state, obj) {
      Object.assign(state.layout.footer, obj)
    },
    ADD_ALERT_BADGE() {
      // let menu = state.layout.menu.navigationItems.cedente.filter(menu => menu.route === 'dashboard')[0]
      // if (menu) {
      //   menu.badge = menu.badge ? menu.badge++ : 1
      //   menu.badgeClasses = 'bg-danger'
      // }
    },
    CLEAR_ALERT_BADGE() {
      // let menu = state.layout.menu.navigationItems.cedente.filter(menu => menu.route === 'dashboard')[0]
      // if (menu) {
      //   menu.badge = null
      //   menu.badgeClasses = null
      // }
    },
  },
  actions: {},
}
