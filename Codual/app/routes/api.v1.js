const user_db = require('@CodualDB/DB.User.controller'),
    passport = require('passport');


module.exports = (app) => {
    const API = app.api.auth;
    app.route('/api/v1/')
        .get((req, res) => res.send('Codual API'));
    app.route('/api/v1/login').post(API.login(user_db))
    app.route('/api/v1/check').post(API.checkAuth);
}


