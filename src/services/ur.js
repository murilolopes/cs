import http from "@/services/http";
class Ur {
  fetch(payload) {
    let params = ''

    Object.keys(payload).filter((key, index) => {
      if (payload[key]) params += encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]) + '&'
    })

    return http.get('/urs?' + params)
  }

  conciliate(payload) {
    return http.post('/urs/baixar', { urs_ids: payload })
  }
}

export default new Ur()