"use strict";

const router = require('express').Router();
const Utils = require('@utils');
const DBBlocks = require("@DBcore").blocks;
const DBCategories = require("@DBcore").categories;

const passport = require('passport');
const config = require('@config');
let tools = {};
tools.collectDataFromReq = {
    post (req) {
        let args = {query: req.body};
        return args;
    },
    put (req) {
        let args = {query: req.body, target: req.params.id}
        return args;
    },
    delete (req) {
        return {target: req.params.id}
    },
    get (req) {
        let args = {};
        args.page = Number(req.query.page || 1);
        args.limit = Number(req.query.limit || config.PAGINATION_LIMIT);
        args.sort = Utils.parseJSON(req.query.sort) || {_id: 1}
        args.query = req.query;
        delete args.query.page;
        delete args.query.limit;
        delete args.query.sort;
        return args;
    }
}
tools.verifyData = {
    get_b (args) {
        return tools.verifyData.delete(args);
    },
    post_c (args) {
        // check, is all required fields are present
        DBCategories.requiredFields.forEach((field) => {
            if (!args.query[field]) {
                throw Utils.errors.InvalidRequesDataError(`'${field}' is required`)
            }
        })
        // validate all fields
        Object.keys(args.query).forEach(key => {
            if (DBCategories.allFields.indexOf(key) < 0) {
                throw Utils.errors.InvalidRequesDataError(`Field '${key}' is not allowed`)
            }
        })
        return true;
    },
    async post_b (args) {
        // check, is all required fields are present
        DBBlocks.requiredFields.forEach((field) => {
            if (!args.query[field]) {
                throw Utils.errors.InvalidRequesDataError(`'${field}' is required`)
            }
        })
        // validate all fields
        Object.keys(args.query).forEach(key => {
            if (DBBlocks.allFields.indexOf(key) < 0) {
                throw Utils.errors.InvalidRequesDataError(`Field '${key}' is not allowed`)
            }
        })
        if (args.query.category && !await DBCategories.get.byName(args.query.category)) {
            args.query.category = config.IDLE_CATEGORY;
        }
        return true;
    },
    put_b (args) {
        if (!args.target) {
            throw Utils.errors.InvalidRequesDataError(`Missing id of target block`)
        }
        // validate all fields
        Object.keys(args.query).forEach(key => {
            if (DBBlocks.allFields.indexOf(key) < 0) {
                throw Utils.errors.InvalidRequesDataError(`Field '${key}' is not allowed`)
            }
        })
        Object.keys(args.query).forEach(key => {
            if (DBBlocks.constantFields.indexOf(key) >= 0) {
                throw Utils.errors.InvalidRequesDataError(`Field '${key}' is constant`)
            }
        })
        return true;
    },
    put_c (args) {
        if (!args.target) {
            throw Utils.errors.InvalidRequesDataError(`Missing id of target block`)
        }
        // validate all fields
        Object.keys(args.query).forEach(key => {
            if (DBCategories.allFields.indexOf(key) < 0) {
                throw Utils.errors.InvalidRequesDataError(`Field '${key}' is not allowed`)
            }
        })
        Object.keys(args.query).forEach(key => {
            if (DBCategories.constantFields.indexOf(key) >= 0) {
                throw Utils.errors.InvalidRequesDataError(`Field '${key}' is constant`)
            }
        })
        return true;
    },
    delete (args) {
        if (!args.target) {
            throw Utils.errors.InvalidRequesDataError(`Missing id of target`)
        }
        return true;
    }
}
tools.result = {
    post (res, args) {
        return res.json(
            {
                success: true,
                item: args.item.info()
            }
        )
    },
    put (res, args) {
        return this.post(res, args)
    },
    delete (res, args) {
        return res.json({success: true});
    },
    get (res, args) {
        return res.json(
            {
                page: args.items.page,
                limit: args.items.limit,
                total: args.items.total,
                pages: args.items.pages,
                success: true,
                items: args.items.docs.map(x => x.info()),
                query: args.query
            }
        )
    }
}
router.route('/')

/**
 * get all defined blocks
 */
    .get(async (req, res, next) => {
        //get all categories
        let categories = await DBCategories.get.all();
        categories = categories.map(c => c.info())

        console.log(categories.map(c => c.name));

        //get all blocks with categories
        let blocks = await Promise.all(categories.map(category => {
            return DBBlocks.get.byCategory(category.name)
        }))
        //add blocks to categories
        blocks.forEach((b, i) => categories[i].blocks = b.map(v => v.info()));
        res.json({success: true, items: categories})
    })

router.route('/blocks')
    .post(passport.authenticate(['access-token', 'basic'], {session: false}), Utils.verifyAdmin, async (req, res, next) => {
        const args = tools.collectDataFromReq.post(req);
        try {
            await tools.verifyData.post_b(args);
        } catch (err) {
            return Utils.sendError(res, 400, err.message);
        }
        try {
            args.item = await DBBlocks.create(args.query)
            if (args.item) {
                return tools.result.post(res, args);
            } else {
                return Utils.sendError(res, 400, "Bad arguments");
            }
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                return Utils.sendError(res, 400, "Duplicate of unique value ");
            } else {
                return Utils.sendError(res, 500, "Server error");
            }
        }
    })
    .get(async (req, res, next) => {
        const args = tools.collectDataFromReq.get(req);
        try {
            args.items = await DBBlocks.get.byQuery(args.query, args.page, args.limit, args.sort)
            return tools.result.get(res, args);
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, 500, `Server error: ${err}`);
        }
    })

