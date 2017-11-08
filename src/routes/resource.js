"use strict";
let express = require('express'),
    router = express.Router();
const storage_p = require("../storage/controller.publications"),
    storage_i = require("../storage/controller.image");


router.get('/images/:id', async function (req, res, next) {
    try {
        let image = await storage_i.getById(req.params.id);
        res.type(image.filename.split('.').pop());
        console.log(`+api get image ${req.params.id}`);

        (await image.stream).pipe(res);
    } catch (e) {
        console.log(e);
        next();
    }
});
module.exports = router;

