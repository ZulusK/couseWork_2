const user_db = require('@CodualDB/controllers/controller.user'),
    passport = require('passport'),
    config = require('@config'),
    express = require('express');

module.exports = (app) => {
    const API = app.api;
    let router_auth = express.Router();
    router_auth.get('/', (req, res) => res.send('Codual API auth'));
    router_auth.post('/login', API.auth.login(user_db));
    router_auth.post('/is/logined', API.auth.verify);
    router_auth.post('/logout', API.auth.logout);
    router_auth.post('/is/user', API.auth.verifyUser(user_db));
    router_auth.post('/is/admin', API.auth.verifyAdmin(user_db));

    app.use('/api/v1/auth', router_auth);
}


