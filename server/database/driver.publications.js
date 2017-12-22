const PublicationModel = require('@DBmodels').Publication;
const DB = require('@DBcore');

function getRequiredFields () {
    return Object
        .keys(PublicationModel.schema.paths)
        .filter(value => {
            return PublicationModel.schema.paths[value].isRequired
        })
}

function getAllFields () {
    return Object.keys(PublicationModel.schema.paths);
}

function getConstantFields () {
    return ['id', '_id', 'created', 'edited', 'views'];
}

module.exports = {
    requiredFields: getRequiredFields(),
    allFields: getAllFields(),
    constantFields: getConstantFields(),
    create (args) {
        return DB.create(PublicationModel, args);
    },
    get: {
        byQuery (query, page, limit, sort) {
            return DB.find.withPagination(PublicationModel, query, {
                page: page,
                limit: limit,
                sort: sort
            })
        },
        byID (id) {
            return PublicationModel.findById(id);
        }
    },
    remove: {
        byID (id) {
            return PublicationModel.findByIdAndRemove(id).exec();
        }
    }
}