"use strict";
let express = require('express'),
    router = express.Router();
const storage_p = require("../storage/controller.publications"),
    utils = require("../utils/util");

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        let args = await utils.getBasicArgsEJS(req);
        args.number_of_publications = await storage_p.size();
        // console.log(args);
        res.render('index', args);
    } catch (e) {
        console.log(e);
        throw e;
    }
});
module.exports = router;
