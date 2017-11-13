"use strict";
const crypto = require('crypto'),
    bcrypt = require('bcrypt');

module.exports.crypto = {};

module.exports.crypto.hash = (data) => {
    return bcrypt.hash(data, 10);
}

module.exports.crypto.compare = (plainData, hash) => {
    return bcrypt.compare(plainData, hash);
}

module.exports.throwError = (code, msg, next) => {
    let err = new Error(msg);
    err.status = status;
    next(err);
}