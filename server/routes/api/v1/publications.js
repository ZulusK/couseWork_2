const router = require('express').Router();
const Utils = require('@utils');
const validate = require('@validator');
const DBpublications = require("@DBcore").publications;
const passport = require('passport');
const config = require('@config');
let tools = {};

tools.collectDataFromReq = {
    post (req) {
        let args = {query: {}};
        args.query.title = req.body.title;
        args.query.description = req.body.description;
        args.query.text = req.body.text;
        args.query.difficult = req.body.difficult;
        args.query.logo = req.body.logo;
        if (req.body.tags) {
            let parsed = Utils.parseJSON(req.body.tags);
            if (Array.isArray(parsed)) {
                args.query.tags = [];
                parsed.forEach((value) => {
                    args.query.tags.push(String(value));
                })
            } else if (parsed) {
                args.query.tags = [String(parsed)];
            }
        }
        return args;
    },
    get (req) {
        let args = {};
        let query = {};
        args.page = Number(req.query.page || 1);
        args.limit = Number(req.query.limit || config.PAGINATION_LIMIT);
        args.sort = Utils.parseJSON(req.query.sort) || {title: 1, created: 1, difficult: 1}
        //id
        if (req.query.id && Utils.isValid.id(req.query.id)) {
            query.id = Utils.convert.str2id(req.query.id);
        }
        if (req.query.title) {
            query.title = new RegExp(`^${req.query.title.trim()}`, "i");
        }
        if (req.query.author && Utils.isValid.id(req.query.author)) {
            query.author = Utils.convert.str2id(req.query.author);
        }
        //tag
        if (req.query.tags) {
            let tags = {$in: []};
            let parsed = Utils.parseJSON(req.query.tags);
            if (Array.isArray(parsed)) {
                parsed.forEach((value) => {
                    tags.$in.push(String(value));
                })
            } else if (parsed) {
                tags.$in.push(parsed);
            }
            query.tags = tags;
        }
        args.query = query;
        return args;

    },
    delete (req) {
        return this.get(req);
    }
}

tools.verifyData = {
    post (args) {
        // check, is all required fields are present
        DBpublications.requiredFields.forEach((field) => {
            if (!args.query[field]) {
                throw Utils.errors.InvalidRequesDataError(`'${field}' is required`)
            }
        })
        // validate all fields
        Object.keys(args.query).forEach(key => {
            if (DBpublications.allFields.indexOf(key) < 0) {
                throw Utils.errors.InvalidRequesDataError(`Field '${key}' is not allowed`)
            } else if (!validate('piblication', key, args.query[key])) {
                throw Utils.errors.InvalidRequesDataError(`Invalid value of '${key}'`)
            }
        })
        return true;
    },
    get (args) {
        if (!args.page || !Number(args.page) || Number(args.page) <= 0) {
            throw Utils.errors.InvalidRequesDataError(`value of 'page' is invalid`)
        }
        if (!args.limit || !Number(args.limit) || Number(args.limit) <= 0) {
            throw Utils.errors.InvalidRequesDataError(`value of 'limit' is invalid`)
        }
        return true;
    },
    delete (args) {
        return this.get(args)
    }
}
tools.result = {
    post (res, args) {
        return res.json(
            {
                success: true,
                item: args.publication.info()
            }
        )
    },
    get (res, args) {
        return res.json(
            {
                success: true,
                query: args.query,
                items: args.result.docs.map((value) => {
                    return value.info()
                }),
                page: args.result.page,
                total: args.result.total,
                limit: args.result.limit,
                pages: args.result.pages
            }
        )
    }
}
router.route('/')
    .get(async (req, res, next) => {
        const args = tools.collectDataFromReq.get(req);
        console.log(args);
        try {
            tools.verifyData.get(args);
        } catch (err) {
            return Utils.sendError(res, 400, err.message);
        }
        try {
            args.result = await DBpublications.get.byQuery(args.query, args.page, args.limit, args.sort);
            if (args.result) {
                return tools.result.get(res, args);
            } else {
                return Utils.sendError(res, 400, "Bad arguments");
            }
        } catch (e) {
            return Utils.sendError(res, 500, `Server error: ${e}`);
        }
    })
    .post(passport.authenticate(['access-token', 'basic'], {session: false}), async (req, res, next) => {
        const args = tools.collectDataFromReq.post(req);
        try {
            tools.verifyData.post(args);
        } catch (err) {
            return Utils.sendError(res, 400, err.message);
        }
        try {
            args.author = req.user.id;
            args.publication = await DBpublications.create(args.query)
            if (args.publication) {
                return tools.result.post(res, args);
            } else {
                return Utils.sendError(res, 400, "Bad arguments");
            }
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, 500, `Server error: ${err}`);
        }
    })
    .delete(passport.authenticate(['access-token', 'basic'], {session: false}), async (req, res, next) => {
        const args = tools.collectDataFromReq.delete(req);
        try {
            tools.verifyData.delete(args);
        } catch (err) {
            Utils.sendError(res, 400, err.message);
        }
        try {
            const result = await DBimage.get.byID(args.query.id);
            if (!result) {
                return Utils.sendError(res, 404, "No such image");
            }
            if (String(result.metadata.owner) !== String(req.user._id) && !req.user.isAdmin) {
                return Utils.sendError(res, 403, "Permission denied");
            }
        } catch (e) {
            return Utils.sendError(res, 500, `Server error: ${e}`);
        }
        try {
            await DBimage.remove.byID(args.query.id);
            return res.json({success: true});
        } catch (e) {
            return Utils.sendError(res, 500, "Server error");
        }
    })
module.exports = router;