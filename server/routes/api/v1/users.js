const router = require('express').Router();
const Utils = require('@utils');
const validate = require('@validator');
const DBusers = require("@DBcore").users;
const passport = require('passport');
const config = require('@config');
let tools = {};

tools.collectDataFromReq = {
    get (req) {
        let args = {};
        let query = {};
        args.page = Number(req.query.page || 1);
        args.limit = Number(req.query.limit || config.PAGINATION_LIMIT);
        args.sort = Utils.parseJSON(req.query.sort) || {title: 1, created: 1, difficult: 1}
        //id
        if (req.query.id && Utils.isValid.id(req.query.id)) {
            query._id = Utils.convert.str2id(req.query.id);
        }
        if (req.query.name) {
            query.title = new RegExp(`^${req.query.title.trim()}`, "i");
        }
        if (req.query.email) {
            query.email = req.query.email
        }

        args.query = query;
        return args;

    },
    delete (req) {
        let args = {query: {}};
        //id
        if (req.params.id && Utils.isValid.id(req.params.id)) {
            args.query.id = Utils.convert.str2id(req.params.id);
        }
        return args;
    }
}

tools.verifyData = {
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
        if (!args.query.id) {
            throw Utils.errors.InvalidRequesDataError('Invalid id of user')
        }
        return true;
    }
}
tools.result = {
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
        try {
            tools.verifyData.get(args);
        } catch (err) {
            return Utils.sendError(res, 400, err.message);
        }
        try {
            args.result = await DBusers.get.byQuery(args.query, args.page, args.limit, args.sort);
            if (args.result) {
                return tools.result.get(res, args);
            } else {
                return Utils.sendError(res, 400, "Bad arguments");
            }
        } catch (e) {
            return Utils.sendError(res, 500, `Server error: ${e}`);
        }
    })
router.route('/:id')
    .delete(passport.authenticate(['basic'], {session: false}), async (req, res, next) => {
        const args = tools.collectDataFromReq.delete(req);
        try {
            tools.verifyData.delete(args);
        } catch (err) {
            Utils.sendError(res, 400, err.message);
        }
        try {
            const result = await DBusers.get.byID(args.query.id);
            if (!result) {
                return Utils.sendError(res, 404, "No such image");
            }
            if (String(result.id) !== String(req.user._id) && !req.user.isAdmin) {
                return Utils.sendError(res, 403, "Permission denied");
            }
        } catch (e) {
            return Utils.sendError(res, 500, `Server error: ${e}`);
        }
        try {
            await DBusers.remove.byID(args.query.id);
            return res.json({success: true});
        } catch (e) {
            return Utils.sendError(res, 500, "Server error");
        }
    })
module.exports = router;