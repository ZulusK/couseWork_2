function Category (name, color, custom) {
  this.category = [];
  this.attrs = {
    name: name,
    colour: color,
  }
  if (custom) {
    this.attrs.custom = custom;
  }
}

Category.prototype.size = function () {
  return this.category.length;
}
Category.prototype.getBlock = function (id) {
  return this.category.find(x => x.attrs.id == id);
}
Category.prototype.containsBlock = function (id) {
  return Boolean(this.getBlock(id));
}
Category.prototype.removeBlock = function (id) {
  const index = this.category.findIndex(x => x.attrs.id == id);
  if (index >= 0)
    this.category.splice(index, 1)
}

Category.prototype.addBlock = function (block) {
  this.category.push(block)
}


export default Category;
