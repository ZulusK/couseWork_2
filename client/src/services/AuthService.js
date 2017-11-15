import API from '@/services/API'

export default {
  signup (credentials) {
    return API().post('api/v1/auth/signup', credentials);
  },
  login (credentials) {
    return API().post('api/v1/auth/login', credentials);
  }
}
