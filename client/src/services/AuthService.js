import API from '@/services/API'

export default {
  signup (credentials) {
    return API().post('api/v1/users/signup', credentials);
  }
}
