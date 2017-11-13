const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    config = require('@config');

const api = {};
api.token = (user) => {
    const payload = {
        id: user.id,
        name: user.name,
        username: user.username
    };
    token = jwt.sign(payload, config.secret);//create JWT
    return {success: true, name: user.name, token: token};
}
api.login = (user_db) => async (req, res, next) => {
    await passport.authenticate('local', function (err, user) {
        if (!user) {
            res.status(401).json({success: false, message: "Login failed"}).send();
        } else {
            res.json(api.token(user)).send();
        }
    })(req, res, next);
}

api.authenticate = async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', function (err, user) {
            if (err) reject(err);
            req.user = user;
            resolve(user);
        })(req, res);
    });
};

api.verify = async function (req, res, next) {
    try {
        if (await api.authenticate(req, res)) {
            res.json({success: true, islogined: true});
        } else {
            res.status(401).json({success: true, islogined: false});
        }
        res.send();
    } catch (e) {
        res.status(500).json({success: false});
    }
}
api.isAdmin = (req) => {
    return req.user && req.user.access == 'user';
}

api.checkAdmin = (req, res, next) => {
    if (!req.user || req.user.access !== 'admin') {
        res.status(403).json({success: false, message: 'Access forbidden'}).send();
    } else {
        next();
    }
}

api.verifyAdmin = (user_db) => async (req, res, next) => {
    if (await api.authenticate(req, res)) {
        res.json({success: true, isadmin: req.user.access === 'admin'});
    } else {
        res.status(401).json({success: false});
    }
    res.send();
}
api.verifyUser = (user_db) => async (req, res, next) => {
    if (await api.authenticate(req, res)) {
        res.json({success: true, isuser: req.user.access === 'user'});
    } else {
        res.status(401).json({success: false});
    }
    res.send();
}
api.logout = async (req, res, next) => {
    try {
        req.logout();
        api.token(req.user);
        res.json({success: true}).send();
    } catch (e) {
        res.status(500).json({success: true}).send();
    }
}

module.exports = api;