import http from "./http";
class creditAdvance {
    solicitationsItens(id) {
        return http.get(`solicitacao_antecipacao/${id}`)
    }
}

export default new creditAdvance()