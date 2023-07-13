import http from './http';

class Crud {
  index(payload) {
    return http.get(payload.path, { params: payload.data });
  }
}

export default new Crud();