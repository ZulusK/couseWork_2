"use strict";
let express = require('express'),
    router = express.Router();
const authorization = require('../utils/auth'),
    storage_u = require('../storage/controller.users'),
    storage_p = require('../storage/controller.publications'),
    utils = require('../utils/util');


router.get('/', authorization.checkAuth, async (req, res) => {
    if (!req.query.page) {
        req.query.page = 1;
    }
    try {
        let args = await utils.getBasicArgsEJS(req);

        utils.paginate(args, await utils.findPublicationByAuthorId(req.user._id), req.query.page);
        args.startURL = "/users/?";
        console.log(`+ get page profile=${req.query.page}`);
        res.render('profile', args);
    } catch (e) {
        console.log(e);
        next();
    }
});

router.get('/admin', authorization.checkAdmin, async (req, res, next) => {
    if (!req.query.page) {
        req.query.page = 1;
    }
    try {
        let args = await utils.getBasicArgsEJS(req);
        utils.paginate(args, await storage_u.getAll(), req.query.page);
        args.startURL = "/users/admin?";
        // console.log("!!!!!!!!\n" + JSON.stringify(args) + "\n!!!!!!!!!");
        console.log(`+ get page admin=${req.query.page}`);
        res.render('admin', args);
    } catch (e) {
        console.log(e);
        next();
    }
});

router.post('/remove/:id', authorization.checkAdmin, async (req, res, next) => {
    try {
        console.log(`try to remove ${req.params.id}`)
        await storage_u.remove(req.params.id);
        res.redirect('/users/admin');
    } catch (e) {
        utils.throwError(next, 500, "Cannot delete user, error");
    }
});
module.exports = router;







