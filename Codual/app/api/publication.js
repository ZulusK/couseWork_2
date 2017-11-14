const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    config = require('@config');

api = {};

function parseTags(str) {
    return JSON.parse(str || "[]");
}

function checkReq(req) {
    return
    req.body.title &&
    req.body.description &&
    req.body.difficult &&
    req.body.text;
}

api.create = (publications_db) => async (req, res, next) => {
    if (!checkReq(req)) {
        res.status(400).json({success: false, message: "bad arguments"}).send();
    }

    req.body.tags = parseTags(req.body.tags);

    try {
        let client = req.user;
        let publication = await publications_db.create(
            req.body.title,
            req.description,
            client._id,
            req.difficult,
            req.tags,
            req.text
        );

        client.addPublication(publication);
        res.json({success: true, publication: publication._id}).send();
    } catch (e) {
        res.status(500).json({success: false}).send();
    }
}

api.get = (publication_db) => async (req, res, next) => {
    if (req.body.target) {

    } else {

    }
}
module.exports = api;