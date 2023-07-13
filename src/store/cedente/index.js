import mutations from "./mutations"
import actions from './actions'

export default {
    namespaced: true,
    mutations,
    state: {
        current: {
            representantes_legais: [],
            conta_corrente: {},
        }
    },
    actions
}
