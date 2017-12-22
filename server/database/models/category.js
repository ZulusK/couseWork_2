const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');
const Utils = require('@utils');
const validator = require('@validator');
const config = require('@config');
let Category = new Schema({
    primary: {
        type: Boolean,
        default: false,
    },
    custom:{
        type:String,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    color: {
        type: String,
        default: "123"
    },
});
Category.plugin(require('mongoose-paginate'));
Category.index({name: 1}, {unique: true});
Category.methods.update = function (args) {
    Object.keys(args).forEach(field => {
        this[field] = args[field];
    })
    return this.save();
}

Category.methods.info = function () {
    return {
        id: this.id,
        name: this.name,
        color: this.color,
        custom:this.custom
    }
}
module.exports = mongoose.model('Category', Category);