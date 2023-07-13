import Vue from 'vue';
import Auth from '@/services/auth';
import EconomicGroup from '@/services/economic_group';
import Router from '@/router';
import jwt from '@/auth/jwt/useJwt'
import { initialAbility } from '@/libs/acl/config';


export default {
  async login({ commit, dispatch }, payload) {
    return await new Promise(async (resolve, reject) => {
      await Auth.login(payload)
        .then(response => {
          const { user_data } = response.data
          const role = {
            admin: 'admin',
            cedente: 'cedente',
            parceiro: 'parceiro',
          }
          const defaultAction = `${role[user_data.user_type]}-read`

          jwt.setToken(response.data.auth_token)
          if (!user_data.permissions.length) {
            user_data.ability = [{
              resource: 'All',
              action: defaultAction,
            }]
          } else {
            user_data.ability = user_data.permissions.map((permission) => {
              return {
                action: defaultAction,
                resource: permission.resource,
              }
            })
          }

          user_data.ability.push({ action: 'read', resource: 'Auth' })
          localStorage.setItem('userData', JSON.stringify(user_data))
          commit('auth/SET_USER_DATA', user_data, { root: true })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  createUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Auth.createUser(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  getCurrentEconomicGroupData({ commit }, payload) {
    return new Promise((resolve, reject) => {
      EconomicGroup.current()
        .then(response => {
          commit('auth/UPDATE_CURRENT_ECONOMIC_GROUP_DATA', response.data, { root: true })
          resolve(response)
        })
        .catch(error => {
          if (error.response.status === 422) commit('auth/UPDATE_CURRENT_ECONOMIC_GROUP_DATA', {}, { root: true })
          resolve(error)
        })
    })
  },

  getUserData({ commit }) {
    return new Promise((resolve, reject) => {
      Auth.userData()
        .then(response => {
          commit('auth/UPDATE_USER_DATA', response.data, { root: true })
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  createUser({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Auth.createUser(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  sendResetPasswordEmail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Auth.sendResetPasswordEmail(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  newPassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      Auth.newPassword(payload)
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  logout({ commit }) {
    jwt.removeToken()
    jwt.removeRefreshToken()
    localStorage.removeItem('userData')
    Vue.prototype.$ability.update(initialAbility)
    Router.push({ name: 'auth-login' })
    commit('appConfig/CLEAR_ALERT_BADGE', null, { root: true })
    commit('cedente/SET_CURRENT', {}, { root: true })
    localStorage.removeItem('vuex')
  },
}
