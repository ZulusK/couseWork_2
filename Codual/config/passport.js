const PassportJWT = require('passport-jwt'),
    ExtractJWT = PassportJWT.ExtractJwt,
    Strategy = PassportJWT.Strategy,
    config = require('./index.js'),
    user_db = require('@CodualDB/DB.User.controller');

module.exports = (passport) => {
    const parameters = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    };
    passport.use(new Strategy(parameters, async (payload, done) => {
        try {
            let user = user_db.getById(payload.id);
            if (user) done(null, user);
            else done(null, false);
        } catch (e) {
            done(e, false);
        }
    }));
}