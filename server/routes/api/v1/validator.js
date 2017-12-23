const router = require('express').Router();
const Utils = require('@utils');
const DBusers = require("@DBcore").users;
const passport = require('passport');
const validator = require('@validator');

router.post('/auth/register/email', async (req, res, next) => {
    console.log(req.body);
    try {
        if (req.body.value) {
            //check is email valid
            if (!validator('user', 'email', req.body.value.trim())) {
                return res.json({success: true, result: false, message: "Invalid email, email should be you@host"})
            }
            if (await DBusers.get.byEmail(req.body.value.trim())) {
                return res.json({success: true, result: false, message: "Email is already taken"})
            }
            else return res.json({success: true, result: true})
        } else {
            return Utils.sendError(res, 400, "Bad arguments");
        }
    } catch (e) {
        return Utils.sendError(res, 500, "Server error");
    }
})
router.post('/auth/register/password', async (req, res, next) => {
    console.log(req.body);
    try {
        if (req.body.value) {
            //check is email valid
            if (!validator('user', 'password', req.body.value.trim())) {
                return res.json({
                    success: true,
                    result: false,
                    message: "Please, use only characters A-z, 0-9 in your password, it should contain more than 8 symbols"
                })
            }
            else return res.json({success: true, result: true})
        } else {
            return Utils.sendError(res, 400, "Bad arguments");
        }
    } catch (e) {
        return Utils.sendError(res, 500, "Server error");
    }
})
router.post('/auth/register/fullname', async (req, res, next) => {
    console.log(req.body);
    try {
        if (req.body.value) {
            //check is email valid
            if (!validator('user', 'fullname', req.body.value.trim())) {
                return res.json({
                    success: true,
                    result: false,
                    message: "Please, use only letters in your name, it should starts from caps letter"
                })
            }
            else return res.json({success: true, result: true})
        } else {
            return Utils.sendError(res, 400, "Bad arguments");
        }
    } catch (e) {
        return Utils.sendError(res, 500, "Server error");
    }
})
router.post('/auth/login/email', async (req, res, next) => {
    console.log(req.body);
    try {
        if (req.body.value) {
            //check is email valid
            if (!validator('user', 'email', req.body.value.trim())) {
                return res.json({success: true, result: false, message: "Invalid email, email should be you@host"})
            }
            else return res.json({success: true, result: true})
        } else {
            return Utils.sendError(res, 400, "Bad arguments");
        }
    } catch (e) {
        return Utils.sendError(res, 500, "Server error");
    }
})
router.post('/auth/login/password', async (req, res, next) => {
    try {
        if (req.body.value) {
            //check is email valid
            if (!validator('user', 'password', req.body.value.trim())) {
                return res.json({
                    success: true,
                    result: false,
                    message: "Please, use only characters A-z, 0-9 in your password, it should contain more than 8 symbols"
                })
            }
            else return res.json({success: true, result: true})
        } else {
            return Utils.sendError(res, 400, "Bad arguments");
        }
    } catch (e) {
        return Utils.sendError(res, 500, "Server error");
    }
})
router.post('/publication/create/:name', async (req, res, next) => {
    try {
        if (req.body.value) {
            if (!validator('publication', req.params.name, req.body.value.trim())) {
                return res.json({success: true, result: false, message: "Invalid, fix it"})
            }
            else return res.json({success: true, result: true})
        } else {
            return Utils.sendError(res, 400, "Bad arguments");
        }
    } catch (e) {
        return Utils.sendError(res, 500, "Server error");
    }
})

router.use((req, res, next) => {
    return res.json({success: true, result: true});
})
module.exports = router;