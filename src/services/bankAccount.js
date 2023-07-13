import http from "@/services/http";

class BankAccount {
    create(payload) {
        return http.post(`/backoffice/cedente/${payload.cedente_id}/contas_correntes`, { conta_corrente: payload })
    }

    update(payload) {
        return http.put(`/contas_correntes/${payload.id}`, { conta_corrente: payload })
    }

    destroy({cedente_id, conta_corrente_id}) {
        return http.delete(`/backoffice/cedente/${cedente_id}/contas_correntes/${conta_corrente_id}`)
    }
}

export default new BankAccount()
