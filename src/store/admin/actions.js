import liquidation from '@/services/liquidation'
import CreditCardBrand from '@/services/credit_card_brands'
import Acquirer from '@/services/acquirer'
import Assignor from '@/services/assignor'

const bankAccount = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    liquidation
      .bankAccount(id)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const operationDetails = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    liquidation
      .operationDetails(id)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const paymentPending = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    liquidation
      .paymentPending(id)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const baixarCnab = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    liquidation
      .baixarCnab(id)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const reportPayment = ({ commit }, id) => {
  return new Promise((resolve, reject) => {
    liquidation
      .reportPayment(id)
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const fetchCreditCardBrands = ({}) => {
  return new Promise((resolve, reject) => {
    CreditCardBrand.fetch()
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const fetchAcquirersWithoutPaginate = ({}) => {
  return new Promise((resolve, reject) => {
    Acquirer.withoutPaginate()
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const fetchAssignors = ({}) => {
  return new Promise((resolve, reject) => {
    Assignor.fetch()
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const fetchCreditCardBrandsByUrs = ({}) => {
  return new Promise((resolve, reject) => {
    CreditCardBrand.fetchByUrs()
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const fetchAcquirersWithoutPaginateByUrs = ({}) => {
  return new Promise((resolve, reject) => {
    Acquirer.withoutPaginateByUrs()
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

const fetchAssignorsByUrs = ({}) => {
  return new Promise((resolve, reject) => {
    Assignor.fetchByUrs()
      .then((response) => resolve(response))
      .catch((error) => reject(error))
  })
}

export default {
  baixarCnab,
  reportPayment,
  paymentPending,
  bankAccount,
  fetchCreditCardBrands,
  fetchAcquirersWithoutPaginate,
  fetchAssignors,
  operationDetails,
  fetchCreditCardBrandsByUrs,
  fetchAcquirersWithoutPaginateByUrs,
  fetchAssignorsByUrs,
}
