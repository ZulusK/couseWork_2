"use strict";

function Node (name, attrs) {
  this.tag = name;
  this.attrs = {};
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      if (attrs[key]) {
        this.attrs[key] = attrs[key];
      }
    })
  }
  this.children = [];
}

Node.prototype.clear = function () {
  this.children = [];
}

Node.prototype.append = function (node) {
  this.children.push(node);
}
Node.prototype.get = function (callback) {
  return this.children.find(callback)
}
Node.prototype.contains = function (callback, value) {
  return Boolean(this.get(callback ? callback : x => x == value));
}
Node.prototype.isEmpty = function () {
  return this.children.length == 0;
}
Node.prototype.attrs2xml = function () {
  let s = "";
  for (let key in this.attrs) {
    s += ` ${key}="${this.attrs[key]}"`;
  }
  return s;
}

Node.prototype.toXML = function () {
  let xml = [];
  xml.push(`<${this.tag}${this.attrs2xml()}>`);
  this.children.forEach(child => {
    xml.push(child.toXML());
  })
  xml.push(`</${this.tag}>`);
  return xml.join('\n');
}
Node.prototype.remove = function (v, callback) {
  const index = this.children.findIndex(callback ? callback : x => x == v);
  if (index < 0) {
    return false;
  } else {
    this.children.splice(index, 1);
    return true;
  }
}
export default Node;
