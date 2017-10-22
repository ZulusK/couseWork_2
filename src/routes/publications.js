let express = require('express');
let router = express.Router();
let storage = require("../storage/storage");


router.get('/', function (req, res, next) {
    storage.getAll().then(data => {
        res.render('publications_list', {items: data});
    }).catch(() => next());
});

router.get('/:id', function (req, res, next) {
    storage.getById(Number(req.params.id)).then(item => {
        console.log(item.title);
        res.render('publication', item);
    }).catch(() => {
        next();
    });

});

module.exports = router;
