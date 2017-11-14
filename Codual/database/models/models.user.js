const mongoose = require('mongoose'),
    utils = require('@utils');


const userShema = mongoose.Schema({
    name: {type: String, required: true},
    contact: {type: String, default: '#'},
    access: {type: String, default: "user"},
    publications: {type: [mongoose.Schema.Types.ObjectId], default: []},
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
userShema.index({'username': 1}, {unique: true});

userShema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            this.password = await utils.crypto.hash(this.password);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        return next();
    }
});
const allowed_fields = Object.keys(userShema.paths);
const blocked_fields = ['_id', 'id', 'publications'];

userShema.methods.set = function (values, adminAccess) {
    for (let field_name in values) {
        //check, name os correct
        if (allowed_fields.indexOf(field_name) >= 0 && blocked_fields.indexOf(field_name) < 0) {
            if (field_name !== 'access' || adminAccess) {
                console.log(field_name, '=', this[field_name], '->', values[field_name]);
                this[field_name] = values[field_name];
            }
        }
    }
    return this.save();
}

userShema.methods.removePublication = async function (publication) {
    if (publication.isAuthor(this)) {
        publication.removeAuthor();
        let index = this.publications.indexOf(publication._id);
        if (index >= 0) {
            this.publications.splice(index, 1);
        }
        this.save();
    } else {
        throw `this user${this.username} is not author of publication${publication.title}`;
    }
}

userShema.methods.addPublication = function (publication) {
    if (this.publications.indexOf(publication._id) < 0) {
        this.publications.push(publication._id);
    } else {
        throw `publication${publication.title} is already exist in ${this._id}`;
    }
}

userShema.methods.comparePassword = function (password) {
    return utils.crypto.compare(password, this.password);
};
module.exports = mongoose.model('User', userShema);