router.route('/blocks/:id')
    .put(passport.authenticate(['access-token', 'basic'], {session: false}), Utils.verifyAdmin, async (req, res, next) => {
        const args = tools.collectDataFromReq.put(req);
        try {
            tools.verifyData.put_b(args);
        } catch (err) {
            return Utils.sendError(res, 400, err.message);
        }
        try {
            args.item = await DBBlocks.get.byID(args.target)
            if (!args.item) {
                return Utils.sendError(res, 400, "No such block");
            } else if (args.item.primary) {
                return Utils.sendError(res, 400, "This block cannot be update");
            }
            await args.item.update(args.query);
            return tools.result.put(res, args);
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, 500, `Server error: ${err}`);
        }
    })
    .delete(passport.authenticate(['access-token', 'basic'], {session: false}), Utils.verifyAdmin, async (req, res, next) => {
        const args = tools.collectDataFromReq.delete(req);
        try {
            tools.verifyData.delete(args);
        } catch (err) {
            return Utils.sendError(res, 400, err.message);
        }
        try {
            args.item = await DBBlocks.get.byID(args.target)
            if (!args.item) {
                return Utils.sendError(res, 400, "No such block");
            }
            else if (args.item.primary) {
                return Utils.sendError(res, 400, "This block cannot be deleted");
            }
            await DBBlocks.remove.byID(args.target);
            return tools.result.delete(res, args);
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, 500, `Server error: ${err}`);
        }
    })


router.route('/categories')
    .post(passport.authenticate(['access-token', 'basic'], {session: false}), Utils.verifyAdmin, async (req, res, next) => {
        const args = tools.collectDataFromReq.post(req);
        try {
            tools.verifyData.post_c(args);
        } catch (err) {
            return Utils.sendError(res, 400, err.message);
        }
        try {
            args.item = await DBCategories.create(args.query)
            if (args.item) {
                return tools.result.post(res, args);
            } else {
                return Utils.sendError(res, 400, "Bad arguments");
            }
        } catch (err) {
            console.log(err);
            if (err.code == 11000) {
                return Utils.sendError(res, 400, "Duplicate of unique value ");
            } else {
                return Utils.sendError(res, 500, "Server error");
            }
        }
    })
    .get(async (req, res, next) => {
        const args = tools.collectDataFromReq.get(req);
        try {
            args.items = await DBCategories.get.byQuery(args.query, args.page, args.limit, args.sort)
            return tools.result.get(res, args);
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, 500, `Server error: ${err}`);
        }
    })

router.route('/categories/:id')
    .put(passport.authenticate(['access-token', 'basic'], {session: false}), Utils.verifyAdmin, async (req, res, next) => {
            const args = tools.collectDataFromReq.put(req);
            try {
                tools.verifyData.put_c(args);
            } catch (err) {
                return Utils.sendError(res, 400, err.message);
            }
            try {
                args.item = await DBCategories.get.byID(args.target)
                if (!args.item) {
                    return Utils.sendError(res, 400, "No such category");
                } else if (args.item.name == config.IDLE_CATEGORY || args.item.primary) {
                    return Utils.sendError(res, 400, `This category cannot be updated`);
                }
                let oldName = args.item.name;
                await args.item.update(args.query);
                if (args.item.name != oldName) {
                    await setCategoryInBlocks(await DBBlocks.get.byCategory(oldName), args.item.name);
                }
                return tools.result.put(res, args);
            }
            catch
                (err) {
                console.log(err);
                return Utils.sendError(res, 500, `Server error: ${err}`);
            }
        }
    )
    .delete(passport.authenticate(['access-token', 'basic'], {session: false}), Utils.verifyAdmin, async (req, res, next) => {
        const args = tools.collectDataFromReq.delete(req);
        try {
            tools.verifyData.delete(args);
        } catch (err) {
            return Utils.sendError(res, 400, err.message);
        }
        try {
            args.item = await DBCategories.get.byID(args.target);
            if (!args.item) {
                return Utils.sendError(res, 400, "No such category");
            } else if (args.item.name == config.IDLE_CATEGORY || args.item.primary) {
                return Utils.sendError(res, 400, `This category cannot be deleted`);
            }
            await DBCategories.remove.byID(args.target);
            await setCategoryInBlocks(await DBBlocks.get.byCategory(args.item.name), config.IDLE_CATEGORY);
            return tools.result.delete(res, args);
        } catch (err) {
            console.log(err);
            return Utils.sendError(res, 500, `Server error: ${err}`);
        }
    })

async function setCategoryInBlocks (blocks, newCategoryName) {
    const args = {category: newCategoryName}
    await Promise.all(blocks.map(b => b.update(args)));
}

module.exports = router;