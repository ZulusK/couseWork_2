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
module.exports.users = require('@DB/driver.user');