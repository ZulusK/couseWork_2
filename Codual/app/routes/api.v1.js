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
    router_auth.post('/logout', API.auth.logout);
    router_auth.post('/is/user', API.auth.verifyUser(user_db));
    router_auth.post('/is/admin', API.auth.verifyAdmin(user_db));

    router_user.get('/', (req, res) => res.send('Codual API users'));
    router_user.post('/signup', API.user.signup(user_db));
    router_user.post('/setup', API.user.setup(user_db));
    router_user.put('/update', passport.authenticate('jwt', config.session), API.user.update(user_db, API));
    router_user.delete('/delete', passport.authenticate('jwt', config.session), API.user.delete(user_db, API));
    router_user.post('/info', passport.authenticate('jwt', config.session), API.user.info(user_db));
    router_user.post('/list', passport.authenticate('jwt', config.session), API.auth.checkAdmin, API.user.list(user_db));
    // router_user.get('/user',passport.authenticate('jwt', config.session),API.user.get(user_db));

    app.use('/api/v1/auth', router_auth);
    app.use('/api/v1/users', router_user);
    app.get('/api', (req, res) => res.redirect('/api/v1'));
    app.get('/api/v1', (req, res) => res.json({message: 'codual api.v1'}));
}


