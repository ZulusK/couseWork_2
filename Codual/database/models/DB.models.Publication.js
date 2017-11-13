const mongoose = require('mongoose'),
    utils = require('../../Utils');


const publictionShema = mongoose.Schema({
    Title: {type: String, required: true},
    createdOn: Date,
    editedOn: Date,
    views: Number,
    difficult: Number,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    description: String,
    tags: [String]
});

publictionShema.pre('save', function (next) {
    if (this.isNew) {
        this.Date = Date.now().toLocaleString();
    }
    next();
});
publictionShema.pre('update', function (next) {
    this.editedOn = new Date().now().toLocaleString();
    next();
})

publictionShema.methods.isAuthor = function (user) {
    return this.author.id === user.id;
};

module.exports = mongoose.model('Publication', publictionShema);
