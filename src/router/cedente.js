import {
  dateTimeFormatter,
  moneyFormatDatatable,
  percentageFormatter,
  creditSolicitationAssignorStatusBadge,
} from '@core/comp-functions/data_visualization/datatable';

export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/cedente/dashboard/pages/Index.vue'),
    meta: {
      action: 'cedente-read',
      resource: 'cedente-user',
    },
  },
  {
    path: '/antecipacoes',
    name: 'antecipacoes.index',
    component: () => import('@/views/cedente/antecipacoes/pages/Index.vue'),
    meta: {
      pageTitle: 'Antecipações de crédito',
      indexObject: {
        serviceUrl: '/solicitacao_antecipacao/cedente',
        fields: [
          {
            label: 'Operação',
            key: 'id',
            sortable: true,
            formatter: 'OperationNumberFormatter',
          },
          {
            label: 'Antecipação',
            key: 'created_at',
            sortable: true,
            formatter: dateTimeFormatter,
          },
          {
            label: 'Recebimento',
            key: 'status',
            sortable: true,
            formatter: creditSolicitationAssignorStatusBadge,
          },
          {
            label: 'Total selecionado',
            key: 'valor_solicitacao',
            sortable: false,
            formatter: moneyFormatDatatable,
          },
          {
            label: 'Total disponível',
            key: 'valor_bruto',
            sortable: false,
            formatter: moneyFormatDatatable,
          },
          {
            label: 'A antecipar',
            key: 'valor_liquido',
            sortable: false,
            formatter: moneyFormatDatatable,
          },
        ],
        actions: [
          {
            label: 'Visualizar',
            icon: 'icon-search',
            action: 'show',
            name: 'antecipacoes.details',
          },
        ],
        filters: [],
        editRouteName: 'antecipacoes.details',
      },
      action: 'cedente-read',
      resource: 'cedente-user',
    },
  },
  {
    path: '/antecipacoes/:id/detalhes',
    name: 'antecipacoes.details',
    component: () => import('@/views/cedente/antecipacoes/pages/Details.vue'),
    meta: {
      action: 'cedente-read',
      resource: 'cedente-user',
    },
  },
  {
    path: '/minha-conta',
    name: 'minha-conta',
    component: () => import('@/views/cedente/user/pages/CompleteRegistration.vue'),
    meta: {
      action: 'cedente-read',
      resource: 'cedente-user',
      pageTitle: 'Minha Conta',
    },
  },
  {
    path: '/completar-cadastro',
    name: 'complete-registration',
    component: () => import('@/views/cedente/user/pages/CompleteRegistration.vue'),
    meta: {
      action: 'cedente-read',
      resource: 'cedente-user',
      skipGoToHome: true,
      pageTitle: 'Complete o cadastro das empresas do seu grupo econômico',
      pageSubtitle: 'Preencha abaixo as informações referentes à cada matriz cadastrada',
    },
  },
  {
    path: '/completar-cadastro/:id',
    name: 'complete-economic-group-registration',
    component: () => import('@/views/cedente/user/pages/CompleteEconomicGroupRegistration.vue'),
    meta: {
      action: 'cedente-read',
      resource: 'cedente-user',
      skipGoToHome: true,
      pageTitle: 'Complete o cadastro das empresas do seu grupo econômico',
      pageSubtitle: 'Preencha abaixo as informações referentes à cada matriz e filial',
    },
  },
  {
    path: '/primeiro-acesso',
    name: 'first-access',
    component: () => import('@/views/cedente/user/pages/FirstAccess.vue'),
    meta: {
      layout: 'first-access',
      action: 'cedente-read',
      resource: 'cedente-user',
    },
  },

  {
    path: '/grupo-economico/cedentes/adicionar',
    name: 'economic-group.cedentes.new',
    component: () => import('@/views/cedente/user/pages/FirstAccess.vue'),
    meta: {
      layout: 'first-access',
      step: 2,
      action: 'cedente-read',
      resource: 'cedente-user',
    },
  },
  {
    path: '/detalhes-da-antecipacao/:id',
    name: 'operation-details',
    component: () => import('@/views/cedente/dashboard/pages/OperationDetails.vue'),
    meta: {
      action: 'cedente-read',
      resource: 'cedente-user',
    }
  },
]
