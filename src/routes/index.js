let express = require('express');
let router = express.Router();
let storage = require("../storage/storage");

/* GET home page. */
router.get('/', function (req, res, next) {
    storage.getAll().then(items => {
        let data = {number_of_publications: items.length};
        res.render('index', data);
    })
});

module.exports = router;
