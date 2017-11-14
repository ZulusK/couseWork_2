const mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    passport = require('passport'),
    config = require('@config'),
    ObjectID = require('mongoose').Types.ObjectId;

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
                page: pagination.page,
                limit: pagination.limit,
                total: pagination.total,
                count: publications.length,
                items: publications
            }).send();
        } catch (e) {
            console.log(e);
            return res.status(400).json({success: false, message: "bad query"}).send();
        }
    } else {
        return res.status(400).json({success: false, message: "bad arguments, target did not found"}).send();
    }
}


function getTarget(req) {
    if (!req.body.target) {
        throw null;
    } else {
        return new ObjectID.createFromHexString(req.body.target);
    }
}

api.update = (publication_db) => async (req, res, next) => {
    if (!req.body.values) {
        return res.status(400).json({success: false, message: 'values required'}).send();
    }
    //get fields to update
    let targetid = "";
    try {
        targetid = getTarget(req);
    } catch (err) {
        console.log(req.body, err);
        return res.status(400).json({success: false, message: 'target required'}).send();
    }
    let client = req.user;
    if (((client.publications.indexOf(targetid) >= 0) || client.access === 'admin')) {
        //get target to modify
        try {
            let target = await publication_db.getById(targetid);
            await target.set(JSON.parse(req.body.values), client.access == 'admin');
            return res.status(200).json({success: true}).send();
        } catch (e) {
            console.log('error', e);
            return res.status(400).json({success: false, message: "bad field's names or target id"}).send();
        }
    } else {
        return res.status(403).json({success: false, message: 'Access denied'}).send();
    }
}

api.list = (publication_db) => async (req, res, next) => {
    if (req.user.publications.length == 0) {
        return res.json({
            success: true,
            page: 1,
            count: 0,
            limit: process.env.PAGINATE_LIMIT_MAX,
            total: 0,
            items: []
        }).send();
    }
    let query = {_id: {$in: req.user.publications}};
    try {
        let pagination = await publication_db.find(query, req.body.page, req.body.limit, req.body.sort);
        let publications = [];
        pagination.docs.forEach((data) => {
            publications.push(collectPublicationData(data));
        })
        return res.json({
            success: true,
            page: pagination.page,
            count: publications.length,
            limit: pagination.limit,
            total: pagination.total,
            items: publications
        }).send();
    } catch (e) {
        console.log(e);
        return res.status(500).json({success: false}).send();
    }
}

module.exports = api;