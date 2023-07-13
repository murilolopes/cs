import Vue from 'vue';
import store from '@/store';

const NetworkError = Object.freeze({
  title: 'Erro de rede',
  text: 'Um erro ocorreu ao entrar em contato com o servidor. Tente novamente.',
  icon: 'error',
});

const ExpiredAccessTokenError = Object.freeze({
  title: 'Token de Acesso expirado',
  text: 'Seu Token de Acesso expirou. Por favor, faça login novamente!',
  icon: 'warning',
});

const ServerError = Object.freeze({
  title: 'Erro no servidor',
  text: 'Um erro ocorreu no servidor. Entre em contato com a adminstração.',
  icon: 'error',
});

const ValidationError = Object.freeze({
  title: 'Erro de validação',
  text: 'Um erro ocorreu ao validar os dados. Por favor, tente novamente.',
  icon: 'warning',
});

const ForbiddenError = Object.freeze({
  title: 'Acesso negado',
  text: 'Vocé não tem permissão para realizar esta ação.',
  icon: 'warning',
});

const StandardError = { title: 'Ops!', text: 'Um erro ocorreu. Por favor, tente novamente.', icon: 'error' };

const handleError = async (error, options = {}) => {
  // Log the error to the console
  console.error(error);

  const { title, text, icon } = options;
  const { data, status } = error.response;
  if ([422, 500, 503].includes(status)) {
    const errorString = data.map((obj) => `<li>${obj}</li>`).join('');
    await Vue.prototype.$swal({
      title,
      html: `<ul class="text-left" style="list-style-type:none">${errorString}</ul>`,
      icon,
    });
  } else {
    // Show a user-friendly error message to the user
    await Vue.prototype.$swal({
      title,
      text,
      icon,
      ...options,
    });
  }
};

export default async function handleErrors(error) {
  const {
    message,
    status,
    config: { url },
    response,
  } = error;
  if (message === 'Network Error') {
    await handleError(error, NetworkError);
  } else {
    switch (status || response.status) {
      case 401:
        if (url !== '/auth/login') {
          await handleError(error, ExpiredAccessTokenError);
          store.dispatch('auth/logout');
        }
        break;
      case 403:
        if (url !== '/auth/login') await handleError(error, ForbiddenError);
        break;
      case 422:
        if (url == '/auth/login') break;
        if (url.split('/').pop() == 'complementar_cadastro') break; //TODO: Descobrir o motivo do error handler não retornar corretamente para esta rota no componente CompanyCard
        await handleError(error, ValidationError);
        break;
      case 500:
        await handleError(error, ServerError);
        break;
      default:
        await handleError(error, StandardError);
        break;
    }
  }
}
