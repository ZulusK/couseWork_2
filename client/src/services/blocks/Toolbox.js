import Category from './Category';
import Utils from '#/Utils';

/**
 * @constructor create new Toolbox object
 */
function Toolbox () {
  this.tree = document.createElement('xml');
  this.addCategory(Category.create('Codual', 220))
}

/**
 * return XML-presentation of this object
 * @return {string} string in XML format
 */
Toolbox.prototype.toXML = function () {
  return this.tree;
}

/**
 * append new category to tree
 * @param category
 */
Toolbox.prototype.addCategory = function (category) {
  if (!this.containsCategory(category.getAttribute('name'))) {
    this.tree.appendChild(category);
  }
}
Toolbox.prototype.getCategory = function (name) {
  return Utils.dom.findByTagAndAttribute(this.tree, 'category', 'name', name);
}

Toolbox.prototype.containsCategory = function (name) {
  return Boolean(this.getCategory(name));
}


Toolbox.prototype.removeCategory = function (name) {
  return this.tree.removeChild(this.getCategory(name));
}
export default Toolbox;
