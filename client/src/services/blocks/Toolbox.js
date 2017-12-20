import json2xml from 'json2xml';

/**
 * @constructor create new Toolbox object
 */
function Toolbox () {
  this.tree = {}
  this.tree.xml = [];
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
  this.tree.xml.push(category)
}
Toolbox.prototype.getCategory = function (name) {
  return this.tree.xml.find(x => x.attrs.name == name);
}

Toolbox.prototype.removeCategory = function (name) {
  const index = this.tree.xml.findIndex(x => x.name == name);
  if (index >= 0) {
    return this.tree.xml.splice(index, 1);
  }
}
export default Toolbox;
