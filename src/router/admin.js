import {
  dateTimeFormatter,
  moneyFormatDatatable,
  creditSolicitationAdminStatusBadge,
  documentationStatusBadge,
  economicGroupNameLink,
  cnpj,
} from '@core/comp-functions/data_visualization/datatable'

export default [
  {
    path: '/admin/dashboard',
    name: 'admin-dashboard',
    component: () => import('@/views/admin/companies/pages/Index.vue'),
    meta: {
      action: 'admin-read',
      resource: 'admin-user',
      pageTitle: 'Empresas',
      datatableTitle: 'Gerencie as empresas da plataforma',
      skipGoToHome: true,
      indexObject: {
        serviceUrl: 'backoffice/cedentes',
        editRouteName: 'admin-dashboard.general-data',
        fields: [
          {
            label: 'CNPJ',
            key: 'cnpj',
            sortable: true,
            formatter: cnpj,
          },
          {
            label: 'Razão social',
            key: 'razao_social',
            sortable: true,
          },
          {
            label: 'Grupo Econômico',
            key: 'grupo_economico',
            sortable: true,
            formatter: economicGroupNameLink,
          },
          {
            label: 'Status',
            key: 'status_documentacao',
            sortable: true,
            formatter: documentationStatusBadge,
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
    path: '/admin/dashboard/novo',
    component: () => import('@/layouts/vertical/LayoutVerticalAssignor.vue'),
    meta: {
      action: 'admin-read',
      resource: 'admin-user',
    },
    children: [
      {
        path: '/',
        name: 'admin-dashboard.new',
        component: () => import('@/views/admin/dashboard/pages/New.vue'),
        meta: {
          action: 'admin-read',
          resource: 'admin-user',
        },
      },
    ],
  },
  {
    path: '/admin/grupo-economico/:id',
    name: 'admin-economicGroup.show',
    component: () => import('@/views/admin/companies/pages/EconomicGroup.vue'),
    meta: {
      action: 'admin-read',
      pageTitle: 'Grupo econômico',
      pageSubtitle: 'Acesse abaixo as matrizes cadastradas neste grupo econômico',
      skipGoToHome: true,
      resource: 'admin-user',
    },
  },
  {
    path: '/admin/grupo-economico/:id/matriz/:idMatriz',
    name: 'admin-economicGroup.matriz.show',
    component: () => import('@/layouts/vertical/LayoutVerticalAssignor.vue'),
    meta: {
      action: 'admin-read',
      resource: 'admin-user',
    },
    children: [
      {
        path: 'dados-gerais',
        name: 'admin-economicGroup.general-data',
        component: () => import('@/views/admin/dashboard/pages/GeneralData.vue'),
        meta: {
          action: 'admin-read',
          resource: 'admin-user',
        },
      },
      {
        path: 'representantes',
        name: 'admin-economicGroup.representatives',
        component: () => import('@/views/admin/dashboard/pages/Representative.vue'),
        meta: {
          action: 'admin-read',
          resource: 'admin-user',
          title: 'Representantes legais',
        },
      },
      {
        path: 'documentos',
        name: 'admin-economicGroup.documents',
        component: () => import('@/views/admin/dashboard/pages/Documents.vue'),
        meta: {
          action: 'admin-read',
          resource: 'admin-user',
          title: 'Análise de documentos',
        },
      },
      {
        path: 'contas-bancarias',
        name: 'admin-economicGroup.bank-accounts',
        component: () => import('@/views/admin/dashboard/pages/BankAccount.vue'),
        meta: {
          action: 'admin-read',
          resource: 'admin-user',
          title: 'Dados bancários',
        },
      },
      {
        path: 'credenciadoras',
        name: 'admin-economicGroup.acquirers',
        component: () => import('@/views/admin/dashboard/pages/Acquirers.vue'),
        meta: {
          action: 'admin-read',
          resource: 'admin-user',
          title: 'Credenciadoras',
          subtitle: 'Selecione abaixo as credenciadoras a serem inseridas',
        },
      },
    ],
  },
  {
    path: '/admin/antecipacoes',
    name: 'admin-antecipacoes.index',
    component: () => import('@/views/admin/antecipacoes/pages/Index.vue'),
    meta: {
      pageTitle: 'Antecipações',
      indexObject: {
        serviceUrl: '/solicitacao_antecipacao/admin',
        fields: [
          {
            label: 'Operação',
            key: 'id',
            sortable: true,
          },
          {
            label: 'Grupo Econômico',
            key: 'grupo_economico',
            exportKey: 'grupo_economico.nome',
            sortable: true,
            formatter: economicGroupNameLink,
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
            formatter: creditSolicitationAdminStatusBadge,
          },
          {
            label: 'A antecipar',
            key: 'valor_liquido',
            formatter: moneyFormatDatatable,
          },
        ],
        actions: [
          {
            label: 'Visualizar',
            icon: 'icon-search',
            action: 'show',
            name: 'admin-antecipacoes.details',
          },
        ],
        filters: [
          {
            category: 'Por periodo',
            fields: [
              {
                label: 'Liquidação',
                key: 'data_liquidacao',
                type: 'date',
              },
            ],
          },
          {
            category: 'Por parâmetro',
            fields: [
              {
                label: 'Status',
                key: 'status',
                type: 'select',
                options: [
                  { label: 'Solicitada', value: '0' },
                  { label: 'Confirmada', value: '1' },
                  { label: 'Enviada CERC', value: '2' },
                  { label: 'Sucesso Webhook', value: '3' },
                  { label: 'Erro Webhook', value: '4' },
                  { label: 'Registrada', value: '5' },
                  { label: 'Depositada', value: '6' },
                  { label: 'Cancelada', value: '-1' },
                  { label: 'Erro Envio CERC', value: '-2' },
                ],
              },
              {
                label: 'Bandeira',
                key: 'credit_card_brand_id',
                type: 'select',
                action: 'common/getGenericOptionList',
                model: 'CreditCardBrand',
                modelLabel: 'name',
                modelValue: 'id',
                options: [],
              },
              {
                label: 'Credenciadora',
                key: 'credenciadora_id',
                type: 'select',
                action: 'common/getGenericOptionList',
                model: 'Credenciadora',
                modelLabel: 'razao_social',
                modelValue: 'id',
                options: [],
              },
            ],
          },
        ],
        editRouteName: 'admin-antecipacoes.details',
      },
      action: 'admin-read',
      resource: 'admin-user',
    },
  },
  {
    path: '/admin/antecipacoes/:id/detalhes',
    name: 'admin-antecipacoes.details',
    component: () => import('@/views/admin/antecipacoes/pages/Details.vue'),
    meta: {
      action: 'admin-read',
      resource: 'admin-user',
    },
  },
  {
    path: '/admin/credenciadoras',
    name: 'admin-credenciadoras.index',
    component: () => import('@/views/admin/acquirers/pages/Index.vue'),
    meta: {
      action: 'admin-read',
      resource: 'admin-user',
      pageTitle: 'Credenciadoras',
      indexObject: {
        datatableTitle: 'Confira abaixo as credenciadoras cadastradas',
      },
    },
  },
  {
    path: '/admin/credenciadoras/novo',
    name: 'admin-credenciadoras.new',
    component: () => import('@/views/admin/acquirers/pages/New.vue'),
    meta: {
      action: 'admin-read',
      resource: 'admin-user',
    },
  },
  {
    path: '/admin/credenciadoras/:id',
    name: 'admin-credenciadoras.show',
    component: () => import('@/views/admin/acquirers/pages/Show.vue'),
    meta: {
      pageTitle: 'Editar credenciadora',
      pageSubtitle: 'Altere abaixo os dados cadastrais da credenciadora',
      skipGoToHome: true,
      action: 'admin-read',
      resource: 'admin-user',
    },
  },
  {
    path: '/admin/operacoes',
    name: 'admin-operations.index',
    component: () => import('@/views/admin/liquidation/pages/Index.vue'),
    meta: {
      action: 'admin-read',
      resource: 'admin-user',
      pageTitle: 'Liquidar operações',
      pageSubtitle: 'Selecione abaixo as operações a serem liquidadas',
      indexObject: {
        serviceUrl: '/solicitacao_antecipacao/pendentes_pagamento',
        showModalOnAction: true,
        showExcelExportButton: true,
        fields: [
          {
            label: '',
            key: 'select',
          },
          {
            label: 'Operação',
            key: 'id',
            sortable: true
          },
          {
            label: 'Grupo Econômico',
            key: 'grupo_economico',
            sortable: true,
            exportKey: 'grupo_economico.nome',
            formatter: economicGroupNameLink,
          },
          {
            label: 'Antecipação',
            key: 'created_at',
            sortable: true,
            formatter: dateTimeFormatter,
          },
          {
            label: 'Status',
            key: 'status',
            sortable: true,
            formatter: creditSolicitationAdminStatusBadge,
          },
          {
            label: 'A antecipar',
            key: 'valor_solicitacao',
            sortable: false,
            formatter: moneyFormatDatatable,
          },
        ],
        actions: [
          {
            label: 'Visualizar',
            icon: 'icon-search',
            action: 'show',
            name: 'OperationDetailModal',
          },
        ],
        filters: [
          {
            category: 'Por periodo',
            fields: [
              {
                label: 'Liquidação',
                key: 'data_liquidacao',
                type: 'date',
              },
            ],
          },
          {
            category: 'Por parâmetro',
            fields: [
              {
                label: 'Status',
                key: 'status',
                type: 'select',
                options: [
                  { label: 'Solicitada', value: '0' },
                  { label: 'Confirmada', value: '1' },
                  { label: 'Enviada CERC', value: '2' },
                  { label: 'Sucesso Webhook', value: '3' },
                  { label: 'Erro Webhook', value: '4' },
                  { label: 'Registrada', value: '5' },
                  { label: 'Depositada', value: '6' },
                  { label: 'Cancelada', value: '-1' },
                  { label: 'Erro Envio CERC', value: '-2' },
                ],
              },
              {
                label: 'Bandeira',
                key: 'credit_card_brand_id',
                type: 'select',
                action: 'common/getGenericOptionList',
                model: 'CreditCardBrand',
                modelLabel: 'name',
                modelValue: 'id',
                options: [],
              },
              {
                label: 'Credenciadora',
                key: 'credenciadora_id',
                type: 'select',
                action: 'common/getGenericOptionList',
                model: 'Credenciadora',
                modelLabel: 'razao_social',
                modelValue: 'id',
                options: [],
              },
            ],
          },
        ],
        actionsForSelectedItems: [
          {
            label: 'Baixar CNAB',
            icon: 'DownloadIcon',
            variant: 'flat-primary',
            disabled: true,
            event: 'baixar-CNAB',
          },
          {
            label: 'Informar pagamento',
            icon: 'DownloadIcon',
            variant: 'primary',
            disabled: true,
            event: 'informar-pagamento',
          },
        ],
      },
    },
  },
  {
    path: '/admin/conciliacao',
    name: 'admin-conciliation.index',
    component: () => import('@/views/admin/conciliation/pages/Index.vue'),
    meta: {
      action: 'admin-read',
      resource: 'admin-user',
      pageTitle: 'Conciliação de URs',
      pageSubtitle: 'Utilize os filtros abaixo para ajudar na seleção das URs de interesse',
    },
  },
]
