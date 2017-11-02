"use strict";
let express = require('express');
let router = express.Router();
const storage = require("../storage/controller.publications");

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        let data = {number_of_publications: await storage.size()};
        res.render('index', data);
    } catch (e) {
        console.log(e);
        throw e;
    }
});
module.exports = router;
