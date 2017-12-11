const crypto = require('crypto');

exports.crypto = {
    /**
     * get hash of string, with this salt
     * @param plainData plain string to hashed
     * @param salt salt for hashing
     * @returns {String} hex-string with hashed data
     */
    hash: (plainData, salt) => {
        return crypto
            .createHmac('sha512', salt)
            .update(plainData)
            .digest('hex');
    },
    /**
     * Compare two strings, plain and hashed
     * @param plainData plain string to compare
     * @param hash hashed string to compare
     * @param salt salt for crypting
     * @returns {boolean} is two strings are equals
     */
    compare: (plainData, hash, salt) => {
        return this.crypto.hash(plainData, salt) === hash;
    },
    /**
     * return random generated string
     * @param length count of bytes in string
     * @returns {string} random generated string
     */
    random: (length) => {
        return crypto
            .randomBytes(length)
            .toString('base64');
    }
}

exports.errors = {
    InvalidRequesDatatError (msg) {
        return {
            name: 'InvalidRequesDatatError',
            message: msg
        }
    }
}
exports.sendError = (res, code, msg) => {
    return res.status(code).json({success: false, message: msg}).end();
}