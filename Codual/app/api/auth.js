const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    config = require('@config');

const api = {};

api.login = (user_db) => async (req, res, next) => {
    console.log(req.body.username);
    let user;
    try {
        user = await user_db.getByUsername(req.body.username);
        if (!user) {
            res.status(401).send({
                success: false,
                message: 'Authentication failed. User not found.',
                username: req.body.username + ''
            });
            return;
        }
    } catch (e) {
        throw e;
    }
    try {
        if (await user.comparePassword(req.body.password)) {
            const token = jwt.sign({user}, config.secret);
            res.json({success: true, message: 'Token granted', token});
        } else {
            res.status(401).send({success: false, message: 'Authentication failed. Wrong password.'});
        }
    } catch (e) {
        throw e;
    }
}
api.verify = (headers) => {
    if (headers && headers.authorization) {
        const split = headers.authorization.split(' ');
        if (split.length === 2) return split[1];
        else return null;
    } else return null;
}

module.exports = api;