import http from "@/services/http";

class Representative {

    constructor(userType = 'cedente') {
        this.userType = userType
    }

    create(payload) {
        const newFormData = Object.keys(payload).reduce((formData, key) => {
            formData.append(`representante_legal[${key}]`, payload[key]);
            return formData;
        }, new FormData());

        return http.post(`/backoffice/${this.userType}/representantes_legais`, newFormData, {
            headers: {"Content-Type": "multipart/form-data"}
        })
    }

    save(payload) {
        const newFormData = new FormData()

        Object.keys(payload).filter(key => newFormData.append(`representante_legal[${key}]`, payload[key]));
        const url = this.userType === 'cedente' ? `/backoffice/cedente/${payload.cedente_id}/representantes_legais` : `/backoffice/admin/representantes_legais`

        return http.post(url, newFormData, { headers: {"Content-Type": "multipart/form-data"} })
    }

    update(payload) {
        const newFormData = new FormData()

        if(payload.comprovante_residencia.url !== undefined) delete payload.comprovante_residencia
        if(payload.documento_identidade.url !== undefined) delete payload.documento_identidade
        if(payload.procuracao.url !== undefined) delete payload.procuracao

        Object.keys(payload).filter(key => newFormData.append(`representante_legal[${key}]`, payload[key]));
        const url = this.userType === 'cedente' ? `/backoffice/cedente/${payload.cedente_id}/representantes_legais/${payload.id}` : `/backoffice/admin/representantes_legais`

        return http.put(url, newFormData, { headers: {"Content-Type": "multipart/form-data"} })
    }

    destroy(id) {
        return http.delete(`/backoffice/${this.userType === 'cedente' ? 'cedente' : 'admin'}/representantes_legais/${id}`)
    }
}

export default Representative
