import Company from "@/services/company";
import Assginor from "@/services/assignor";
import EconomicGroup from "@/services/economic_group";
import Subsidiary from "@/services/subsidiary";
import Invite from "@/services/invite";
import Representative from "@/services/representative";
import BankAccount from "@/services/bankAccount";
import creditAdvance from "@/services/creditAdvance";

const getBankAccounts = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        EconomicGroup.getBankAccounts(payload)
            .then(response => resolve(response))
            .catch(error => reject(error))
    })
}
const complementCompanyData = ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
        Assginor.complementData(payload).then(response => {
            // commit('UPDATE_CURRENT', payload)
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

const fetch = ({ commit, rootState }, id) => {
    const { user_type } = rootState.auth.userData
    return new Promise((resolve, reject) => {
        const company = new Company(user_type)
        company.getCompany(id)
            .then(response => {
                commit('SET_CURRENT', response.data)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const createInviteFromCompany = ({ commit, rootState }, params) => {
    const { user_type } = rootState.auth.userData
    return new Promise((resolve, reject) => {
        const company = new Company(user_type)
        const { id, ...payload } = params
        company.createInviteContact(id, payload).then(response => {
            resolve(response)
        })
            .catch(error => {
                reject(error)
            })
    })
}

const createRepresentative = ({ rootState }, payload) => {
    const { user_type } = rootState.auth.userData
    const representative = new Representative(user_type)
    return new Promise((resolve, reject) => {
        representative.create(payload).then(response => {
            resolve(response)
        })
            .catch(error => {
                reject(error)
            })
    })
}

const saveRepresentative = ({ dispatch, rootState }, payload) => {
    const { user_type } = rootState.auth.userData
    return new Promise((resolve, reject) => {
        const representative = new Representative(user_type)
        const method = payload.id ? 'update' : 'save'
        representative[method](payload)
            .then(async response => {
                await dispatch('fetch', payload.cedente_id ? payload.cedente_id : rootState.auth.userData.cedente_id)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const fetchRepresentatives = ({}, payload) => {
    return new Promise((resolve, reject) => {
        EconomicGroup.fetchRepresentatives(payload)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}

const fetchEconomicGroupRepresentatives = ({}, payload) => {
    return new Promise((resolve, reject) => {
        EconomicGroup.fetchEconomicGroupRepresentatives(payload)
        .then(response => resolve(response))
        .catch(error => reject(error))
    })
}

const destroyRepresentative = ({}, payload) => {
    return new Promise((resolve, reject) => {
        EconomicGroup.destroyRepresentative(payload)
            .then(async response => resolve(response))
            .catch(error => reject(error))
    })
}

const saveCompanyBankAccount = ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
        const method = payload.id ? 'update' : 'save'
        BankAccount[method](payload)
            .then(async response => {
                await dispatch('fetch', payload.cedente_id || rootState.auth.userData.cedente_id)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const destroyBankAccount = ({ dispatch, rootState }, payload) => {
    return new Promise((resolve, reject) => {
        BankAccount.destroy(payload.id)
            .then(async response => {
                await dispatch('fetch', payload.cedente_id  || rootState.auth.userData.cedente_id)
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const uploadSocialContract = ({ commit, rootState }, payload) => {
    const id = rootState.auth.userData.cedente_id
    const { user_type } = rootState.auth.userData

    return new Promise((resolve, reject) => {
        const company = new Company(user_type)
        company.uploadSocialContract(id, payload).then(response => {
            commit('auth/SET_STATUS_DOCUMENTATION', null, { root: true })
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

const approve = ({ commit, rootState }, payload) => {
    const { user_type } = rootState.auth.userData
    return new Promise((resolve, reject) => {
        const company = new Company(user_type)
        company.approveDocuments(payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const repprove = ({ commit, rootState }, payload) => {
    const { user_type } = rootState.auth.userData
    return new Promise((resolve, reject) => {
        const company = new Company(user_type)
        company.repproveDocuments(payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const approveRepresentante = ({ commit, rootState }, id) => {
    const { user_type } = rootState.auth.userData
    return new Promise((resolve, reject) => {
        const company = new Company(user_type)
        company.approveRepresentanteLegal(id)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const repproveRepresentante = ({ commit, rootState }, payload) => {
    const { user_type } = rootState.auth.userData
    return new Promise((resolve, reject) => {
        const company = new Company(user_type)
        company.repproveRepresentanteLegal(payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const updateTax = ({ }, id) => {
    return new Promise((resolve, reject) => {
        Company.updateTax(id)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const getInvites = ({ commit, rootState }, id) => {
    const { user_type } = rootState.auth.userData
    return new Promise((resolve, reject) => {
        const company = new Company(user_type)
        company.getInvites(id)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const createInvite = ({ commit }, { id, payload }) => {
    return new Promise((resolve, reject) => {
        Invite.create(id, payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const resendInvite = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        Invite.resend(id)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const deleteInvite = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        Invite.delete(id)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const getAnalysisResult = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        Company.AnalysisResult(id)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const sendDocumentationToAnalysis = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        new Company().sendDocumentationToAnalysis(id)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const creditSolicitationDetails = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        creditAdvance.solicitationsItens(id)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const getEconomicGroups = ({ commit }) => {
    return new Promise((resolve, reject) => {
        EconomicGroup.fetch()
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const fetchSubsidiaries = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        Subsidiary.fetch(payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const addSubsidiary = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        Subsidiary.new(payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
const removeSubsidiary = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        Subsidiary.remove(payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const addBank = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        BankAccount.create(payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
const removeBank = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        BankAccount.destroy(payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
const getCedente = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        EconomicGroup.getCedente(payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
const copyRepresentatives = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        EconomicGroup.copyRepresentatives(payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}
const apto = ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
        EconomicGroup.apto(payload)
            .then(response => {
                resolve(response)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const getCedentesFromEconomicGroup = ({ commit }, id) => {
    return new Promise((resolve, reject) => {
        EconomicGroup.cedentes(id)
            .then(response => {
            resolve(response)
            })
            .catch(error => {
            resolve(error)
            })
    })
}

export default {
    apto,
    fetch,
    complementCompanyData,
    createInviteFromCompany,
    createRepresentative,
    saveRepresentative,
    destroyRepresentative,
    fetchRepresentatives,
    saveCompanyBankAccount,
    uploadSocialContract,
    destroyBankAccount,
    approve,
    repprove,
    approveRepresentante,
    repproveRepresentante,
    updateTax,
    getInvites,
    createInvite,
    resendInvite,
    deleteInvite,
    getAnalysisResult,
    sendDocumentationToAnalysis,
    creditSolicitationDetails,
    getEconomicGroups,
    fetchSubsidiaries,
    addSubsidiary,
    removeSubsidiary,
    addBank,
    removeBank,
    getBankAccounts,
    getCedente,
    fetchEconomicGroupRepresentatives,
    copyRepresentatives,
    getCedentesFromEconomicGroup,
}
