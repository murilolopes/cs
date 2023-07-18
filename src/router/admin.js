export default [
  {
    path: '/admin/dashboard',
    name: 'dashboard',
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
]
