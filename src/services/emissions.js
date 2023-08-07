import http from '@/services/http'

class Emissions {
  constructor(api_type = 'publico') {
    this.api_type = api_type
  }

  fetch(payload) {
    return http.get(`${this.api_type}/emissoes`, { params: payload })
  }

  get(payload) {
    return http.get(`${this.api_type}/emissoes/${payload}`)
  }

  paymentHistory(payload) {
    return http.get(`${this.api_type}/emissoes/${payload}/grafico_historico_pagamentos`)
  }

  pusGraph(payload) {
    return http.get(`${this.api_type}/emissoes/${payload.id}/grafico_pus`, { params: payload })
  }

  calcDesagio(payload) {
    return http.post(`${this.api_type}/emissoes/${payload.id}/calc_desagio`, payload)
  }

  pus(payload) {
    return http.get(`${this.api_type}/emissoes/${payload}/pus`)
  }

  favorite(payload) {
    return http.post(`${this.api_type}/emissoes/${payload}/favoritar`)
  }

  unfavorite(payload) {
    return http.post(`${this.api_type}/emissoes/${payload}/desfavoritar`)
  }

  getDocs(payload) {
    return http.get(`${this.api_type}/emissoes/${payload}/documentos`)
  }

  downloadPusHistory(payload) {
    return http.post(`${this.api_type}/emissoes/${payload.id}/download_historico_pus`, {
      ...payload,
      responseType: 'blob',
    })
  }
}

export default Emissions
