const storage_p = require('../storage/controller.publications'),
    storage_i = require('../storage/controller.image'),
    storage_u = require('../storage/controller.users'),
    authorization = require('./auth');

exports.findPublicationBySearchQuery = async function getDataByQuery(query) {
    if (!query.title || query.title === "") {
        return  storage_p.getAll();
    } else {
        return storage_p.find('title', query.title);
    }
}

exports.findPublicationByAuthorId = async function getDataByQuery(id) {
    return  storage_p.select('author_id', id);
}


exports.paginate = function paginate(args, items, page) {
    let start = (page - 1) * Number(process.env.PAGINATION_ITEMS_PER_PAGE);
    if (start > items.length || start < 0) {
        throw "Page out of bounds";
    }
    args.pageCount = Math.trunc(items.length / Number(process.env.PAGINATION_ITEMS_PER_PAGE)) + ((items.length % Number(process.env.PAGINATION_ITEMS_PER_PAGE) > 0) ? 1 : 0);
    args.items = items.slice(start, start + Number(process.env.PAGINATION_ITEMS_PER_PAGE));
    args.currentPage = page;
    args.range = Number(process.env.PAGINATION_RANGE_OF_PAGE);
    return args;
}

//parse tags from request
exports.getTagsFromQuery = async function parseTags(body) {
    let tags = [];
    for (let i = 0; ("tag" + i) in body; i++) {
        let val = body["tag" + i];
        if (val.length > 0) {
            tags.push(val);
        }
    }
    return tags;
}

exports.getUserInfo = async function (req) {
    let user = {};
    if (authorization.isAuthorized(req)) {
        user.isAuthorized = true;
        user.info = req.user;
    } else {
        user.isAuthorized = false;
        user.info = {};
    }
    return user;
}

exports.getBasicArgsEJS = async function (req) {
    let args = {
        user: await this.getUserInfo(req),
    };
    // console.log(args);
    return args;
}

exports.throwError = function (next, status, msg) {
    let err = new Error(msg);
    err.status = status;
    next(err);
}