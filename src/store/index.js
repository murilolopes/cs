import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Modules
import app from './app'
import auth from './auth'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import firstAccess from './first-access'
import dashboard from './dashboard'
import admin from './admin'
import investor from './investor'
import common from './common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    auth,
    appConfig,
    verticalMenu,
    firstAccess,
    dashboard,
    admin,
    investor,
    common,
  },
  strict: process.env.DEV,
  plugins: [createPersistedState()],
})
