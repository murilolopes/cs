export const $themeColors = {}

export const $themeBreakpoints = {}

export const $themeConfig = {
  app: {
    // appName: 'Credit Sec',
    // eslint-disable-next-line global-require
    appLogoImage: require('@/assets/images/credit-sec-logo.svg'),
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
