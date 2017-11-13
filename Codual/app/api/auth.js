const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    config = require('@config');

const api = {};

api.login = (user_db) => async (req, res, next) => {
    await passport.authenticate('local', function (err, user) {
        if (!user) {
            res.status(401).json({success: false, message: "Login failed"});
        } else {
            const payload = {
                id: user.id,
                name: user.name,
                username: user.username
            };
            //info about user, that stored in token
            token = jwt.sign(payload, config.secret);//create JWT
            res.json({success: true, name: user.name, token: token});
        }
    })(req, res, next);
}
api.verify = async function (req, res, next) {
    await passport.authenticate('jwt', function (err, user) {
        if (user) {
            res.json({status: true});
        } else {
            res.status(401).json({status: false, msg: 'No such user'});
        }
    })(req, res, next);
}

module.exports = api;