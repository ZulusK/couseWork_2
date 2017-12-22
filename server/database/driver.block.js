"use strict";

const BlockModel = require('@DBmodels').Block;
const DB = require('@DBcore');

function getRequiredFields () {
    return Object
        .keys(BlockModel.schema.paths)
        .filter(value => {
            return BlockModel.schema.paths[value].isRequired
        })
}

function getAllFields () {
    return Object.keys(BlockModel.schema.paths);
}

function getConstantFields () {
    return ['id', '_id']
}

module.exports = {
    size () {
        return BlockModel.count({}).exec();
    },
    requiredFields: getRequiredFields(),
    allFields: getAllFields(),
    constantFields: getConstantFields(),
    create (args) {
        return DB.create(BlockModel, args);
    },
    get: {
        byCategory (category) {
            return DB.find.withoutPagination(BlockModel, {category: category});
        },
        byQuery (query, page, limit, sort) {
            return DB.find.withoutPagination(BlockModel, query)
        },
        byID (id) {
            return BlockModel.findById(id);
        }
    },
    remove: {
        byID (id) {
            return BlockModel.findByIdAndRemove(id).exec();
        }
    }
}