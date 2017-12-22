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
    return ['_id', 'id'];
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
        }
    },
    remove: {
        byID (id) {
            return CategoryModel.findByIdAndRemove(id).exec();
        }
    }
}