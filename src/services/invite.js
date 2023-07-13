import http from './http';

class Invite {
  create(id, payload) {
    return http.post(`backoffice/cedentes/${id}/create_convite_from_cedente`, { convite: payload })
  }

  resend(id) {
    return http.get(`backoffice/admin/convites/${id}/enviar_convite`)
  }

  delete(id) {
    return http.delete(`backoffice/cedentes/${id}/delete_convite_from_cedente`)
  }

  validate(token) {
    return http.get(`backoffice/convites?token=${token}`)
  }
}

export default new Invite();