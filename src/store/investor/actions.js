import Emissions from '@/services/emissions'

const fetchEmissions = ({}, payload) => {
  return new Promise((resolve, reject) => {
    Emissions.fetch(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}
const getEmission = ({}, payload) => {
  return new Promise((resolve, reject) => {
    Emissions.get(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const paymentHistory = ({}, payload) => {
  return new Promise((resolve, reject) => {
    Emissions.paymentHistory(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const pusGraph = ({}, payload) => {
  return new Promise((resolve, reject) => {
    Emissions.pusGraph(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const pus = ({}, payload) => {
  return new Promise((resolve, reject) => {
    Emissions.pus(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const downloadPusHistory = ({}, payload) => {
  return new Promise((resolve, reject) => {
    Emissions.downloadPusHistory(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const calcDesagio = ({}, payload) => {
  return new Promise((resolve, reject) => {
    Emissions.calcDesagio(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const getDocs = ({}, payload) => {
  return new Promise((resolve, reject) => {
    Emissions.getDocs(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

export default {
  pus,
  getDocs,
  pusGraph,
  getEmission,
  calcDesagio,
  fetchEmissions,
  paymentHistory,
  downloadPusHistory,
}
