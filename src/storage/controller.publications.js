"use strict";
const mongoose = require('mongoose');
const Publication = require('./models').PublicationModel;
const controller = require('./controller');
//create new entity
exports.create = function (title, author_id, image_id, tags, difficult, description, text) {
    return controller.create({
        title: title,
        author_id: author_id,
        image_id: image_id,
        difficult: difficult,
        tags: tags,
        description: description,
        text: text
    }, Publication);
}

exports.getAll = function () {
    return controller.getAll(Publication);
}

exports.getById = function (id) {
    return controller.getById(id, Publication);
}

exports.size = function () {
    return controller.size(Publication);
}

exports.remove = function (id) {
    return controller.remove(id, Publication);
}

exports.select=function (field, value) {
    return controller.select(field, value, Publication);
}
exports.find = function (field, value) {
    return controller.find(field, value, Publication);
}

exports.update = async function (id, field, value) {
    if (["", "id", "date"].indexOf(field) !== -1) {
        return;
    }
    return controller.update(id, field, value, Publication);
}