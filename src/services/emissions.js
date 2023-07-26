import http from '@/services/http'

class Emissions {
  fetch(payload) {
    return http.get('/emissoes', { params: payload })
  }
}

export default new Emissions()
