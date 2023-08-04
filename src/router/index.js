import Vue from 'vue'
import VueRouter from 'vue-router'

// Routes
import { canNavigate } from '@/libs/acl/routeProtection'
import { isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser } from '@/auth/utils'
import admin from './admin'
import investor from './investor'
import publicComponents from './public'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'admin.login' } },
    { path: '/admin', redirect: { name: 'admin.dashboard' } },
    { path: '/investidor', redirect: { name: 'investor.emissions' } },
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
    ...investor,
    ...publicComponents,
    { path: '/admin/*', redirect: { name: 'admin.emissions' } },
    { path: '/investidor/*', redirect: { name: 'investor.emissions' } },
  ],
})

router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  if (canNavigate(to)) {
    // Redirect to log in if not logged in
    if (!isLoggedIn) return next({ name: 'admin.login' })

    // If logged in => not authorized
    return next({ name: 'misc-not-authorized' })
  }

  const userData = getUserData()
  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) next(getHomeRouteForLoggedInUser(userData?.type))

  if (!canNavigate(to) && !isLoggedIn && !to.meta.redirectIfLoggedIn) {
    const correctLoginRoute = {
      admin: 'admin.login',
      investor: 'investor.login',
    }

    return next({ name: correctLoginRoute[to.name.split('.')[0]] })
  }

  const userType = {
    'Admin::User': 'admin',
    'Investidor::User': 'investor',
  }
  const userDiffRouter =
    userType[userData?.type] != to.name.split('.')[0] && to.name != 'misc-not-authorized'

  if (isLoggedIn && to.name != 'misc-not-authorized' && userDiffRouter) {
    return next({ name: 'misc-not-authorized' })
  }

  return next()
})

export default router
