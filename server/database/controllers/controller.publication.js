const Publication = require('@CodualDBModels/models.publication'),
    db = require('./controller');

//create new entity
module.exports.create = function (title, description, author, difficult, tags, imageURL, text) {
    let params = {
        title: title,
        description: description,
        author: author,
        difficult: difficult,
        tags: tags,
        text: text,
        imageURL: imageURL
    }
    return db.create(params, Publication);
}

module.exports.getAll = function (page, limit, sort) {
    return db.getAll(Publication, page, limit, sort);
}

module.exports.getById = function (id) {
    return db.getById(id, Publication);
}

module.exports.size = function () {
    return db.size(Publication);
}

module.exports.removeById = function (id) {
    let target = db.getById(id);
    return target.remove();
}

module.exports.find = function (query, page, limit, sort) {
    return db.find(query, Publication, page, limit, sort);
}

