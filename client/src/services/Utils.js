export default {
  query (filter) {
    let query = '?';
    for (let key in filter) {
      if (filter[key] && (filter[key].length > 0))
        query += `${key}=${filter(JSON.stringify(filter[key]))}&`;
    }
    return query;
  }
}
