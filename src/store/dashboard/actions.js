import ImportFile from '@/services/import_file'
import Company from '@/services/company'
import Acquirer from '@/services/acquirer'

export default {
  importClients({ commit, rootState }, payload) {
    return new Promise((resolve, reject) => {
      ImportFile.companies(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  save({ commit, rootState }, payload) {
    const { user_type } = rootState.auth.userData
    return new Promise((resolve, reject) => {
      const method = payload.id ? 'update' : 'create'
      const company = new Company(user_type)
      company[method](payload)
        .then(async response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getAcquirers({}, payload) {
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

  optIn({ }) {
    return new Promise((resolve, reject) => {
      Acquirer.optIn()
        .then(async response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  simulate({}, payload) {
    return new Promise((resolve, reject) => {
      Acquirer.simulate(payload)
      .then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  preview({}, payload) {
    return new Promise((resolve, reject) => {
      Acquirer.preview(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  antecipate({}, payload) {
    return new Promise((resolve, reject) => {
      Acquirer.antecipate(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  confirmAntecipation({}, payload) {
    return new Promise((resolve, reject) => {
      Acquirer.antecipate(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  cancelAntecipation({}, payload) {
    return new Promise((resolve, reject) => {
      Acquirer.cancel(payload).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  checkSolicitationStatus({}, payload) {
    return new Promise((resolve, reject) => {
      Acquirer.checkSolicitationStatus(payload)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
  },

  getEffectiveTax({}, payload){
    return new Promise((resolve, reject) => {
      Acquirer.getEffectiveTax(payload)
      .then(response => resolve(response))
      .catch(error => reject(error))
    })
  },
}
