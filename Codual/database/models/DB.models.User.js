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

userShema.methods.comparePassword = function (password) {
    return utils.crypto.compare(password, this.password);
};
module.exports = mongoose.model('User', userShema);

