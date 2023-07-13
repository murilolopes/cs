import http from "@/services/http";

class EconomicGroup {
  fetch() {
    return http.get('/transacoes/total_por_credenciadoras')
  }

  current() {
    return http.get('/backoffice/grupos_economicos/current')
  }

  new(payload) {
    return http.post('/backoffice/grupos_economicos', payload)
  }

  generateDocument() {
    return http.post('/backoffice/grupos_economicos/current/gerar_documento_autorizacao_leitura')
  }

  acceptTerms() {
    return http.post('/backoffice/grupos_economicos/current/autorizar_leitura')
  }

  addCnpj(payload) {
    return http.post(`/backoffice/grupos_economicos/current/add_cnpj/${payload}`)
  }

  removeCnpj(payload) {
    return http.delete(`/backoffice/grupos_economicos/current/remove_cnpj/${payload}`)
  }

  updateName(payload) {
    return http.put(`/backoffice/grupos_economicos/current/alterar_nome`, payload)
  }

  fetchEconomicGroupRepresentatives(payload) {
    return http.get('/backoffice/grupos_economicos/current/representantes_legais')
  }

  fetchRepresentatives(payload) {
    return http.get(`/backoffice/cedente/${payload}/representantes_legais`)
  }

  destroyRepresentative(payload) {
    return http.delete(`/backoffice/cedente/${payload.cedente_id}/representantes_legais/${payload.id}`)
  }

  getBankAccounts(payload) {
    return http.get(`/backoffice/cedente/${payload}/contas_correntes`)
  }

  getCedente(payload) {
    return http.get(`/backoffice/cedentes/${payload}`)
  }

  copyRepresentatives(payload) {
    return http.post(`/backoffice/cedente/${payload.id}/representantes_legais/copiar`, payload)
  }

  apto(payload) {
    return http.post(`/backoffice/cedentes/${payload.cedente_id}/update_apto_para_operar`, payload)
  }

  cedentes(id) {
    return http.get(`/backoffice/grupos_economicos/${id}/cedentes`)
  }
}

export default new EconomicGroup()