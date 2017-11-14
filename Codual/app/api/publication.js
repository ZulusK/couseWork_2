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
        return res.json({success: true, publication: publication}).send();
    } catch (e) {
        return res.status(500).json({success: false}).send();
    }
}
api.placeholder = "none";

function collectPublicationData(data) {
    return {
        title: data.title || api.placeholder,
        author: data.author || api.placeholder,
        tags: data.tags || api.placeholder,
        id: data._id || api.placeholder,
        description: data.description || api.placeholder,
        text: data.text || api.placeholder,
        difficult: data.difficult || api.placeholder
    };
}


api.get = (publication_db) => async (req, res, next) => {
    if (req.body.target) {
        let query = {};
        //parse target
        try {
            query = req.body.target;
        } catch (e) {
            return res.status(400).json({success: false, message: "bad target, use JSON"}).send();
        }
        try {
            let pagination = await publication_db.find(query, req.body.page, req.body.limit, req.body.sort);
            let publications = [];
            pagination.docs.forEach((data) => {
                publications.push(collectPublicationData(data));
            })
            res.json({
                success: true,
                items: publications,
                page: pagination.page,
                limit: pagination.limit,
                total: pagination.total
            }).send();
        } catch (e) {
            console.log(e);
            return res.status(400).json({success: false, message: "bad query"}).send();
        }
    } else {
        return res.status(400).json({success: false, message: "bad arguments, target did not found"}).send();
    }
}


module.exports = api;