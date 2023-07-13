import http from "@/services/http";

class Subsidiary {
  fetch(payload) {
    return http.get(`/backoffice/cedente/${payload.cedente_id}/filiais`)
  }

  new(payload) {
    return http.post(`/backoffice/cedente/${payload.cedente_id}/filiais`, payload)
  }

  remove(payload) {
    return http.delete(`/backoffice/cedente/${payload.cedente_id}/filiais`, {data: payload})
  }
}

export default new Subsidiary()