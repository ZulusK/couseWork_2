"use strict";
let express = require('express');
let router = express.Router();
let storage_p = require('../storage/controller.publications');
let storage_i = require('../storage/controller.image');

let fs = require('fs-promise');
const itemsPerPage = 7;
const rangeOfpage = 4;

module.exports = router;


router.get('/:id', async function (req, res, next) {
    try {
        res.render('publication', await  storage_p.getById(req.params.id));
    } catch (e) {
        next();
    }
});

router.get('/new', function (req, res, next) {
    try {
        res.render("newPublication")
    } catch (err) {
        console.log(err);
        throw err;
    }
});

router.get('/', async function (req, res, next) {
    try {
        if (!req.query.page) {
            req.query.page = 1;
        }
        console.log(`page=${req.query.page} name=${req.query.title}`);
        let args = paginate(await getDataByQuery(req.query), req.query.page);
        args.startURL = "/publications?" + ((req.query.title) ? `title=${req.query.title}&` : "");
        args.searchName = (req.query.title) ? req.query.title : "";
        res.render('publications_list', args);
    } catch (e) {
        console.log(e);
        next();
    }
});

async function getDataByQuery(query) {
    if (!query.title || query.title === "") {
        return await storage_p.getAll();
    } else {
        return await storage_p.find('title', query.title);
    }
}

function paginate(items, page) {
    let args = {};
    let start = (page - 1) * itemsPerPage;
    if (start > items.length || start < 0) {
        throw "Page out of bounds";
    }
    args.pageCount = Math.trunc(items.length / itemsPerPage) + ((items.length % itemsPerPage > 0) ? 1 : 0);
    args.items = items.slice(start, start + itemsPerPage);
    args.currentPage = page;
    args.range = rangeOfpage;
    return args;
}

router.post("/add", async (req, res, next) => {
    //create new publication
    console.log(req.files.logo);
    try {
        let image_id;
        //try to save images in request
        try {
            image_id = ('files' in req && 'logo' in req.files) ? await storage_i.saveImage(req.files.logo) : '0';
        } catch (e) {
            console.log(e);
            image_id = undefined;
        }
        await
            storage_p.create(
                req.body.title,
                req.body.author,
                req.body.link,
                image_id,
                await parseTags(req.body),
                req.body.difficult,
                req.body.description,
                req.body.text)
    } catch (e) {
        console.log("Error at create" + e);
    }
    res.redirect("/publications");
});

router.post("/remove/:id", async (req, res, next) => {
    try {
        let entity = storage_p.getById(req.params.id);
        if (entity) {
            await storage_p.remove(entity.id);
            await storage_i.remove(entity.image_id);
        }
        console.log(`REMOVED ${req.params.id}`)
    } catch (e) {
        console.log(`ERROR AT REMOVE${e}`)
    }
    res.redirect("/publications");
});


//parse tags from request
async function parseTags(body) {
    let tags = [];
    for (let i = 0; ("tag" + i) in body; i++) {
        let val = body["tag" + i];
        if (val.length > 0) {
            tags.push(val);
        }
    }
    return tags;
}