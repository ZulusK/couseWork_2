import API from '#/API';
import Utils from '#/Utils';

let category = {
  put (id, args) {
    return API.access().put(`/api/v1/code/categories/${id}`, args);
  }
}

export default {
  get (query) {
    return API.noAuth().get('/api/v1/code', +Utils.query(query || {}));
  },
  category: category,
}
