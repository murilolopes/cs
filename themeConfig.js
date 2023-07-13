export const $themeColors = {}

export const $themeBreakpoints = {}

export const $themeConfig = {
  app: {
    appName: 'Antecipa Cartão', // Will update name in navigation menu (Branding)
    // eslint-disable-next-line global-require
    appLogoImage: require('@/assets/images/logo/logo-ac.svg'), // Will update logo in navigation menu (Branding)
  },
  layout: {
    isRTL: false,
    skin: 'light',
    routerTransition: 'zoom-fade',
    type: 'vertical',
    contentWidth: 'full',
    menu: {
      hidden: false,
      isCollapsed: false,
    },
    navbar: {
      type: 'sticky',
      backgroundColor: '',
    },
    footer: {
      type: 'sticky',
    },
    customizer: false,
    enableScrollToTop: false,
  },
}
