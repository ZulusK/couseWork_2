const mongoose = require('mongoose'),
    utils = require('@utils'),
    mongoosePaginate = require('mongoose-paginate'),
    usersDB = require('@CodualDB/controllers/controller.user');


const userSchema = mongoose.Schema({
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
userSchema.index({'username': 1}, {unique: true});
userSchema.plugin(mongoosePaginate);

userSchema.pre('save', async function (next) {
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
const allowed_fields = Object.keys(userSchema.paths);
const blocked_fields = ['_id', 'id', 'publications'];


userSchema.methods.set = function (values, adminAccess) {
    for (let field_name in values) {
        //check, field name is correct
        if (allowed_fields.indexOf(field_name) >= 0 && blocked_fields.indexOf(field_name) < 0) {
            if (field_name === 'access' && !adminAccess) {
                throw "Access denied";
            } else if (field_name === 'password' && !usersDB.verifyPassword(values[field_name])) {
                throw "Invalid password value";
            } else if (field_name === 'name' && !usersDB.verifyName(values[field_name])) {
                throw "Invalid name value";
            } else if (field_name === 'username' && !usersDB.verifyUsername(values[field_name])) {
                throw "Invalid username value";
            } else {
                console.log(field_name, '=', this[field_name], '->', values[field_name]);
                this[field_name] = values[field_name];
            }
        }
    }
    return this.save();
}

userSchema.methods.removePublication = async function (publication) {
    if (publication.isAuthor(this)) {
        publication.removeAuthor();
        let index = this.publications.indexOf(publication._id);
        if (index >= 0) {
            this.publications.splice(index, 1);
        }
        this.save();
    } else {
        throw `${this.access} this user ${this.username} is not author of publication${publication.title}`;
    }
}

userSchema.methods.addPublication = function (publicationid) {
    if (this.publications.indexOf(publicationid) < 0) {
        this.publications.push(publicationid);
        return this.save();
    } else {
        throw `publication${publicationid} is already exist in ${this._id}`;
    }
}

userSchema.methods.comparePassword = function (password) {
    return utils.crypto.compare(password, this.password);
};
module.exports = mongoose.model('User', userSchema);

