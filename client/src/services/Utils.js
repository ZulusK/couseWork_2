import commonmark from 'commonmark';
import Globals from '#/globals';

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
  resolveImageURL(address){
    if(address.startsWith('/api/v1/res')){
      return  Globals.ROOT_URL+address;
    }else{
      return address;
    }
  },
  converToURL (obj) {
    return convertToURL(obj)
  },
  /**
   * pass filter args to URL-decoded string
   * @param filter object with args
   * @return {string} URL
   */
  query (filter) {
    let query = '?';
    for (let key in filter) {
      if (filter[key] && notEmpty(filter[key]))
        query += `${key}=${convertToURL(filter[key])}&`;
    }
    return query;
  },
  md: {
    reader: new commonmark.Parser(),
    writer: new commonmark.HtmlRenderer({safe: true}),
    /**
     * render string as Markdown
     * @param text text to render
     */
    render (text) {
      var parsed = this.reader.parse(text);
      return this.writer.render(parsed); // result is a String
    }
  },
}

