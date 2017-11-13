"use strict";
const crypto = require('crypto');

module.exports.crypto = {};

module.exports.crypto.hash = (data) => {
    const hash = crypto.createHmac('sha512', process.env.SALT);
    hash.update(data);
    const value = hash.digest('hex');
    return value;
}

module.exports.crypto.compare = (plainData, hash) => {
    return this.crypto.hash(plainData) === hash;
}

module.exports.throwError = (code, msg, next) => {
    let err = new Error(msg);
    err.status = status;
    next(err);
}