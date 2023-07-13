import http from './http'

class Assginor {
  fetch() {
    return http.get('/backoffice/cedentes/list')
  }

  fetchByUrs() {
    return http.get('/backoffice/cedentes/list_por_garantias')
  }

  complementData(payload) {
    if (payload.contrato_social?.url !== undefined) delete payload.contrato_social

    const newFormData = Object.keys(payload).reduce((formData, key) => {
      formData.append(`cedente[${key}]`, payload[key])
      return formData
    }, new FormData())

    return http.put(`/backoffice/cedentes/${payload.id}/complementar_cadastro`, newFormData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  }
}

export default new Assginor()
