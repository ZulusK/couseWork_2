const jwt = require('jsonwebtoken'),
    passport = require('passport'),
    config = require('@config'),
    userDB = require("@CodualDB/controllers/controller.user");


const api = {};

api.loginRoad = "To login, send post req with fields 'password' and 'username', server return your username, id and jwt token (you need send it at header, like Bearer token"
api.isloginedRoad = "To check, have you  been logged, send post request to this url"
api.logoutRoad = "To logout from Codual, send post req to this url"
api.isUserRoad = "To check, is your role is 'user', send post req to this url"
api.isAdminRoad = "To check, is your role is 'admin', send post req to this url"
api.signupRoad = "To register at Codual, send post req to this url, you need send next fields: {'name','username','password','contact'}"

function jwtToken (user) {
    // const ONE_DAY = 60 * 60 * 24;
    const payload = {
        id: user.id,
        name: user.name,
        username: user.username,
    };
    token = jwt.sign(payload, config.secret);//create JWT
    return {success: true, username: user.username, token: token, id: user.id};
}

api.login = async (req, res, next) => {
    await passport.authenticate('local', function (err, user) {
        if (!user) {
            res.status(401).json({success: false, message: "Login failed"}).send();
        } else {
            res.json(jwtToken(user)).send();
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
    return req.user && req.user.access == 'admin';
}

api.checkAdmin = (req, res, next) => {
    if (!req.user || req.user.access !== 'admin') {
        res.status(403).json({success: false, message: 'Access forbidden'}).send();
    } else {
        next();
    }
}

api.verifyAdmin = async (req, res, next) => {
    if (await api.authenticate(req, res)) {
        res.json({success: true, isadmin: req.user.access === 'admin'});
    } else {
        res.status(401).json({success: false});
    }
    res.send();
}
api.verifyUser = async (req, res, next) => {
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
        jwtToken(req.user);
        res.json({success: true}).send();
    } catch (e) {
        res.status(500).json({success: true}).send();
    }
}
api.signup = async (req, res) => {
    console.log(req.body);
    try {
        if (!req.body.username || !req.body.password || !req.body.name) {
            res.status(400).json({
                success: false,
                message: 'Please, pass a name,username and password.'
            }).end();
        }
        if (!userDB.verifyPassword(req.body.password)) {
            res.status(400).json({
                success: false,
                message: 'Please, use only characters A-z, 0-9 in your password, it should contain more than 8 symbols'
            }).end();
        }
        if (!userDB.verifyPassword(req.body.username.trim())) {
            res.status(400).json({
                success: false,
                message: 'Username should start with A-z, and contains only characters _, A-z, 0-9 at all'
            }).end();
        }
        if (!userDB.verifyName(req.body.name.trim())) {
            res.status(400).json({
                success: false,
                message: 'Please, use only letters in your name'
            }).end();
        }
        else {
            try {
                let id = await userDB.create(
                    req.body.name.trim(),
                    req.body.contact,
                    'user',
                    req.body.username,
                    req.body.password);
                res.json(jwtToken(await userDB.getById(id))).end();
            } catch (e) {
                console.log(e);
                res.status(400).json({
                    success: false,
                    message: `This username ${req.body.username.trim()} already exists.`
                }).end();
            }
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: `Smth going wrong`
        }).end();
    }
}

module.exports = api;