"use strict";
let express = require('express'),
    router = express.Router();
const storage_p = require('../storage/controller.publications'),
    storage_i = require('../storage/controller.image'),
    storage_u = require('../storage/controller.users'),
    utils = require('../utils/util'),
    auth = require('../utils/auth');

module.exports = router;


router.get('/new', auth.checkAuth, function (req, res, next) {
    try {
        res.render("newPublication");
    } catch (err) {
        console.log(err);
        utils.throwError(next, 404);
    }
});

router.get('/:id', async function (req, res, next) {
    try {
        let publication = await  storage_p.getById(req.params.id);
        if (!publication) throw -1;
        let args = await utils.getBasicArgsEJS(req);
        //get info about publication's
        args.publication = publication;
        args.publication.author = await storage_u.getById(publication.author_id);
        if(publication.author===null){
           publication.author={
               fullname:'DELETED USER',
               _id:''
           };
        }
        res.render('publication', args);
    } catch (e) {
        console.log(e);
        utils.throwError(next, 404, e);
    }
});


router.get('/', async function (req, res, next) {
    if (!req.query.page) {
        req.query.page = 1;
    }
    try {
        let args = await utils.getBasicArgsEJS(req);
        utils.paginate(args, await utils.findPublicationBySearchQuery(req.query), req.query.page);
        args.startURL = "/publications?" + ((req.query.title) ? `title=${req.query.title}&` : "");
        args.searchName = (req.query.title) ? req.query.title : "";
        console.log(`+ get page=${req.query.page} & name=${req.query.title}`);
        res.render('publications_list', args);
    } catch (e) {
        console.log(e);
        next();
    }
});

router.post("/add", auth.checkAuth, async (req, res, next) => {
    //create new publication
    // console.log(req.files.logo);
    try {
        let image_id;
        //try to save images in request
        try {
            image_id = ('files' in req && 'logo' in req.files) ? await storage_i.saveImage(req.files.logo) : '0';
        } catch (e) {
            console.log(e);
            image_id = undefined;
        }
        // console.log(req.body.text);
        let id = await
            storage_p.create(
                req.body.title,
                req.user._id,
                image_id,
                await utils.getTagsFromQuery(req.body),
                req.body.difficult,
                req.body.description,
                req.body.text)
        //add image to array in users
        storage_u.addPublication(req.user._id, id);
        console.log(`+create ${req.query.title}`);
    } catch (e) {
        console.log("-error at create" + e);
        utils.throwError(next, 500, "Cannot create publication");
    }
    res.redirect("/publications");
});

router.post("/remove/:id", auth.checkAuth, async (req, res, next) => {
    try {
        let entity = await storage_p.getById(req.params.id);
        // console.log(req.params.id);
        if (entity && ((String(req.user._id) === String(entity.author_id)) || req.user.isAdmin)) {
            await storage_p.remove(entity._id);
            await storage_i.remove(entity.image_id);
            await storage_u.removePublication(entity.author_id, entity._id);
            console.log(`+removed ${req.params.id}`)
        } else {
            console.log(`-user.id!= author.id usr:'${req.user._id}' auth:'${entity.author_id}'`)
            utils.throwError(next, 500, "You haven't permission for this action");
        }
    } catch (e) {
        console.log(`-error at remove ${req.params.id}: ${e}`);
        utils.throwError(next, 500, "smth is bad in removing");
    }
    res.redirect("/publications");
});
