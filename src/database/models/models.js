const mongoose = require('mongoose'),
    User = require('@CodualDBModels/DB.models.User'),
    Publication = require('@CodualDBModels/DB.models.Publication')
module.exports = {
    User: mongoose.model('User'),
    Publication: mongoose.model('Publication')
}