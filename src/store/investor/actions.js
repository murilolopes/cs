import Emissions from '@/services/emissions'

const fetchEmissions = ({}, payload) => {
  return new Promise((resolve, reject) => {
    Emissions.fetch(payload)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

export default {
  fetchEmissions,
}
