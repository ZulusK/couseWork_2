import json2xml from 'json2xml';
import Category from './Category';

/**
 * @constructor create new Toolbox object
 */
function Toolbox () {
  this.tree = {}
  this.tree.xml = [new Category('Codual', 0)];
}

/**
 * return XML-presentation of this object
 * @return {string} string in XML format
 */
Toolbox.prototype.toXML = function () {
  return json2xml(this.tree, {attributes_key: 'attrs'});
}
/**
 * return JSON-presentation of this object
 * @return {string} string in JSON format
 */
Toolbox.prototype.toJSON = function () {
  return JSON.stringify(this.tree);
}

/**
 * append new category to tree
 * @param category
 */
Toolbox.prototype.addCategory = function (category) {
  if (this.tree.xml[0].attrs.name == 'Codual') {
    this.tree.xml.pop();
  }
  this.tree.xml.push(category)
}
Toolbox.prototype.getCategory = function (name) {
  return this.tree.xml.find(x => x.attrs.name == name);
}

Toolbox.prototype.containsCategory = function (name) {
  return Boolean(this.getCategory(name));
}
Toolbox.prototype.isEmpty = function () {
  return this.tree.xml.length == 0;
}

Toolbox.prototype.usePlaceholder = function () {
  this.tree.xml.push(new Category('Codual', 0));
}

Toolbox.prototype.removeCategory = function (name) {
  const index = this.tree.xml.findIndex(x => x.attrs.name == name);
  if (index >= 0) {
    this.tree.xml.splice(index, 1);
    if (this.isEmpty()) {
      this.usePlaceholder()
    }
    return true;
  }
}
export default Toolbox;
