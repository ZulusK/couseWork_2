const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');
const Utils = require('@utils');
const validator = require('@validator');
const config = require('@config');
let User = new Schema({
        email: {
            type: String,
            unique: function () {
                return !Boolean(this.facebook.id);
            },
            required: function () {
                return !Boolean(this.facebook.id)
            },
            validate: {
                validator: validateEmail,
                message: '{VALUE} is not a valid username'
            },
        },
        password: {
            type: String,
            required: function () {
                return !Boolean(this.facebook.id);
            },
            validate: {
                validator: validatePassword,
                message: '{VALUE} is not a valid password'
            },
        },
        facebook: {
            id: {
                type: String,
                unique: true
            }
            ,
            name: {
                type: String
            }
            ,
            avatar: {
                type: String
            }
            ,
            email: {
                type: String
            }
            ,
            tokens: {
                access: {
                    type: String
                }
                ,
                refresh: {
                    type: String
                }
            }
        }
        ,
        salt: {
            type: String
        },
    secrets: {
            access: {
                type: String
            },
            refresh: {
                type: String
            }
    },
        created: {
            type: Date,
            default:
            Date.now
        }
        ,
        isAdmin: {
            type: Boolean,
            default:
                false
        }
    })
;
User.index({email: 1}, {unique: true})
User.plugin(require('mongoose-paginate'));

/**
 * define virtual property, accessToken, generate token
 */
User.virtual('accessToken')
    .get(function () {
        return Utils.tokens.generate('access', this.payloadAccess)
    });

/**
 * define virtual property, refreshToken, generate token
 */
User.virtual('refreshToken')
    .get(function () {
        return Utils.tokens.generate('refresh', this.payloadRefresh)
    });
/**
 * define virtual property, payloadRefresh, contains id of user and his secret
 */
User.virtual('payloadRefresh')
    .get(function () {
        return {
            id: this.id,
            secret: this.secrets.refresh
        }
    });
/**
 * define virtual property, payloadAccess, contains id of user and his secret
 */
User.virtual('payloadAccess')
    .get(function () {
        return {
            id: this.id,
            secret: this.secrets.access
        }
    });

/**
 * define virtual property, credentials, eq. {tokens.access.value, tokens.refresh.value}
 */
User.virtual('credentials')
    .get(function () {
        return {
            access: this.accessToken,
            refresh: this.refreshToken
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
        if (!this.password) {
            this.password = await Utils.crypto.random(32);
        } else {
            this.password = await Utils.crypto.hash(this.password, this.salt);
        }
        // fill tokens by random bytes
        this.generateSecret('access');
        this.generateSecret('refresh');
    }
    next();
})
/**
 * check, is token is valid
 * @param name name of token, eq. 'access' or 'refresh'
 * @param decode string with decoded token
 * @returns {boolean} is token is valid
 */
User.methods.verifyToken = function (name, decode) {
    return decode.secret == this.secrets[name];
}
/**
 * check is token is outdated
 * @param name name of token: access or refresh
 * @returns {boolean} true, if outdated
 */
User.methods.isTokenOutdated = function (name) {
    return Math.round((Date.now() - this.tokens[name].created) / 1000) > config.security.TOKEN_LIFE[name];
}
/**
 * generate new token's secret for user
 * @param name name of token
 */
User.methods.generateSecret = function (name) {
    this.secrets[name] = Utils.crypto.random(32);
}

/**
 * validate email value
 * @param value value of email to validate
 * @returns {boolean} true, if valid
 */
function validateEmail (value) {
    return !this.email.required
        || validator('user', 'email', value);
}

/**
 * validate password value
 * @param value value of password to validate
 * @returns {boolean} true, if valid
 */
function validatePassword (value) {
    return !this.password.required
        || validator('user', 'password', value);
}

module.exports = mongoose.model('User', User);