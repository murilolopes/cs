import http from '@/services/http'

class Emissions {
  fetch(payload) {
    return http.get('/emissoes', { params: payload })
  }

  get(payload) {
    return http.get(`/emissoes/${payload}`)
  }

  paymentHistory(payload) {
    return http.get(`/emissoes/${payload}/grafico_historico_pagamentos`)
  }

  pusGraph(payload) {
    return http.get(`/emissoes/${payload.id}/grafico_pus`, { params: payload })
  }

  calcDesagio(payload) {
    return http.post(`/emissoes/${payload.id}/calc_desagio`, payload)
  }

  pus(payload) {
    return http.get(`/emissoes/${payload}/pus`)
  }

  getDocs(payload) {
    return http.get(`/emissoes/${payload}/documentos`)
  }

  downloadPusHistory(payload) {
    return http.post(`/emissoes/${payload.id}/download_historico_pus`, {
      ...payload,
      responseType: 'blob',
    })
  }
}

export default new Emissions()
