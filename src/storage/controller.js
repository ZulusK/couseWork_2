"use strict";
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//connect to db
exports.connect = async function (url) {
    return mongoose.connect(url, {useMongoClient: true});
}
//create new entity
exports.create = function (params, model) {
    let entity = new model(params);
    return new Promise((resolve, reject) => {
        entity.save((err, grid) => {
            if (err) reject(err);
            else resolve(grid._id);
        });
    });
}

exports.getAll = function (model) {
    return model.find().exec();
}

exports.getById = function (id, model) {
    return model.findById(id).exec();
}

exports.size = function (model) {
    return model.count();
}

exports.remove = function (id, model) {
    return model.findByIdAndRemove(id).exec();
}

exports.find = function (field, value, model) {
    let query = {};
    query[field.trim()] = new RegExp(`^${value.trim()}`, "i");
    return model.find(query).exec();
}

exports.select = function (field, value, model) {
    let query = {};
    query[field] = value;
    return model.find(query).exec();
}

exports.update = async function (id, field, value, model) {
    return model.findById(id).then(entity => {
        entity[field] = value;
        return entity.save();
    }).catch(e => {
        throw e;
    });
}

exports.isValidId = function (id) {
    return mongoose.Types.ObjectId.isValid(id);
}