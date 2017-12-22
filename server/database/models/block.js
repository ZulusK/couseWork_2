"use strict";

const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');
const Utils = require('@utils');
const validator = require('@validator');
const config = require('@config');
let Block = new Schema({
    default: {
        type: Boolean
    },
    primary: {
        type: Boolean,
        default: false,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    category: {
        type: String,
        default: config.IDLE_CATEGORY
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
Block.methods.update = function (args) {
    Object.keys(args).forEach(field => {
        this[field] = args[field];
    })
    return this.save();
}
Block.methods.info = function () {
    return {
        default: this.default,
        id: this.id,
        primary: this.primary,
        category: this.category,
        type: this.type,
        message0: this.message0,
        previousStatement: this.previousStatement,
        nextStatement: this.nextStatement,
        output: this.output,
        tooltip: this.tooltip,
        name: this.name,
        helpUrl: this.helpUrl
    }
}
module.exports = mongoose.model('Block', Block);