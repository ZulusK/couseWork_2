import Node from './Node';

/**
 * @constructor create new Toolbox object
 */
function Toolbox () {
  this.tree = Node.create('xml', {});
  Node.append(this.tree, Node.create('category', {name: 'Codual', colour: "220"}));
}

Toolbox.prototype.append = function (node) {
  return Node.append(this.tree, node)
}

Toolbox.prototype.get = function (tag, field, value) {
  return Node.get(this.tree, tag, field, value);
}
Toolbox.prototype.toXML = function () {
  return this.tree;
}
Toolbox.prototype.contains = function (tag, field, value) {
  return Boolean(this.get(tag, field, value));
}
Toolbox.prototype.remove = function (child) {
  return Node.remove(this.tree, child);
}
export default Toolbox;
