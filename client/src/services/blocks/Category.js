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

Category.prototype.addBlock = function (block) {
  this.category.push(block)
}


export default Category;
