import {
  dateTimeFormatter,
  creditSolicitationAdminStatusBadge,
  moneyFormatDatatable,
} from '@core/comp-functions/data_visualization/datatable'

export default [
  {
    path: '/parceiro/dashboard',
    name: 'parceiro-dashboard.index',
    component: () => import('@/views/parceiro/dashboard/pages/Index.vue'),
    meta: {
      action: 'parceiro-read',
      resource: 'parceiro-user',
    }
  },
  {
    path: '/parceiro/antecipacoes',
    name: 'parceiro-antecipacoes.index',
    component: () => import('@/views/parceiro/antecipacoes/pages/Index.vue'),
    meta: {
      indexObject: {
        serviceUrl: '/solicitacao_antecipacao/parceiro',
        fields: [
          {
            label: 'Operação',
            key: 'id',
            sortable: true,
          },
          {
            label: 'Razão Social',
            key: 'cedente.razao_social',
            sortable: true,
          },
          {
            label: 'Antecipação',
            key: 'created_at',
            sortable: true,
            formatter: dateTimeFormatter,
          },
          {
            label: 'status',
            key: 'status',
            sortable: true,
            formatter: creditSolicitationAdminStatusBadge
          },
          {
            label: 'A antecipar',
            key: 'valor_liquido',
            sortable: true,
            formatter: moneyFormatDatatable
          },
        ],
        actions: [
          {
            label: 'Visualizar',
            icon: 'icon-search',
            action: 'show',
            name: 'parceiro-antecipacoes.details'
          },
        ],
        editRouteName: 'parceiro-antecipacoes.details'
      },
      action: 'parceiro-read',
      resource: 'parceiro-user',
    }
  },
  {
    path: '/parceiro/antecipacoes/:id/detalhes',
    name: 'parceiro-antecipacoes.details',
    component: () => import('@/views/parceiro/antecipacoes/pages/Details.vue'),
    meta: {
      action: 'parceiro-read',
      resource: 'parceiro-user',
    }
  },
]
