import API from '@/services/API'

export default {
  find (credentials) {
    return API().post('api/v1/publications/find', credentials);
  },
  index (page, limit) {
    return API().post('api/v1/publications/find', {target: {}, page: page, limit: limit || 10, sort: {createdOn: 1}});
  },
  create (args) {
    return API().post('api/v1/publications/create', args);
  },
  get (id) {
    return API().post('api/v1/publications/find', {target: {id: id}});
  }
}
