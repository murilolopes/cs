export default [
  {
    path: '/investidor/emissoes',
    name: 'investor.emissions',
    component: () => import('@/views/investor/pages/Emissoes.vue'),
    meta: {
      action: 'investor-read',
      resource: 'investor-user',
      pageTitle: 'Emissoes',
      pageSubtitle: 'Acompanhe abaixo todas as nossas emissões.',
      skipGoToHome: true,
    },
  },
  {
    path: '/investidor/emissoes/:id/detalhes',
    name: 'detalhes',
    component: () => import('@/views/investor/pages/Detalhes.vue'),
    meta: {
      action: 'investor-read',
      resource: 'investor-user',
    },
  },
  {
    path: '/investidor/calculadora',
    name: 'precosUnicos',
    component: () => import('@/views/investor/pages/Calculator.vue'),
    meta: {
      action: 'investor-read',
      resource: 'investor-user',
    },
  },
  {
    path: '/investidor/perfil',
    name: 'profile',
    component: () => import('@/views/investor/pages/Profile.vue'),
    meta: {
      action: 'investor-read',
      resource: 'investor-user',
      pageTitle: 'Perfil',
      skipGoToHome: true,
    },
  },
]
