const router = require('express').Router();
const Utils = require('@utils');
const validate = require('@validator');
const DBusers = require("@DBcore").users;
const passport = require('passport');
let tools = {};
tools.collectDataFromReq = {
    /**
     * collect arguments from user request
     * @param req request object
     * @returns {{}} collected arguments
     */
    register (req) {
        let args = {};
        args.email = req.body.email;
        args.password = req.body.password;
        return args;
    }
};

tools.verifyData = {
    register (args) {
        if (!args.email || !validate('user', 'email', args.email)) {
            throw Utils.errors.InvalidRequesDataError('Your email is invalid')
        }
        if (!args.password || !validate(args.password)) {
            throw Utils.errors.InvalidRequesDataError('Your password is invalid')
        }
        return true;
    }
}

router.post('/register', async function (req, res, next) {
    const args = tools.collectDataFromReq.register(req);
    try {
        tools.verifyData.register(args)
    } catch (err) {
        return Utils.sendError(res, 400, err.message);
    }
    try {
        let user = await DBusers.create.basic(args.email, args.password);
        return res.json(
            {
                success: true,
                tokens: user.credentials
            });
    } catch (err) {
        if (err.code == 11000) {
            return Utils.sendError(res, 400, "This username is already taken");
        } else {
            return Utils.sendError(res, 500, "Server error");
        }
    }
});

router.post('/login', passport.authenticate('basic', {session: false}), async (req, res, next) => {
    try {
        req.user.generateToken('access');
        req.user.generateToken('refresh');
        await req.user.save();
        res.json({
            success: true,
            tokens: req.user.credentials
        });
    } catch (err) {
        console.log(err);
        return Utils.sendError(res, 500, "Server error");
    }
});
router.post('/logout', passport.authenticate(['access-token', 'bearer'], {session: false}), async (req, res, next) => {
    req.user.generateToken('access');
    req.user.generateToken('refresh');
    await req.user.save();
    return res.json({success: true});
});
router.get('/token', passport.authenticate('refresh-token', {session: false}), async (req, res, next) => {
    req.user.generateToken('access');
    await req.user.save();
    return res.json(
        {
            success: true,
            tokens: {
                access: req.user.accessToken
            }
        });
})

// Redirect the user to Facebook for authentication
router.get('/facebook', passport.authenticate('facebook', {session: false}));

// Facebook will redirect the user to this URL after approval.
router.get('/facebook/token', passport.authenticate('facebook', {session: false}), async (req, res, next) => {
    try {
        req.user.generateToken('access');
        req.user.generateToken('refresh');
        await req.user.save();
        res.json({
            success: true,
            tokens: req.user.credentials
        });
    } catch (err) {
        console.log(err);
        return Utils.sendError(res, 500, "Server error");
    }
});
module.exports = router;