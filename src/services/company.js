import http from "@/services/http";

class Company {

    constructor(userType = 'cedente') {
        this.userType = userType
    }

    create(payload) {
        const newFormData = Object.keys(payload).reduce((formData, key) => {
            formData.append(`cedente[${key}]`, payload[key]);
            return formData;
        }, new FormData());

        return http.post('/backoffice/cedentes/', newFormData, {
            headers: {"Content-Type": "multipart/form-data"}
        })
    }

    update(payload) {
        const newFormData = Object.keys(payload).reduce((formData, key) => {
            formData.append(`cedente[${key}]`, payload[key]);
            return formData;
        }, new FormData());

        return http.put(`/backoffice/cedentes/${payload.id}`, newFormData, {
            headers: {"Content-Type": "multipart/form-data"}
        })
    }

    complementInfos(payload) {
        return http.put('/backoffice/cedentes/complementar_cadastro', { cedente: payload })
    }

    getCompany(id) {
        return http.get(`/backoffice/cedentes/${id}`)
    }

    createInviteContact(id, payload) {
        return http.post(`/backoffice/empresas/${id}/create_convite_from_empresa`, { convite: payload })
    }

    uploadSocialContract(id, payload) {
        let formData = new FormData;

        formData.append('contrato_social', payload)

        return http.post(`/backoffice/cedentes/${id}/upload_contrato_social`, formData, {
            headers: {"Content-Type": "multipart/form-data"}
        })
    }

    updateTax(payload) {
        let formatedPayload = Object.assign({}, payload)
        // TODO create a composable to format BRL currency to float
        formatedPayload.limite = parseFloat(formatedPayload.limite.replaceAll('.', '').replace(',', '.').replace('R$ ', '').trim())
        formatedPayload.taxa_juros = parseFloat(formatedPayload.taxa_juros.replace(',', '.'))
        return http.put(`/backoffice/empresas/${formatedPayload.id}/update_taxa_prazo_limite`, formatedPayload)
    }

    approveDocuments(payload) {
        return http.post('/backoffice/validacao_documentacao/aprovado', payload)
    }

    repproveDocuments(payload) {
        return http.post('/backoffice/validacao_documentacao/reprovado', payload)
    }

    approveRepresentanteLegal(id) {
        return http.patch(`/backoffice/cedente/representantes_legais/${id}/aprovar`)
    }

    repproveRepresentanteLegal(payload) {
        return http.patch(`/backoffice/cedente/representantes_legais/${payload.id}/reprovar`, payload)
    }

    sendDocumentationToAnalysis(id) {
        return http.post(`/backoffice/cedentes/${id}/enviar_documentacao_para_analise`)
    }

    getInvites(id) {
        return http.get(`/backoffice/cedentes/${id}/convites`)
    }

    commercialNotes(payload) {
        return http.post('/concessao/notas_comerciais', payload)
    }

    simulate(id, payload) {
        return http.get(`/concessao/simulacao/${id}/valores_emprestimo`, {params: payload})
    }

    AnalysisResult(id) {
        return http.get(`/backoffice/empresas/${id}/analises`)
    }
}

export default Company
