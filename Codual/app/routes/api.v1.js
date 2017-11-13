const user_db = require('@CodualDB/DB.User.controller'),
    passport = require('passport'),
    config = require('@config'),
    express = require('express');

module.exports = (app) => {
    const API = app.api;
    let router_auth = express.Router();
    let router_user = express.Router();
    router_auth.get('/', (req, res) => res.send('Codual API auth'));
    router_auth.post('/login', API.auth.login(user_db));
    router_auth.post('/is/logined', API.auth.verify);
    router_auth.post('/is/admin', API.auth.verifyAdmin(user_db));
    router_user.post('/signup', API.user.signup(user_db));
    router_user.post('/setup', API.user.setup(user_db));
    router_user.get('/', (req, res) => res.send('Codual API users'));


    app.use('/api/v1/auth', router_auth);
    app.use('/api/v1/users', router_user);
}


