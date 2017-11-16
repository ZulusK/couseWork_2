const user_db = require('@CodualDB/controllers/controller.user'),
    passport = require('passport'),
    config = require('@config'),
    express = require('express');


module.exports = (app) => {
    const API = app.api;
    let router_auth = express.Router();
    router_auth.get('/', (req, res) => res.json({message: API.auth.rootRoad}));
    router_auth.post('/login', API.auth.login);
    router_auth.get('/login', (req, res) => res.json({message: API.auth.loginRoad}));
    router_auth.post('/is/logined', API.auth.verify);
    router_auth.get('/is/logined', (req, res) => res.json({message: API.auth.isloginedRoad}));
    router_auth.post('/logout', API.auth.logout);
    router_auth.get('/logout', (req, res) => res.json({message: API.auth.logoutRoad}));
    router_auth.post('/is/user', API.auth.verifyUser);
    router_auth.get('/is/user', (req, res) => res.json({message: API.auth.isUserRoad}));
    router_auth.post('/is/admin', API.auth.verifyAdmin);
    router_auth.get('/is/admin', (req, res) => res.json({message: API.auth.isAdminRoad}));
    router_auth.post('/signup', API.auth.signup);
    router_auth.get('/signup', (req, res) => res.json({message: API.auth.signupRoad}));

    app.use('/api/v1/auth', router_auth);

}


