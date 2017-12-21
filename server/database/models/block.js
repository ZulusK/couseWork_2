const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');
const Utils = require('@utils');
const validator = require('@validator');
const config = require('@config');
let Block = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        default: "Codual"
    },
    type: {
        type: String,
        required: true,
        unique: true,
    },
    message0: {
        type: String,
        default: ""
    },
    previousStatement: {
        type: String
    },
    nextStatement: {
        type: String
    },
    output: {
        type: String,
    },
    tooltip: {
        type: String,
        default: ""
    },
    color: {
        type: String,
        default: "160"
    },
    helpUrl: {
        type: String,
        default: ""
    },
    code: {
        type: String
    }
});
Block.plugin(require('mongoose-paginate'));
Block.index({type: 1}, {unique: true});

Block.methods.info = function () {
    return {
        id: this.id,
        category: this.category,
        type: this.type,
        message0: this.message0,
        previousStatement: this.previousStatement,
        nextStatement: this.nextStatement,
        output: this.output,
        tooltip: this.tooltip,
        color: this.color,
        helpUrl: this.helpUrl
    }
}
module.exports = mongoose.model('Block', Block);