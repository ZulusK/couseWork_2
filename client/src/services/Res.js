import API from '#/API';

export default {
  save (file) {
    let form = new FormData();
    form.append('file', file);
    return API.access().post('/api/v1/res', form);
  },
  delete (id) {
    return API.access().delete(`/api/v1/res/${id}`);
  }
}
