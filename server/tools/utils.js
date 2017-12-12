const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const config = require('@config');
const fs = require('fs-promise');
const commonmark = require('commonmark');
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
            .randomBytes(length + 1)
            .toString('base64').substr(0, length);
    }
}
exports.tokens = {
    algorithm: 'HS256',
    /**
     * generate new token, with specified name and data
     * @param name on of 'access' or 'refresh'
     * @param data data to store in token
     * @returns {String} string created token
     */
    generate (name, data) {
        return jwt.sign(
            data,
            name == 'access'
                ? process.env.ACCESS_TOKENS_SECRET
                : process.env.REFRESH_TOKENS_SECRET,
            {
                algorithm: this.algorithm,
                expiresIn: config.security.TOKEN_LIFE[name]
            }
        )
    },
    /**
     * decode token
     * @param name one of 'access', 'refresh'
     * @param token string with token
     * @returns {{}} decoded token
     */
    decode (name, token) {
        return jwt.verify(
            token,
            name == 'access'
                ? process.env.ACCESS_TOKENS_SECRET
                : process.env.REFRESH_TOKENS_SECRET,
            {
                algorithms: [this.algorithm]
            }
        )
    }
}

exports.errors = {
    InvalidRequesDataError (msg) {
        return {
            name: 'InvalidRequesDataError',
            message: msg
        }
    }
}
exports.sendError = (res, code, msg) => {
    return res.status(code).json({success: false, message: msg}).end();
}

exports.fs = {
    /**
     * read file from file storage
     * @param pathToFile path to file
     * @returns {*}
     */
    read (pathToFile) {
        return fs.readFile(pathToFile, 'utf8');
    }
}
exports.md = {
    reader: new commonmark.Parser(),
    writer: new commonmark.HtmlRenderer({safe: true}),
    /**
     * render string as Markdown
     * @param text text to render
     */
    render (text) {
        var parsed = this.reader.parse(text);
        return this.writer.render(parsed); // result is a String
    }
}