import API from '#/API';

export default {
  check (path, key, value) {
    return API.noAuth().post(`/api/v1/validate/auth/${path}/${key}`, {value: value});
  },
  fullLogout(){
    return API.access().post('/api/v1/auth/logout');
  },
  login (credentials) {
    return API.basic(credentials.email, credentials.password).post('/api/v1/auth/login');
  },
  loginFacebook () {
    return API.noAuth().post('/api/v1/auth/facebook');
  },
  register (credentials) {
    return API.noAuth().post('/api/v1/auth/register/', credentials);
  },
  validate (path, key, value) {
    return API.noAuth().post(`/api/v1/validate/auth/${path}/${key}`, {value: value});
  },
  checkTokenAccess(){
    return API.access().get('/api/v1/auth/check/access');
  },
  checkTokenRefresh(){
    return API.refresh().get('/api/v1/auth/check/refresh');
  },
  updateAccessToken () {
    return API.refresh().get('/api/v1/auth/token');
  },
}
