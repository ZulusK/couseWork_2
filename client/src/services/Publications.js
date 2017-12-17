import API from '#/API';

export default {
  load (filter) {
    let query = '?';
    for (let key in filter) {
      if (filter[key] && (filter[key].length > 0))
        query += `${key}=${filter(JSON.stringify(filter[key]))}&`;
    }
    return API.noAuth().get('/api/v1/publications' + query);
  }
}
