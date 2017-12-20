const router = require('express').Router();
const Utils = require('@utils');
const passport = require('passport');
const config = require('@config');
let tools = {};

router.route('/')
    .get(async (req, res, next) => {
        //get defined controls
        res.json({success: true, item: JSON.parse(await Utils.fs.read(config.API_BLOCKS))})
    })

module.exports = router;