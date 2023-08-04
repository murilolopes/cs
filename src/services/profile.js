import http from '@/services/http'

class Profile {
  updateInvestorProfile(payload) {
    return http.post('/investidor/usuarios/update_current', { user: payload })
  }
}

export default new Profile()
