export default [
  {
    path: '/emissoes',
    name: 'emissoes',
    component: () => import('@/views/public/Emissoes.vue'),
    meta: {
      layout: 'public',
    },
  },
  {
    path: '/emissoes/:id/detalhes',
    name: 'detalhes',
    component: () => import('@/views/public/Detalhes.vue'),
    meta: {
      layout: 'public',
    },
  },
  {
    path: '/precos-unicos',
    name: 'precosUnicos',
    component: () => import('@/views/public/Pus.vue'),
    meta: {
      layout: 'public',
    },
  },
]
