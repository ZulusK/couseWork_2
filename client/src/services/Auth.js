import API from '#/API';

export default {
  login (credentials) {
    return API.basic(credentials.email, credentials.password).post('/api/v1/auth/login');
  },
  register (credentials) {
    return API.noAuth().post('/api/v1/auth/register/', credentials);
  },
  check (path, key, value) {
    return API.noAuth().post(`/api/v1/validate/auth/${path}/${key}`, {value: value});
  },
  refresh () {
    return API.refresh().get('/api/v1/auth/token');
  }
}
