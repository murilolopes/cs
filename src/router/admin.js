export default [
  {
    path: '/admin/login',
    name: 'admin.login',
    component: () => import('@/views/common/auth/pages/Login.vue'),
    meta: {
      layout: 'auth',
      resource: 'Auth',
      redirectIfLoggedIn: true,
      layoutPage: {
        formCard: {
          title: 'Administrador',
          icon: require('@/assets/images/investidor/login-icon.svg'),
        },
        appLogoGrande: require('@/assets/images/investidor/cs-logo-login.svg'),
        cardToMoney: require('@/assets/images/investidor/login-image.svg'),
      },
    },
  },
  {
    path: '/admin/dashboard',
    name: 'admin.dashboard',
    component: () => import('@/views/admin/dashboard/pages/Index.vue'),
    meta: {
      action: 'admin-read',
      resource: 'admin-user',
      pageTitle: 'Grupos econômicos',
      skipGoToHome: true,
      indexObject: {
        serviceUrl: 'backoffice/cedentes',
        editRouteName: 'admin-dashboard.general-data',
        datatableTitle: 'Grupos disponíveis na plataforma',
        fields: [
          {
            label: 'Nome do grupo econômico',
            key: 'cnpj',
          },
          {
            label: 'Pendências',
            key: 'cnpj',
          },
          {
            label: 'Apto para operar',
            key: 'cnpj',
          },
          {
            label: '',
            key: 'viewButton',
          },
        ],
        filters: [],
      },
    },
  },
  {
    path: '/admin/grupo-economico/:id',
    component: () => import('@/layouts/vertical/LayoutVerticalAssignor.vue'),
    meta: {
      action: 'admin-read',
      resource: 'admin-user',
    },
    children: [
      {
        path: 'empresas',
        name: 'admin.economicGroup.companies',
        component: () => import('@/views/admin/dashboard/pages/Companies.vue'),
        meta: {
          action: 'admin-read',
          resource: 'admin-user',
          pageTitle: 'Grupo econômico',
          skipGoToHome: true,
        },
      },
      {
        path: 'usuarios',
        name: 'admin.economicGroup.users',
        component: () => import('@/views/admin/dashboard/pages/Users.vue'),
        meta: {
          action: 'admin-read',
          resource: 'admin-user',
          pageTitle: 'Grupo econômico',
          skipGoToHome: true,
        },
      },
      {
        path: 'convites',
        name: 'admin.economicGroup.invites',
        component: () => import('@/views/admin/dashboard/pages/Invites.vue'),
        meta: {
          action: 'admin-read',
          resource: 'admin-user',
          pageTitle: 'Grupo econômico',
          skipGoToHome: true,
        },
      },
    ],
  },
  {
    path: '/admin/perfil',
    name: 'admin.profile',
    component: () => import('@/views/admin/pages/Profile.vue'),
    meta: {
      action: 'admin-read',
      resource: 'admin-user',
      pageTitle: 'Perfil',
      skipGoToHome: true,
    },
  },
]
