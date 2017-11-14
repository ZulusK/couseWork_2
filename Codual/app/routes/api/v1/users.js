const user_db = require('@CodualDB/controllers/controller.user'),
    passport = require('passport'),
    config = require('@config'),
    express = require('express');

module.exports = (app) => {
    const API = app.api;
    let router_user = express.Router();

    router_user.get('/', (req, res) => res.send('Codual API users'));
    router_user.post('/signup', API.user.signup(user_db));
    router_user.post('/setup', API.user.setup(user_db));
    router_user.put('/update', passport.authenticate('jwt', config.session), API.user.update(user_db, API));
    router_user.delete('/delete', passport.authenticate('jwt', config.session), API.user.delete(user_db, API));
    router_user.post('/info', passport.authenticate('jwt', config.session), API.user.info(user_db));
    router_user.post('/list', passport.authenticate('jwt', config.session), API.auth.checkAdmin, API.user.list(user_db));
    app.use('/api/v1/users', router_user);
}