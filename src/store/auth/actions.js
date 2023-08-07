import Vue from 'vue'
import Auth from '@/services/auth'
import EconomicGroup from '@/services/economic_group'
import Router from '@/router'
import jwt from '@/auth/jwt/useJwt'
import { initialAbility } from '@/libs/acl/config'

export default {
  async login({ commit, dispatch }, payload) {
    return await new Promise(async (resolve, reject) => {
      await Auth.login(payload)
        .then((response) => {
          const { user } = response.data
          const role = {
            'Admin::User': 'admin',
            'Cedente::User': 'cedente',
            'Investidor::User': 'investidor',
          }
          const defaultAction = `${role[user.type]}-read`

          jwt.setToken(response.data.auth_token)
          if (!user.permissions?.length) {
            user.ability = [
              {
                resource: 'All',
                action: defaultAction,
              },
            ]
          } else {
            user.ability = user.permissions.map((permission) => {
              return {
                action: defaultAction,
                resource: permission.resource,
              }
            })
          }

          user.ability.push({ action: 'read', resource: 'Auth' })
          localStorage.setItem('userData', JSON.stringify(user))
          commit('auth/SET_USER_DATA', user, { root: true })
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  createUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Auth.createUser(payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  getCurrentEconomicGroupData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      EconomicGroup.current()
        .then((response) => {
          commit('auth/UPDATE_CURRENT_ECONOMIC_GROUP_DATA', response.data, { root: true })
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 422)
            commit('auth/UPDATE_CURRENT_ECONOMIC_GROUP_DATA', {}, { root: true })
          resolve(error)
        })
    })
  },

  getUserData({ commit }) {
    return new Promise((resolve, reject) => {
      Auth.userData()
        .then((response) => {
          commit('auth/UPDATE_USER_DATA', response.data, { root: true })
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  createUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Auth.createUser(payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  sendResetPasswordEmail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Auth.sendResetPasswordEmail(payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  newPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Auth.newPassword(payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  updatePassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Auth.updatePassword(payload)
        .then((response) => resolve(response))
        .catch((error) => reject(error))
    })
  },

  logout({ rootState }) {
    jwt.removeToken()
    jwt.removeRefreshToken()
    localStorage.removeItem('userData')
    Vue.prototype.$ability.update(initialAbility)

    const loginRoutesByUserType = {
      'Admin::User': 'admin.login',
      'Investidor::User': 'investor.login',
    }

    Router.push({ name: loginRoutesByUserType[rootState.auth.userData.type] })

    localStorage.removeItem('vuex')
  },
}
