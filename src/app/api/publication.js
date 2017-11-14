const ObjectID = require('mongoose').Types.ObjectId;

api = {};

function parseTags (str) {
    return JSON.parse(str || "[]");
}

api.create = (publicationsDB) => async (req, res, next) => {
    req.body.tags = parseTags(req.body.tags);
    try {
        let client = req.user;
        let publication = await publicationsDB.create(
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

function collectPublicationData (data) {
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


function getTarget (req) {
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
    let targetID = "";
    try {
        targetID = getTarget(req);
    } catch (err) {
        console.log(req.body, err);
        return res.status(400).json({success: false, message: 'target required'}).send();
    }
    let client = req.user;
    if (((client.publications.indexOf(targetID) >= 0) || client.access === 'admin')) {
        //get target to modify
        try {
            let target = await publication_db.getById(targetID);
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


api.delete = (publication_db, user_db) => async (req, res, next) => {
    let targetid = "";
    try {
        targetid = getTarget(req);
    } catch (err) {
        return res.status(400).json({success: false, message: 'target required'}).send();
    }
    try {
        //get target
        let target = await publication_db.getById(targetid);
        if (!target) {
            return res.status(400).json({success: false, message: "bad target id"}).send();
        } else if (target.isAuthor(req.user) || req.user.access === 'admin') {
            //get owner of target
            let owner = await user_db.getById(target.author);
            //remove publication
            await owner.removePublication(target);
            await target.remove();
            return res.status(200).json({success: true}).send();
        } else {
            return res.status(403).json({success: false, message: 'Access denied'}).send();
        }
    } catch (e) {
        return res.status(500).json({success: false, message: "server error"}).send();
    }
}
module.exports = api;