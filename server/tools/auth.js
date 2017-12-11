const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const config = require('@config');


const DBusers = require('@DBcore').users;

module.exports.init = (app) => {
    // username & password auth
    passport.use(new BasicStrategy(
        async function (username, password, done) {
            try {
                const user = await DBusers.get.byCredentials(username, password);
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err);
            }
        }));
    // bearer token's auth, with access-tokens
    passport.use(new BearerStrategy(
        async function (token, done) {
            try {
                const me = await DBusers.get.byToken('access', token);
                if (me) {
                    return done(null, me);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err);
            }
        }
    ));
    // bearer token's auth
    passport.use('bearer-refresh', new BearerStrategy(
        async function (token, done) {
            try {
                const me = await DBusers.get.byToken('refresh', token);
                if (me) {
                    return done(null, me);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                return done(err);
            }
        }
    ));
    // facebook startegy
    passport.use(new FacebookStrategy({
            // pull in our app id and secret from our auth.js file
            clientID: config.auth.facebook.APP_ID,
            clientSecret: config.auth.facebook.APP_SECRET,
            callbackURL: config.auth.facebook.CALLBACK_URL,
        },
        // facebook will send back the token and profile
        async function (token, refreshToken, profile, done) {
            try {
                const user = await DBusers.get.byFacebook(profile.id);
                if (!user) {
                    done(null, false)
                } else {
                    done(null, user);
                }
            } catch (err) {
                return done(err);
            }
        }
    ));
    app.use(passport.initialize());
    console.log("+Auth: configured");
}