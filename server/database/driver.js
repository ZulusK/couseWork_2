const models = require("@DBmodels");

module.exports.create = (model, args) => {
    let entity = new model(args);
    return new Promise((resolve, reject) => {
        entity.save((err, grid) => {
            if (err) {
                console.log(err);
                reject(err);
            }
            else resolve(grid);
        });
    });
}

module.exports.findOne = (model, query) => {
    return model.findOne(query).exec();
}
module.exports.find = {
    withoutPagination (model, query) {
        return model.find(query).exec();
    },
    withPagination (model, query, pagination) {
        return model.paginate(query, pagination);
    }
}
module.exports.users = require('@DB/driver.user');
module.exports.images = require('@DB/driver.image');
module.exports.publications = require('@DB/driver.publications');
