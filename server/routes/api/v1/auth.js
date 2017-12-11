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
        args.username = req.body.username;
        args.password = req.body.password;
        return args;
    }
};

tools.verifyData = {
    register (args) {
        if (!args.username || !validate(args.username)) {
            throw Utils.errors.InvalidRequesDatatError('Your username is invalid')
        }
        if (!args.password || !validate(args.password)) {
            throw Utils.errors.InvalidRequesDatatError('Your password is invalid')
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
        let user = await DBusers.create(args.username, args.password);
        console.log(user)
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
router.post('/logout', passport.authenticate(['basic', 'bearer'], {session: false}), async (req, res, next) => {
    req.user.generateToken('access');
    req.user.generateToken('refresh');
    await req.user.save();
    return res.json({success: true});
});
router.post('/token', passport.authenticate('bearer-refresh', {session: false}), async (req, res, next) => {
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
module.exports = router;