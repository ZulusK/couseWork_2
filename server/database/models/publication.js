const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');
const Utils = require('@utils');
const validator = require('@validator');
const config = require('@config');
let Publication = new Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validate('title', value, this)
            },
            message: '{VALUE} is not a title'
        },
    },
    author: {
        type: Schema.ObjectId,
    },
    text: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
    tags: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        default: ""
    },
    difficult: {
        type: Number,
        default: 1
    },
    created: {
        type: Date,
        default: Date.now
    },
    edited: {
        type: Date,
        default: Date.now
    },
    views: {
        type: Number,
        default: 0
    }
});


Publication.plugin(require('mongoose-paginate'));
Publication.methods.update = function (args) {
    Object.keys(args).forEach(field => {
        this[field] = args[field];
    })
    return this.save();
}
Publication.methods.increaseViews = function () {
    this.views++;
    return this.save();
}
/**
 * on models saving, hashed password and create salt
 */
Publication.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.edited = Date.now();
    }
    next();
})

/**
 * validate value in user object
 * @param field name of field to validate
 * @param value value to validate
 * @param subject object to get fields
 * @returns {boolean} true, if valid
 */
function validate (field, value, subject) {
    return validator('publication', field, value);
}

Publication.methods.info = function () {
    return {
        id: this.id,
        logo: this.logo,
        author: this.author,
        title: this.title,
        description: this.description,
        text: this.text,
        created: this.created,
        edited: this.edited,
        tags: this.tags,
        difficult: this.difficult
    }
}
module.exports = mongoose.model('Publication', Publication);