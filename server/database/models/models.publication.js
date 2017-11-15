const mongoose = require('mongoose'),
    utils = require('../../Utils'),
    mongoosePaginate = require('mongoose-paginate');


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
    tags: [String],
    imageURL: String
});
publictionShema.plugin(mongoosePaginate);

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
    next();
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
    return this.author == user.id;
};


const allowed_fields = Object.keys(publictionShema.paths);

const blocked_fields = ['_id', 'id', 'editedOn', 'createdOn', 'views'];

publictionShema.methods.set = function (values, adminAccess) {
    for (let field_name in values) {
        //check, name os correct
        if (allowed_fields.indexOf(field_name) >= 0 && blocked_fields.indexOf(field_name) < 0) {
            console.log(field_name, '=', this[field_name], '->', values[field_name]);
            this[field_name] = values[field_name];
        }
    }
    return this.save();
}


module.exports = mongoose.model('Publication', publictionShema);
