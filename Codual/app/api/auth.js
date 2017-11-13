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
api.checkAuth = async function (req, res, next) {
    console.log('1');
    await passport.authenticate('jwt', function (err, user) {
        console.log('chck', err, '-', user);
        if (user) {
            res.json({msg: `hello, ${user.name}`});
        } else {
            res.status(401).json({msg: 'No such user'});
            console.log("err");
        }
    })(req, res, next);
}
api.verify = (headers) => {
    if (headers && headers.authorization) {
        const split = headers.authorization.split(' ');
        if (split.length === 2) return split[1];
        else return null;
    } else return null;
}

module.exports = api;