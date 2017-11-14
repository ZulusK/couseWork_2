const mongoose = require('mongoose'),
    utils = require('../../Utils');


const publictionShema = mongoose.Schema({
    title: {type: String, required: true},
    createdOn: Date,
    editedOn: Date,
    views: {type: Number, default: 0},
    difficult: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId
    },
    text: {
        type: String,
        required: true
    },
    description: String,
    tags: [String]
});


publictionShema.methods.removeAuthor = async function () {
    this.author = null;
    return this.save();
}
publictionShema.methods.setAuthor = async function (newAuthor) {
    this.author = newAuthor.id();
    return this.save();
}

publictionShema.pre('remove', function (next) {
    console.log('remove publications', this.title, this._id);
});

publictionShema.pre('save', function (next) {
    if (this.isNew) {
        this.createdOn = Date.now().toLocaleString();
        this.editedOn = Date.now().toLocaleString();
    } else {
        this.editedOn = Date.now().toLocaleString();
    }
    next();
});

publictionShema.methods.isAuthor = function (user) {
    return this.author.id === user.id;
};

module.exports = mongoose.model('Publication', publictionShema);
