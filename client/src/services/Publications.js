import API from '#/API';
import Utils from '#/Utils';

export default {
  load (filter) {
    const query = Utils.query(filter);
    console.log(query)
    return API.noAuth().get('/api/v1/publications' + query);
  },
  loadOne (id) {
    return API.noAuth().get(`/api/v1/publications/${id}`);
  },
  save (data) {
    let form = new FormData();
    for (let key in data) {
      form.append(key, (Array.isArray(data[key]) ? JSON.stringify(data[key]) : data[key]))
    }
    return API.access().post('/api/v1/publications', form);
  },
  remove (id) {
    return API.access().delete(`/api/v1/publications?id=${id}`);
  }
}
