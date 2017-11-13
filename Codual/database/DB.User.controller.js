const User = require('@CodualDBModels/DB.models.User'),
    db = require('./DB.controller');
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

module.exports.getAll = function () {
    return db.getAll(User);
}

module.exports.getById = function (id) {
    return db.getById(id, User);
}

module.exports.size = function () {
    return db.size(User);
}

module.exports.remove = function (id) {
    return db.remove(id, User).exec();
}

module.exports.find = function (query) {
    return db.find(query, User).exec();
}
module.exports.getByUsername = function (username) {
    return db.findOne({"username": username}, User);
}
module.exports.select = function (query) {
    return db.find(query, Model).exec();
}

module.exports.addPublication = async function (user_id, publ_id) {
    let user = await this.getById(user_id);
    user.publications.push(publ_id);
    return user.save();
}

module.exports.removePublication = async function (user_id, publ_id) {
    let user = await
        this.getById(user_id);
    if (user) {
        let index = user.publications.indexOf(publ_id);
        if (index >= 0) {
            user.publications.splice(index, 1);
            return user.save();
        } else {
            throw `wrong publication id ${publ_id}`;
        }
    } else {
        throw `wrong user id ${publ_id}`;
    }
}
