import API from '#/API';
import Utils from '#/Utils';

let category = {
  put (id, args) {
    return API.access().put(`/api/v1/code/categories/${id}`, args);
  },
  create (args) {
    return API.access().post(`/api/v1/code/categories`, args);
  },
  delete (id) {
    return API.access().delete(`/api/v1/code/categories/${id}`);
  }
}

export default {
  get (query) {
    return API.noAuth().get('/api/v1/code', +Utils.query(query || {}));
  },
  category: category,
}
