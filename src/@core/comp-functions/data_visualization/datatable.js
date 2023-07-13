export const moneyFormat = (value, minimumFractionDigits = 2) => {
  if (!value) return 'R$ 0,00';

  return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits });
};

export const moneyFormatDatatable = (value, key, row, minimumFractionDigits = 2) => {
  if (!value) return 'R$ 0,00';

  return parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits });
};

export const prazoFormatter = (value) => {
  if (!value) return '';

  return `${value} dias`;
};

export const percentageFormatter = (value) => {
  if (!value) return '';

  return `${parseFloat(value).toFixed(2)}%`.replace('.', ',');
};

export const dateFormatter = (value) => {
  if (!value) return '';

  const splittedDate = value.split('-');
  let year = splittedDate[0];
  let month = splittedDate[1];
  let day = splittedDate[2];
  return `${day}/${month}/${year}`;
};

export const dateTimeFormatter = (value) => {
  if (!value) return '';
  const date = new Date(value);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return date.toLocaleString('pt-BR', options);
};

export const creditSolicitationAdminStatusBadge = (value) => {
  if (!value) return '';

  const variant = {
    solicitada: 'warning',
    enviada_cerc: 'warning',
    erro_webhook: 'danger',
    sucesso_webhook: 'info',
    confirmado: 'success',
    falha_registro: 'danger',
    registrada: 'dark',
    depositada: 'success',
    baixada: 'success',
  };

  const status = {
    solicitada: 'Processando',
    enviada_cerc: 'Processando',
    erro_webhook: 'Falha ao validar contrato',
    sucesso_webhook: 'Aguardando confirmação do Cliente',
    confirmado: 'Confirmado pelo cliente',
    falha_registro: 'Falha ao registrar contrato',
    registrada: 'Liberado para pagamento',
    depositada: 'Antecipação realizada',
    baixada: 'Baixada',
  };

  return `<span class="badge badge-light-${variant[value]} border-${variant[value]} badge-pill">${status[value]}</span>`;
};

export const creditSolicitationAssignorStatusBadge = (value) => {
  if (!value) return '';

  const variant = {
    solicitada: 'warning',
    enviada_cerc: 'warning',
    erro_webhook: 'danger',
    erro_envio_cerc: 'danger',
    sucesso_webhook: 'info',
    confirmado: 'success',
    falha_registro: 'danger',
    registrada: 'warning',
    depositada: 'success',
    baixada: 'success',
  };

  const status = {
    solicitada: 'Processando',
    enviada_cerc: 'Processando',
    erro_webhook: 'Falha na operação',
    erro_envio_cerc: 'Falha na operação',
    sucesso_webhook: 'Aguardando sua confirmação',
    confirmado: 'Aguardando confirmação da registradora',
    falha_registro: 'Falha na operação',
    registrada: 'Liberado para pagamento',
    depositada: 'Antecipação realizada',
    baixada: 'Antecipação realizada',
  };

  return `<span class="badge badge-light-${variant[value]} border-${variant[value]} badge-pill">${status[value]}</span>`;
};

export const cnpj = (value) => {
  if (!value) return '';

  return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
};

export const urStatusBadge = (value) => {
  if (!value) return '';

  const variant = {
    baixada: 'success',
    contratada: 'warning',
    cancelada: 'danger',
  };

  const status = {
    baixada: 'Baixada',
    contratada: 'Pendente',
    cancelada: 'Cancelada',
  };

  return `<span class="badge badge-light-${variant[value]} border-${variant[value]} badge-pill">${status[value]}</span>`;
};

export const documentationStatusBadge = (value) => {
  if (!value) return '';

  const variant = {
    nao_enviado: { class: 'dark', text: 'Não enviado' },
    em_validacao: { class: 'warning', text: 'Aguardando análise' },
    aprovado: { class: 'success', text: 'Aprovado' },
    reprovado: { class: 'danger', text: 'Reprovado' },
  };

  return `<span class="badge badge-light-${variant[value]['class']}
								border-${variant[value]['class']} badge-pill">${variant[value]['text']}
					</span>`;
};

export const economicGroupNameLink = (value) => {
  return `<a href="/admin/grupo-economico/${value.id}">${value.nome}<a/>`;
};
