import Utils from '#/Utils';

let Category = {}
Category.create = function (name, color, custom) {
  let c = document.createElement('category')
  c.setAttribute('name', name);
  c.setAttribute('colour', color);
  if (custom) {
    c.setAttribute('custom', custom)
  }
  return c;
}
Category.addBlock = function (cat, block) {
  if (!this.containsBlock(cat, block.getAttribute('type'))) {
    cat.appendChild(block);
    return true;
  } else {
    return false;
  }
}

Category.getBlock = function (cat, type) {
  return Utils.dom.findByTagAndAttribute(cat, 'block', 'type', type);
}

Category.containsBlock = function (cat, type) {
  return Boolean(this.getBlock(cat, type));
}

// Category.prototype.removeBlock = function (id) {
//   const index = this.category.findIndex(x => x.attrs.id == id);
//   if (index >= 0)
//     this.category.splice(index, 1)
// }

// Category.prototype.addBlock = function (block) {
//   this.category.push(block)
// }


export default Category;
