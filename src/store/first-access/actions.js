import EconomicGroup from '@/services/economic_group'

const generateMinuta = ({ dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    EconomicGroup.generateDocument(payload)
      .then(response => {
        dispatch('auth/getCurrentEconomicGroupData', null, { root: true })
        resolve(response)
      })
      .catch(error => reject(error))
  })
}

const newEconomicGroup = ({ dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    EconomicGroup.new(payload)
      .then(response => {
        dispatch('auth/getCurrentEconomicGroupData', null, { root: true })
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
    })
}

const updateEconomicGroupName = ({ dispatch }, payload) => {
  return new Promise((resolve, reject) => {
    EconomicGroup.updateName(payload)
      .then(response => {
        dispatch('auth/getCurrentEconomicGroupData', null, { root: true })
        resolve(response)
      })
      .catch(error => {
        reject(error)
      })
  })
}

const acceptTerms = ({}, payload) => {
  return new Promise((resolve, reject) => {
    EconomicGroup.acceptTerms(payload)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

const addCnpj = ({}, payload) => {
  return new Promise((resolve, reject) => {
    EconomicGroup.addCnpj(payload)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

const removeCnpj = ({}, payload) => {
  return new Promise((resolve, reject) => {
    EconomicGroup.removeCnpj(payload)
      .then(response => resolve(response))
      .catch(error => reject(error))
  })
}

export default {
  generateMinuta,
  newEconomicGroup,
  acceptTerms,
  addCnpj,
  removeCnpj,
  updateEconomicGroupName
}
