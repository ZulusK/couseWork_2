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

module.exports = {
    requiredFields: getRequiredFields(),
    allFields: getAllFields(),
    create (args) {
        return DB.create(PublicationModel, args);
    }
}