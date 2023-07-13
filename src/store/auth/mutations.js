export default {
  SET_USER_DATA(state, payload) {
    state.userData = payload
  },

  UPDATE_USER_DATA(state, payload) {
    Object.keys(payload).forEach(key => {
      state.userData[key] = payload[key]
    })
  },

  SET_STATUS_DOCUMENTATION (state) {
    state.userData.empresa.status_documentacao = 'em_validacao'
  },

  UPDATE_CURRENT_ECONOMIC_GROUP_DATA (state, payload) {
    state.currentEconomicGroup = payload
  },
}
