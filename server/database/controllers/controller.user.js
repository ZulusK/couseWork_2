const User = require('@CodualDBModels/models.user'),
    db = require('./controller'),
    db_publication = require('./controller.publication');
//create new entity
module.exports.create = function (firstName, contact, access, username, password) {
    let params = {
        name: firstName,
        contact: contact,
        access: access,
        username: username,
        password: password
    }
    return db.create(params, User);
}

module.exports.getAll = function (page, limit, sort) {
    return db.getAll(User, page, limit, sort);
}

module.exports.getById = function (id) {
    return db.getById(id, User);
}

module.exports.size = function () {
    return db.size(User);
}

module.exports.removeById = function (id) {
    let target = db.getById(id, User);
    return target.remove();
}

module.exports.find = function (query, page, limit, sort) {
    return db.find(query, User, page, limit, sort);
}

module.exports.getByUsername = function (username) {
    return db.findOne({"username": username}, User);
}

module.exports.getAllPublications = function (user) {
    let allPublications = [];
    user.publications.forEach((value) => allPublications.push(db_publication.getById(value)));
    return Promise.all(allPublications);
}

module.exports.verifyPassword = function (password) {
    return /^[a-z0-9]+$/i.test(password) && password.length >= 1;
}

module.exports.verifyUsername = function (username) {
    return /^[a-z][a-z0-9_]+$/i.test(username);
}

module.exports.verifyName = function (name) {
    return /^[a-z ]+$/i.test(name);
}