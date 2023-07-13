import http from "@/services/http";

class Liquidation {
  paymentPending() {
    return http.get('/solicitacao_antecipacao/pendentes_pagamento')
  }

  baixarCnab(payload) {
    return http.post('/cnab_antecipacoes', { antecipacoes_ids: payload })
  }

  reportPayment(payload) {
    return http.put('/solicitacao_antecipacao/notificar_pagamento', { solicitacoes_ids: payload })
  }


  bankAccount(id) {
    return http.get(`/solicitacao_antecipacao/${id}/conta_cedente`)
  }

  operationDetails(id) {
    return http.get(`/solicitacao_antecipacao/${id}/operation_detail`)
  }
}

export default new Liquidation()
