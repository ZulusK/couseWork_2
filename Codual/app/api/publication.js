const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    config = require('@config');

api = {};

function parseTags(str) {
    return JSON.parse(str || "[]");
}

api.create = (publications_db) => async (req, res, next) => {
    // if (!checkReq(req)) {
    //     res.status(400).json({success: false, message: "bad arguments"}).send();
    // }
    req.body.tags = parseTags(req.body.tags);
    try {
        let client = req.user;
        let publication = await publications_db.create(
            req.body.title,
            req.description,
            client._id,
            req.body.difficult,
            req.body.tags,
            req.body.text
        );
        console.log(publication);
        await client.addPublication(publication);
        res.json({success: true, publication: publication}).send();
    } catch (e) {
        res.status(500).json({success: false}).send();
    }
}

api.get = (publication_db) => async (req, res, next) => {
    if (req.body.target) {
        let query = {};
        //parse target
        try {
            query = JSON.parse(req.body.target);
        } catch (e) {
            res.status(400).json({success: false, message: "bad target, use JSON"}).send();
        }
        try {
            let publications = await publication_db.find(query);
            res.json({success: true, items: publications}).send();
        } catch (e) {
            res.status(400).json({success: false, message: "bad query"}).send();
        }

    } else {
        res.status(400).json({success: false, message: "bad arguments, target did not found"}).send();
    }
}
module.exports = api;