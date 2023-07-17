import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import admin from './admin'

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
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (!canNavigate(to)) {
    // Redirect to log in if not logged in
    if (!isLoggedIn) return next({ name: 'auth-login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

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

export default router
