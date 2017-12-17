function convertToURL (v) {
  if (typeof v == 'object' || Array.isArray(v)) {
    return JSON.stringify(v);
  } else {
    return v;
  }
}

function notEmpty (v) {
  if (typeof v == 'object' || Array.isArray(v)) {
    return v.length > 0;
  } else {
    return true;
  }
}
export default {
  query (filter) {
    let query = '?';
    for (let key in filter) {
      if (filter[key] && notEmpty(filter[key]))
        query += `${key}=${convertToURL(filter[key])}&`;
    }
    return query;
  }
}
