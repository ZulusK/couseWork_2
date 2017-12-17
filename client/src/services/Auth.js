import API from '#/API';

export default {
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
    return API.access().post('api/v1/check/access');
  },
  checkTokenRefresh(){
    return API.refresh().post('api/v1/check/refresh');
  },
  updateAccessToken () {
    return API.refresh().get('/api/v1/auth/token');
  },
}
