"use strict";
import Node from './tree/Node';

function VPL (categories) {
  this.xml = new Node('xml');
  this.xml.append(new Node('category', {name: 'Codual'}))
  if (categories) {
    this.buildTree_default(categories);
  }
}

VPL.prototype.toXML = function () {
  return this.xml.toXML();
}

VPL.prototype.compareBy = function (field, value) {
  return (node) => node.attrs[field] == value;
}

VPL.prototype.get = function (callback) {
  return this.xml.get(callback);
}

VPL.prototype.buildTree_default = function (categories) {
  categories.forEach(c => {
    let cNode = this.xml.get(this.compareBy('name', c.name));
    // if this is new category, create it and append
    if (!cNode) {
      cNode = this.createCategory(c)
      this.xml.append(cNode);
    }
    // append all blocks from category
    c.blocks.forEach(b => {
      if (b.default)
        cNode.append(this.createBlock(b));
    });
  })

}
VPL.prototype.buildTree = function (categories) {
  categories.forEach(c => {
    let cNode = this.xml.get(this.compareBy('name', c.name));
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

VPL.prototype.registerBlock = function (block) {
  Blockly.Blocks[block.type] = {
    init: function () {
      //add inputs
      block.input.forEach(i => {
        if (i.inputType == 'statement') {
          this.appendStatementInput(i.value)
            .setCheck(i.check)
            .appendField(i.field)
        } else {
          this.appendValueInput(i.value)
            .setCheck(i.check)
            .appendField(i.field)
        }
      })
      this.appendValueInput("DEFAULT")
        .setCheck("Boolean")
        .appendField("Bool");
      this.setTooltip(block.tooltip || "");
    }
  }
  Blockly.JavaScript[block.type] = function (b) {
    return block.code || "";
  }
}

VPL.prototype.createBlock = function (block) {
  if (!block.primary) {
    this.registerBlock(block);
  }
  return new Node('block', {type: block.type, id: block.id});
}

VPL.prototype.append = function (node) {
  this.xml.append(node);
}
VPL.prototype.remove = function (node) {
  return this.xml.remove(node)
}
export {VPL};
export {Node};
