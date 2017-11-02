"use strict";
const mongoose = require('mongoose');
const Publication = require('./models').PublicationModel;

mongoose.Promise = global.Promise;
//connect to db
exports.connect = async function (url) {
    return mongoose.connect(url, {useMongoClient: true});
}
//create new entity
exports.create = function (title, author, link, image_id, tags, difficult, description, text) {
    let entity = new Publication({
        title: title,
        author: author,
        link: link,
        image_id: image_id,
        difficult: difficult,
        tags: tags,
        description: description,
        text: text
    });
    return entity.save();
}

exports.getAll = function () {
    return Publication.find().exec();
}

exports.getById = function (id) {
    return Publication.findById(id).exec();
}

exports.find = function (field, value) {
    let query = {};
    query[field.trim()] = new RegExp(`^${value.trim()}`, "i");
    return Publication.find(query).exec();
}

exports.size = function () {
    return Publication.count();
}

exports.remove = function (id) {
    return Publication.findByIdAndRemove(id).exec();
}

exports.update = async function (id, field, value) {
    if (["", "id", "date"].indexOf(field) !== -1) {
        return;
    }
    return Publication.findById(id).then(entity => {
        entity[field] = value;
        return entity.save();
    }).catch(e => {
        throw e;
    });
}

exports.isValidId=function (id) {
    return mongoose.Types.ObjectId.isValid(id);
}