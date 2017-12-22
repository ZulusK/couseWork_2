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
    code: {
        type: String,
        default: ""
    },
    input: {
        type: [{
            inputType: String,
            check: String,
            field: String,
            value: String
        }],
        default: []
    }
});
Block.pre('save', function (next) {
    this.input.forEach(x => {
            let v = this.input.filter(i => i.value == x.value);
            if (v.length > 1) throw new Error(`Duplicate of input's names find: ${v.value}`);
        }
    )
    next();
})
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
        input: this.input,
        category: this.category,
        type: this.type,
        message0: this.message0,
        previousStatement: this.previousStatement,
        nextStatement: this.nextStatement,
        output: this.output,
        code: this.code,
        tooltip: this.tooltip,
        name: this.name,
        helpUrl: this.helpUrl
    }
}
module.exports = mongoose.model('Block', Block);