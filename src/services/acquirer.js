/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
import http from '@/services/http'

class Acquirer {
  getAll(payload) {
    return http.get('/transacoes/total_por_credenciadoras', { params: payload })
  }

  optIn() {
    return http.get('/agenda/transacoes_disponiveis')
  }

  simulate(payload) {
    return http.post('antecipa_transacoes', payload)
  }

  preview(payload) {
    return http.post('antecipa_transacoes/preview', payload)
  }

  antecipate(payload) {
    return http.post('antecipa_transacoes/solicitar', payload)
  }

  confirm(payload) {
    return http.post(`antecipa_transacoes/confirmar/${payload}`)
  }

  cancel(payload) {
    return http.post(`antecipa_transacoes/cancelar/${payload}`)
  }

  checkSolicitationStatus(payload) {
    return http.post('/verifica_status_solicitacao/', { id: payload })
  }

  index(payload) {
    const params = new URLSearchParams(payload).toString()

    return http.get(`credenciadoras?${params}`)
  }

  withoutPaginate() {
    return http.get('all_credenciadoras')
  }

  withoutPaginateByUrs() {
    return http.get('credenciadoras_por_garantias')
  }

  show(id) {
    return http.get(`credenciadoras/${id}`)
  }

  create(payload) {
    const newFormData = Object.keys(payload).reduce((formData, key) => {
      formData.append(`credenciadora[${key}]`, payload[key])
      return formData
    }, new FormData())

    return http.post('/credenciadoras', newFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  update(payload) {
    const newFormData = Object.keys(payload).reduce((formData, key) => {
      formData.append(`credenciadora[${key}]`, payload[key])
      return formData
    }, new FormData())

    return http.put(`/credenciadoras/${payload.id}`, newFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }

  getTaxesByDate(credenciadoraId) {
    return http.get(`/credenciadoras/${credenciadoraId}/taxas`)
  }

  updateGlobalTax(payload) {
    return http.put(`/credenciadoras/${payload.credenciadora_id}/taxas`, { taxa_juros_padrao: payload.taxa_juros_padrao })
  }

  changeEnable(payload) {
    return http.put(`/credenciadoras/${payload.credenciadora_id}/change_enable`, { enable: payload.enable })
  }

  getEffectiveTax(payload) {
    return http.post('/solicitacao_antecipacao/taxa_efetiva_prevista', payload)
  }
}

export default new Acquirer()
