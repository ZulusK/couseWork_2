"use strict";
let express = require('express'),
    router = express.Router();
const storage_users = require("../storage/controller.users"),
    authorization = require('../utils/auth'),
    utils = require('../utils/util');

router.get('/registration', async function (req, res, next) {
    try {
        res.render('registration', {});
    } catch (e) {
        utils.throwError(next, 500)
    }
});


router.post('/register', async function (req, res, next) {
    try {
        if (!req.body.fullname || !req.body.login || !req.body.password) {
            console.log('-not full user refgistration info');
            res.redirect('/auth/registration');
        }
        await storage_users.create(req.body.fullname, req.body.telegram, req.body.login, authorization.sha512(req.body.password, process.env.PASS_SALT).passwordHash);
        console.log(`register +`);
        res.redirect("/");
    } catch (e) {
        console.log(e);
        utils.throwError(next, 401, `This '${req.body.login}' login is already taken`)
    }
})

router.get('/login', async (req, res, next) => {
    res.render('login', {});
})


router.get('/logout', authorization.checkAuth, (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/login', authorization.authenticate('/users/', '/auth/login'));

module.exports = router;




