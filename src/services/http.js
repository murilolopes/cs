import http from '@axios'
import handleErrors from '@/libs/http/handleErrors'

const interceptRequest = async config => {
  const token = localStorage.getItem('accessToken')
  config.headers.common.Authorization = token
  return config
}

const interceptRequestError = error => Promise.reject(error)

const interceptResponse = response => response

const interceptResponseError = async error => {
  if (error.config.url === 'antecipa_transacoes/solicitar') {
    return Promise.reject(error)
  }

  if (error.config.url === 'antecipa_transacoes') {
    return Promise.reject(error)
  }

  if (error.config.url === '/backoffice/grupos_economicos/current') {
    return Promise.reject(error)
  }

  if (error.config.url === '/backoffice/grupos_economicos') {
    return Promise.reject(error)
  }

  if (error.config.url.includes('/backoffice/grupos_economicos/current/add_cnpj')) {
    return Promise.reject(error)
  }

  await handleErrors(error)

  return Promise.reject(error)
}

http.interceptors.request.use(interceptRequest, interceptRequestError)
http.interceptors.response.use(interceptResponse, interceptResponseError)

export default http
