const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const BasicStrategy = require('passport-http').BasicStrategy;
const config = require('@config');
const Utils = require('@utils');

const DBusers = require('@DBcore').users;

module.exports.init = (app) => {
    // username & password auth
    passport.use(new BasicStrategy(
        async function (email, password, done) {
            try {
                const user = await DBusers.get.byCredentials(email, password);
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                err.status = 400;
                console.log('basic', err)
                return done(err);
            }
        }));
    // bearer token's auth, with access-tokens
    passport.use('access-token', new BearerStrategy(
        async function (token, done) {
            try {
                const decode = Utils.tokens.decode('access', token);
                const me = await DBusers.get.byToken('access', decode);
                if (me) {
                    return done(null, me);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                err.status = 400;
                console.log('access', err)
                return done(err);
            }
        }
    ));
    // bearer token's auth
    passport.use('refresh-token', new BearerStrategy(
        async function (token, done) {
            try {
                const decode = Utils.tokens.decode('refresh', token);
                const me = await DBusers.get.byToken('refresh', decode);
                if (me) {
                    return done(null, me);
                } else {
                    return done(null, false);
                }
            } catch (err) {
                err.status = 400;
                console.log('refresh', err)
                return done(err);
            }
        }
    ));

    app.use(passport.initialize());
    console.log("+Auth: configured");
}

// facebook strategy
// passport.use(new FacebookStrategy({
//         // pull in our app id and secret from our auth.js file
//         clientID: config.auth.facebook.APP_ID,
//         clientSecret: config.auth.facebook.APP_SECRET,
//         callbackURL: config.auth.facebook.CALLBACK_URL,
//         session: false,
//         enableProof: true,
//         profileFields: ['id', 'displayName', 'photos', 'email', 'gender', 'first_name', 'last_name']
//     },
//     // facebook will send back the token and profile
//     async function (token, refreshToken, profile, done) {
//         console.log(profile)
//         console.log(2)
//         try {
//             let user = await DBusers.get.byFacebook(profile.id);
//             if (!user) {
//                 // create new user
//                 let newUser = await DBusers.create.facebook(profile)
//                 done(null, newUser || false);
//             } else {
//                 // update user info
//                 await DBusers.update.facebook(user, profile);
//                 done(null, user);
//             }
//         } catch (err) {
//             err.status = 400;
//             console.log('facebook', err)
//             return done(err);
//         }
//     }
// ));