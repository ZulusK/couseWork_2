const passport = require('passport'),
    config = require('@config'),
    db_users = require('@CodualDB/DB.User.controller');

module.exports = (app) => {
    const api = app.api.user;
    app.route('/api/v1/setup')
        .post(api.setup(db_users))
    app.route('/api/v1/users')
        .get(passport.authenticate('jwt', config.session), api.index(db_users, app.get('codualsecret')));
    app.route('/api/v1/signup')
        .post(api.signup(db_users));
    app.route(('api/v1/update')).put(passport.authenticate('jwt', config.session), api.update(db_users));
}