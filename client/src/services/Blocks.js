import API from '#/API';
import Utils from '#/Utils';

export default {
  get (query) {
    return API.noAuth().get('/api/v1/blocks', +Utils.query(query || {}));
  },
}
