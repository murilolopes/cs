import actions from './actions'
import mutations from './mutations'

export default {
  namespaced: true,
  state: {
    userData: {
      empresa: {
        status_documentacao: 'nao_enviado'
      }
    },
    currentEconomicGroup: {}
  },
  mutations,
  actions
}
