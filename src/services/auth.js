import http from './http';

class Auth {
  login(payload) {
    return http.post('/auth/login', { auth_user: payload });
  }

  createUser(payload) {
    return http.post('backoffice/cedente_user', payload);
  }

  userData() {
    return http.get('/backoffice/empresas/current');
  }

  sendResetPasswordEmail(payload) {
    return http.post('/password_reset', { user: payload });
  }

  validateResetToken(payload) {
    return http.get(`/password_reset/${payload}`);
  }

  newPassword(payload) {
    return http.put(`/password_reset/${payload.token}`, {password: payload});
  }
}

export default new Auth();
