const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');
const Utils = require('@utils');
const validator = require('@validator');
const config = require('@config');
let Category = new Schema({
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

Category.methods.info = function () {
    return {
        id: this.id,
        name: this.name,
        color: this.color,
    }
}
module.exports = mongoose.model('Category', Category);