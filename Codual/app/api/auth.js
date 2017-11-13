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

api.authenticate = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', function (err, user) {
            req.user = user;
            resolve(user);
        })(req, res);
    });
};
api.verify = async function (req, res, next) {
    if (await api.authenticate(req, res)) {
        res.json({success: true});
    } else {
        res.status(401).json({success: false});
    }
    res.send();
}
api.verifyAdmin = (user_db) => async (req, res, next) => {
    if (await api.authenticate(req, res)) {
        res.json({success: true, admin: req.user.access === 'admin'});
    } else {
        res.status(401).json({success: false});
    }
    res.send();

}
api.update = (user_db) => async (req, res, next) => {


}
module.exports = api;