"use strict";
import Node from './tree/Node';

function VPL (categories) {
  this.xml = new Node('xml');
  this.xml.append(new Node('category', {name: 'Codual'}))
  if (categories) {
    this.buildTree(categories);
  }
}

VPL.prototype.toXML = function () {
  return this.xml.toXML();
}

function compareBy (field, value) {
  return (node) => node.attrs[field] == value;
}

VPL.prototype.buildTree = function (categories) {
  categories.forEach(c => {
    let cNode = this.xml.get(compareBy('name', c.name));
    // if this is new category, create it and append
    if (!cNode) {
      cNode = this.createCategory(c)
      this.xml.append(cNode);
    }
    // append all blocks from category
    c.blocks.forEach(b => {
      cNode.append(this.createBlock(b));
    });
  })
}

VPL.prototype.createCategory = function (category) {
  return new Node('category', {name: category.name, colour: category.color, id: category.id});
}

VPL.prototype.createBlock = function (block) {
  return new Node('block', {type: block.type, id: block.id});
}

export {VPL};
export {Node};
