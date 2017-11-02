"use strict";
let express = require('express');
let router = express.Router();
const storage_p = require("../storage/controller.publications");
const storage_i = require("../storage/controller.image");



router.get('/images/:id', async function (req, res, next) {
    try {
        let stream = storage_i.image(req.params.id);
        console.log(stream);
        console.log('AAAAAA');
        res.type('png');
        stream.pipe(res);
    }catch (e){
        console.log(e);
        next();
    }
    // try {
    //     console.log("image" + req.params.id);
    //     if (storage_p.isValidId(req.params.id)) {
    //         let image = await storage_i.getImage(req.params.id);
    //         if (image) {
    //             console.log(image);
    //             res.type(image.ext);
    //             image.stream.pipe(res);
    //         } else {
    //             res.status(404);
    //         }
    //     } else {
    //         throw "invalid id";
    //     }
    // } catch (e) {
    //     console.log(e);
    //     next();
    // }
});
module.exports = router;

