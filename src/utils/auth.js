const storage_users = require("../storage/controller.users"),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    crypto = require('crypto');


exports.sha512 = function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    const value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};
exports.checkAuth = function checkAuth(req, res, next) {
    if (!req.user) {
        console.log("user does't authorized");
        let err = new Error('Authorization required');
        err.status = 401;
        next(err);
    }
    next();
}

exports.init = function (app) {
    app.use(session({
        secret: "Helen is dupka",
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(
        (login, password, done) => {
            let hash = this.sha512(password, process.env.PASS_SALT).passwordHash;
            storage_users.find('login', login).then(users => {
                let user = users[0];
                // console.log(user);
                if (user && user.password === hash) {
                    done(null, user);
                } else {
                    console.log(`-strategy, no such user:  ${login}: ${hash}`);
                    done('error, not registred yet');
                }
            }).catch((e) => {
                console.log(`-error: ${e}`);
                done(e);
            })
        }
    ));
    passport.serializeUser(function (user, done) {
        // console.log(`+save coockie ${user._id}`);
        done(null, user._id);
    });

    passport.deserializeUser(async function (id, done) {
        try {
            let user = await storage_users.getById(id);
            if (user !== null && !user) {
                done(`no such user ${id}`);
            } else {
                // console.log(`+deserialize ${id}`);
                done(null, user);
            }
        } catch (e) {
            console.log(`-passport error at deserialize ${e}`)
            done(e, null);
        }
    });
}

exports.authenticate = function (success, fail) {
    return passport.authenticate('local', {
        successRedirect: success,
        failureRedirect: fail
    });
}
exports.isAuthorized = function (req) {
    if (!req.user) {
        console.log("user does't authorized");
        return false;
    }
    return true;
}

exports.checkAdmin = function (req, res, next) {
    if (!req.user) {
        console.log("user does't authorized");
        let err = new Error('Authorization required');
        err.status = 401;
        next(err);
    }
    if (!req.user.isAdmin) {
        let err = new Error('Admin access required');
        err.status = 401;
        next(err);
    } else {
        next();
    }
}