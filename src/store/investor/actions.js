import Emissions from '@/services/emissions'
import Profile from '@/services/profile'

const fetchEmissions = ({}, payload) => {
  return new Promise((resolve, reject) => {
    const emissions = new Emissions('investidor')
    emissions
      .fetch(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}
const getEmission = ({}, payload) => {
  return new Promise((resolve, reject) => {
    const emissions = new Emissions('investidor')
    emissions
      .get(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const paymentHistory = ({}, payload) => {
  return new Promise((resolve, reject) => {
    const emissions = new Emissions('investidor')
    emissions
      .paymentHistory(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const pusGraph = ({}, payload) => {
  return new Promise((resolve, reject) => {
    const emissions = new Emissions('investidor')
    emissions
      .pusGraph(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const pus = ({}, payload) => {
  return new Promise((resolve, reject) => {
    const emissions = new Emissions('investidor')
    emissions
      .pus(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const downloadPusHistory = ({}, payload) => {
  return new Promise((resolve, reject) => {
    const emissions = new Emissions('investidor')
    emissions
      .downloadPusHistory(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const calcDesagio = ({}, payload) => {
  return new Promise((resolve, reject) => {
    const emissions = new Emissions('investidor')
    emissions
      .calcDesagio(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const getDocs = ({}, payload) => {
  return new Promise((resolve, reject) => {
    const emissions = new Emissions('investidor')
    emissions
      .getDocs(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const updateInvestorProfile = ({}, payload) => {
  return new Promise((resolve, reject) => {
    Profile.updateInvestorProfile(payload)
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
  updateInvestorProfile,
  downloadPusHistory,
}
