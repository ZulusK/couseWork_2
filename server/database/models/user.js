const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');
const Utils = require('@utils');
const validator = require('@validator');

let User = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (value) => validator('user', 'username', value),
            message: '{VALUE} is not a valid username'
        },
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator('user', 'password', value),
            message: '{VALUE} is not a valid password'
        },
    },
    facebookId: {
        type: String,
    },
    salt: {
        type: String
    },
    tokens: {
        access: {
            value: {
                type: String,
                default: '',
            },
            created: {
                type: Date
            }
        },
        refresh: {
            value: {
                type: String,
                default: '',
            },
            created: {
                type: Date
            }
        },
    },
    created: {
        type: Date,
        default: Date.now
    }
});
User.index({username: 1}, {unique: true})
User.plugin(require('mongoose-paginate'));

User.virtual('accessToken')
    .set(function (value) {
        this.tokens.access.created = Date.now();
        this.tokens.access.value = value;
    })
    .get(function () {
        return this.tokens.access.value;
    });
User.virtual('refreshToken')
    .set(function (value) {
        this.tokens.refresh.created = Date.now();
        this.tokens.refresh.value = value;
    })
    .get(function () {
        return this.tokens.refresh.value;
    });

User.virtual('credentials')
    .get(function () {
        return {
            access: this.tokens.access.value,
            refresh: this.tokens.refresh.value,
        }
    });
/**
 * compare, is this user, has such password
 * @param password plain string with string
 * @returns {boolean} is the password used by the user
 */
User.methods.comparePasswords = function (password) {
    return Utils.crypto.compare(password, this.password, this.salt);
}
/**
 * on models saving, hashed password and create salt
 */
User.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.salt = await Utils.crypto.random(8);
        this.password = await Utils.crypto.hash(this.password, this.salt);
        // fill tokens by random bytes
        this.generateToken('access');
        this.generateToken('refresh');
    }
    next();
})
/**
 * check, is token is valid
 * @param name name of token, eq. 'access' or 'refresh'
 * @param token string with token's
 * @returns {boolean} is token is valid
 */
User.methods.verifyToken = function (name, token) {
    return this[name + 'Token'] == token;
}
/**
 * generate new token for user
 * @param name name of token
 */
User.methods.generateToken = function (name) {
    this[name + 'Token'] = Utils.crypto.random(32);
}
module.exports = mongoose.model('User', User);