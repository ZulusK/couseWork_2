const PassportJWT = require('passport-jwt'),
    ExtractJWT = PassportJWT.ExtractJwt,
    JWTStrategy = PassportJWT.Strategy,
    config = require('./index.js'),
    LocalStrategy = require('passport-local').Strategy,
    user_db = require('@CodualDB/DB.User.controller');

module.exports = (passport) => {
    const parameters = {
        secretOrKey: config.secret,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        authScheme: 'Bearer',
        session: config.session
    };
    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        session: config.session
    }, function (username, password, done) {
        console.log(username, password);
        user_db.getByUsername(username).then(async (user) => {
            console.log(user.username, await user.comparePassword(password));
            if (!user || !await user.comparePassword(password)) {
                done(null, false, {message: 'There are not such user in DB'});
            } else {
                done(null, user);
            }
        }).catch(e => {
            done(e);
        });
    }));
    passport.use(new JWTStrategy(parameters, async (payload, done) => {
        user_db.getById(payload.id).then(user => {
            console.log(user.username, user.password);
            if (user) done(null, user);
            else done(null, false);
        }).catch(e => {
            console.log('error', 'jwt', e);
            done(e);
        });
    }));
    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (obj, done) {
        done(null, obj);
    });
}