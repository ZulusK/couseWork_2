import API from '#/API';
import Utils from '#/Utils';

export default {
  load (filter) {
    return API.noAuth().get('/api/v1/publications' + Utils.query(filter));
  },
  save (data) {
    let form = new FormData();
    for (let key in data) {
      form.append(key, (Array.isArray(data[key]) ? JSON.stringify(data[key]) : data[key]))
    }
    return API.access().post('/api/v1/publications', form);
  }
}
