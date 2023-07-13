import Acquirer from '@/services/acquirer'

export default {

  fetch({}, id) {
    return new Promise((resolve, reject) => {
      Acquirer.show(id)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  save({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      const method = payload.id ? 'update' : 'create'
      Acquirer[method](payload)
        .then(async response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getTransactionsByAcquirers(context, payload) {
    return new Promise((resolve, reject) => {
      Acquirer.getAll(payload)
        .then(async response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  fetchAll({}, payload) {
    return new Promise((resolve, reject) => {
      Acquirer.index(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  fetchTaxesHistory({}, credenciadoraId) {
    return new Promise((resolve, reject) => {
      Acquirer.getTaxesByDate(credenciadoraId)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateGlobalTax({}, payload) {
    return new Promise((resolve, reject) => {
      Acquirer.updateGlobalTax(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateEnableState({}, payload) {
    return new Promise((resolve, reject) => {
      Acquirer.changeEnable(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

}
