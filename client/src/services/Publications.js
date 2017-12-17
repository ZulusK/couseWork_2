import API from '#/API';
import Utils from '#/Utils';

export default {
  load (filter) {
    return API.noAuth().get('/api/v1/publications' + Utils.query(filter));
  }
}
