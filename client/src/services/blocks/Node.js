import Utils from '#/Utils';

let Node = {}
Node.create = function (name, args) {
  let node = document.createElement(name)
  for (let key in args) {
    if (args[key])
      node.setAttribute(key, args[key])
  }
  return node;
}
Node.isEmpty = function (node) {
  return !Boolean(node.firstChild);
}
Node.append = function (parent, child) {
  parent.appendChild(child);
}

Node.contains = function (parent, tag, field, value) {
  return Boolean(Node.get(parent, tag, field, value));
}

Node.get = function (parent, tag, field, value) {
  return Utils.dom.findByTagAndAttribute(parent, tag, field, value)
}
Node.remove = function (parent, child) {
  return parent.removeChild(child);
}
export default Node;
