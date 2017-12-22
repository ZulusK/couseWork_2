"use strict";

const CategoryModel = require('@DBmodels').Category;
const DB = require('@DBcore');

function getRequiredFields () {
    return Object
        .keys(CategoryModel.schema.paths)
        .filter(value => {
            return CategoryModel.schema.paths[value].isRequired
        })
}

function getAllFields () {
    return Object.keys(CategoryModel.schema.paths);
}

function getConstantFields () {
    return ['_id', 'id', 'name'];
}

module.exports = {
    requiredFields: getRequiredFields(),
    allFields: getAllFields(),
    constantFields: getConstantFields(),
    create (args) {
        return DB.create(CategoryModel, args);
    },
    get: {
        all () {
            return CategoryModel.find({}).exec();
        },
        byQuery (query, page, limit, sort) {
            return DB.find.withPagination(CategoryModel, query, {
                page: page,
                limit: limit,
                sort: sort
            })
        },
        byName (name) {
            return DB.findOne(CategoryModel, {name: name});
        },
        byID (id) {
            return CategoryModel.findById(id);
        }
    },
    remove: {
        byID (id) {
            return CategoryModel.findByIdAndRemove(id).exec();
        }
    }
}