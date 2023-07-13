import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import admin from './admin'
import cedente from './cedente'
import parceiro from './parceiro'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'dashboard' } },
    {
      path: '/login',
      name: 'auth-login',
      component: () => import('@/views/common/auth/pages/Login.vue'),
      meta: {
        layout: 'auth',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/cadastrar',
      name: 'cadastrar',
      component: () => import('@/views/common/auth/pages/Register.vue'),
      meta: {
        layout: 'auth',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    {
      path: '/nao-autorizado',
      name: 'misc-not-authorized',
      component: () => import('@/views/common/pages/NotAuthorized.vue'),
      meta: {
        layout: 'full',
        action: 'read',
        resource: 'Auth',
      },
    },
    {
      path: '/auth/change-password/:token',
      name: 'change-password',
      component: () => import('@/views/common/auth/pages/ChangePassword.vue'),
      meta: {
        layout: 'full',
        resource: 'Auth',
        redirectIfLoggedIn: true,
      },
    },
    ...admin,
    ...cedente,
    ...parceiro,
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  dashboardMiddleware(to, next, store.state)

  if (!canNavigate(to)) {
    // Redirect to log in if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })

    // To avoid not authorized when logged in as admin redirect to admin dashboard
    if (store.state.auth.userData.user_type === 'admin') return next({ name: 'admin-dashboard' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  firstAccessMiddleware(to, next, store.state.auth, isLoggedIn)

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.user_type : null))
  }

  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

const firstAccessMiddleware = (to, next, state, isLoggedIn) => {
  if (to.name === 'first-access' || state.userData.user_type === 'admin') return;

  if (!isLoggedIn) return next();

  const assignorDoesntHaveEconomicGroup = Object.keys(state.currentEconomicGroup).length === 0
  const firstAccessNotCompleted = state.currentEconomicGroup?.situacao_cadastro !== 'cedentes_cadastrados'

  if ((assignorDoesntHaveEconomicGroup || firstAccessNotCompleted) && to.path !== 'primeiro-acesso') return next({ name: 'first-access' })
}

const dashboardMiddleware = (to, next, state) => {
  const isDashboardRoute = to.path.includes('dashboard')
  if (!isDashboardRoute || state.auth.userData.user_type === 'admin') return;

  //const analysisPendingOrInProgress = ['pendente', 'em_progresso'].includes(store.state.auth.userData.empresa.status_analise)
  //const scrInfosNotSended = state.auth.userData.empresa.status_scr_consent === 'nao_concluido'
  //const analysisCompletedLimitInProgress = (state.auth.userData.empresa.status_analise === 'finalizada' && state.auth.userData.empresa.status_limite === 'pendente')
  //const pendingAnalysis = analysisPendingOrInProgress || analysisCompletedLimitInProgress

  //if (to.path !== '/dashboard/credito' && state.auth.userData.empresa.status_analise === 'finalizada' && state.auth.userData.empresa.status_limite === 'definido' && !scrInfosNotSended) return next('/dashboard/credito')
  //if (!['/dashboard/status'].includes(to.path) && pendingAnalysis && !scrInfosNotSended) return next('/dashboard/status')
  //if (state.auth.userData.empresa.status_analise === 'nao_solicitado' && !['/dashboard', '/dashboard/oferta-manual', '/dashboard/oferta-digital'].includes(to.path)) return next({ name: 'dashboard' })
}

export default router
