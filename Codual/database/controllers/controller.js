// const ObjectId=require('mongoose').Types.ObjectId;
module.exports.connect = (mongoose, config) => {
    const database = mongoose.connection;
    mongoose.Promise = Promise;
    mongoose.connect(config.database, {
        useMongoClient: true,
        promiseLibrary: global.Promise
    });
    database.on('error', error => console.log(`-Connection to Codual database failed: ${error}`));
    database.on('connected', () => console.log('+Connected to Codual database'));
    database.on('disconnected', () => console.log('+Disconnected from Codual database'));
    process.on('SIGINT', () => {
        database.close(() => {
            console.log('Codual terminated, connection closed');
            process.exit(0);
        })
    });
};

function getOptions(page, limit, sort) {
    return {
        page: Number(page) || 1,
        limit: Number(limit) || Number(process.env.PAGINATE_LIMIT_MAX),
        sort: sort || {_id: 1}
    };
}

//create new entity
module.exports.create = function (params, model) {
    let entity = new model(params);
    return new Promise((resolve, reject) => {
        entity.save((err, grid) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else resolve(grid._id);
        });
    });
}

module.exports.getAll = function (model, page, limit, sort) {
    return model.paginate({}, getOptions(page, limit, sort));
}

module.exports.getById = function (id, model) {
    return model.findById(id).exec();
}

module.exports.findOne = function (query, model) {
    return model.findOne(query).exec();
}

module.exports.size = function (model) {
    return model.count();
}

module.exports.removeById = function (id, model) {
    let target = model.findById(id);
    return target.remove();
}

module.exports.find = function (query, model, page, limit, sort) {
    return model.paginate(query, getOptions(page, limit, sort));
}


module.exports.update = async function (id, field, value, model) {
    if (["id", "_id"].indexOf(field) >= 0) {
        throw `access to '${field}' denied`;
    }
    return model.findById(id).then(entity => {
        entity[field] = value;
        return entity.save();
    }).catch(e => {
        throw e;
    });
}

module.exports.isValidId = function (id) {
    return mongoose.Types.ObjectId.isValid(id);
}

