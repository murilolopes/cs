import http from './http'

class Auth {
  createUser(user) {
    return http.post('/investidor/usuarios', { user })
  }
}

export default new Auth()
