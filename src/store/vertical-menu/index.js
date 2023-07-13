export default {
  namespaced: true,
  state: {
    isVerticalMenuCollapsed: true,
  },
  mutations: {
    UPDATE_VERTICAL_MENU_COLLAPSED(state, val) {
      state.isVerticalMenuCollapsed = val
    },
  },
}
