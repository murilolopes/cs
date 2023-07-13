import http from "@/services/http";
import Invite from "@/services/invite";
import Auth from "@/services/auth";

const getBanks = ({ commit, rootState }) => {
    if (rootState.common.bank.list.length) return

    return new Promise((resolve, reject) => {
        http.get('/bancos').then(response => {
            let banks1 = response.data[0].bancos.map(bank => {
                return {
                    label: bank.texto,
                    value: bank.id
                }
            })

            let banks2 = response.data[1].bancos.map(bank => {
                return {
                    label: bank.texto,
                    value: bank.id
                }
            })

            commit('SET_BANK_LIST', [...banks1, ...banks2])
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

const getGenericOptionList = ({}, payload) => {
    return new Promise((resolve, reject) => {
        http.post('/generic_option_list', payload).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

const validateInvite = ({}, token) => {
    return new Promise((resolve, reject) => {
        Invite.validate(token).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

const validateResetToken = ({}, token) => {
    return new Promise((resolve, reject) => {
        Auth.validateResetToken(token).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}

export default {
    getBanks,
    validateInvite,
    validateResetToken,
    getGenericOptionList,
}
