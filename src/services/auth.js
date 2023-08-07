import http from './http'

class Auth {
  login(payload) {
    return http.post('/auth', { user: payload })
  }

  createUser(user) {
    return http.post('/auth', { user })
  }

  userData() {
    return http.get('/auth/current')
  }

  sendResetPasswordEmail(payload) {
    return http.post('/password_reset', { user: payload })
  }

  validateResetToken(payload) {
    return http.get(`/password_reset/${payload}`)
  }

  newPassword(payload) {
    return http.put(`/password_reset/${payload.token}`, { password: payload })
  }

  updatePassword(payload) {
    return http.post(`/auth/change_current_password`, { user: payload })
  }
}

export default new Auth()
