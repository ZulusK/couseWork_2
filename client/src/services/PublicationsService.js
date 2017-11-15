import API from '@/services/API'

export default {
  find (credentials) {
    return API().post('api/v1/publications/find', credentials);
  },
  index () {
    return API().post('api/v1/publications/find', {target: {}});
  },
  create (args) {
    return API().post('api/v1/publications/create', args);
  }
}
