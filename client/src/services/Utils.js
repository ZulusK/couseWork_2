import commonmark from 'commonmark';
import Globals from '#/globals';
import {Node, Toolbox} from '#/blocks/CodualBlocks';


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

let dom = {
  findByTagAndAttribute (tree, tag, attrname, v) {
    var All = tree.getElementsByTagName(tag);
    for (var i = 0; i < All.length; i++) {
      if (All[i].getAttribute(attrname) == v) {
        return All[i];
      }
    }
  }
}
let blocks = {
  createBlock (b) {
    return Node.create('block', {type: b.type, id: b.id});
  },
  createCategory (c) {
    return Node.create('category', {name: c.name, colour: c.color, custom: c.custom});
  },
  buildFullCategory (category) {
    let c = Node.create('category',
      {name: category.name, colour: category.color, custom: category.custom}
    );
    for (let block of category.items) {
      Node.append(c, this.createBlock(block));
    }
    return c;
  },
  buildDefaultCategory (category) {
    let c = Node.create('category',
      {name: category.name, colour: category.color, custom: category.custom}
    );
    for (let block of category.items) {
      if (block.default) {
        Node.append(c, this.createBlock(block));
      }
    }
    return c;
  },
  buildDefaultTree (categories) {
    let toolbox = new Toolbox();
    for (let category of categories) {
      toolbox.append(this.buildDefaultCategory(category));
    }
    return toolbox;
  },
}

export default {
  resolveImageURL (address) {
    if (address.startsWith('/api/v1/res')) {
      return Globals.ROOT_URL + address;
    } else {
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
  dom: dom,
  blocks: blocks,

}

