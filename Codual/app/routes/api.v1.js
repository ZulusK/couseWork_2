const user_db = require('@CodualDB/DB.User.controller'),
    passport = require('passport');
const express = require('express')

module.exports = (app) => {
    const API = app.api.auth;
    let router = express.Router();
    router.get('/', (req, res) => res.send('Codual API auth'));
    router.post('/login', API.login(user_db));
    router.post('/check', API.verify);
    router.post('/update', API.update(user_db));
    router.post('/is/admin', API.verifyAdmin(user_db));
    app.use('/api/v1/auth', router);
}


