const user_db = require('@CodualDB/DB.User.controller');

module.exports = (app) => {
    const api = app.api.auth;
    app.route('/api/v1/')
        .get((req, res) => res.send('Codual API'));
    app.route('/api/v1/login')
        .post(api.login(user_db));
}

