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
userShema.methods.comparePassword = function (password) {
    return utils.crypto.compare(password, this.password);
};
module.exports = mongoose.model('User', userShema);

