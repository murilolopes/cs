export default [
  {
    path: '/investidor/login',
    name: 'investor-auth-login',
    component: () => import('@/views/common/auth/pages/Login.vue'),
    meta: {
      layout: 'auth',
      resource: 'Auth',
      redirectIfLoggedIn: false,
    },
  },
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
      indexObject: {
        filters: [
          {
            category: 'Por parâmetro',
            fields: [
              {
                label: 'Ativo',
                key: 'status',
                type: 'select',
                options: [
                  { label: 'CRA', value: '0' },
                  { label: 'CRI', value: '1' },
                  { label: 'CR', value: '2' },
                  { label: 'Debênture', value: '3' },
                  { label: 'Nota Comercial', value: '5' },
                ],
              },
              {
                label: 'Oferta',
                key: 'status',
                type: 'select',
                options: [
                  { label: 'Pública', value: '0' },
                  { label: 'Privada', value: '1' },
                ],
              },
              {
                label: 'Tempo vencimento (anos)',
                key: 'teste',
                type: 'slider',
              },
              {
                label: 'Indexador',
                key: 'status',
                type: 'select',
                options: [
                  { label: 'ICPA', value: '0' },
                  { label: 'CDI', value: '1' },
                  { label: 'Prefixado', value: '1' },
                  { label: 'IGPDI', value: '1' },
                  { label: 'INCCM', value: '1' },
                  { label: 'INCCDI', value: '1' },
                  { label: 'TR', value: '1' },
                  { label: 'INPC', value: '1' },
                ],
              },
              {
                label: 'Natureza',
                key: 'status',
                type: 'select',
                options: [
                  { label: 'Corporativo', value: '0' },
                  { label: 'Residencial', value: '1' },
                ],
              },
              {
                label: 'Concentração',
                key: 'status',
                type: 'select',
                options: [
                  { label: 'Concentrado', value: '0' },
                  { label: 'Pulverizado', value: '1' },
                ],
              },
              {
                label: 'Rating',
                key: 'status',
                type: 'select',
                options: [{ label: 'Com rating', value: '0' }],
              },
            ],
          },
        ],
      },
    },
  },
  {
    path: '/investidor/emissoes/:id/detalhes',
    name: 'detalhes',
    component: () => import('@/views/investor/pages/Detalhes.vue'),
    meta: {
      action: 'investor-read',
      resource: 'investor-user',
      pageTitle: 'Detalhamento da emissão',
      pageSubtitle: 'Análise detalhada da emissão.',
      skipGoToHome: true,
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
