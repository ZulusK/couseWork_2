const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
    title: {type: String, default: "New publication"},
    author_id: Schema.Types.ObjectId,
    difficult: Number,
    image_id: {type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId},
    tags: [String],
    text: String,
    description: {type: String, default: ""},
    createdOn: {type: Date, default: Date.now}
});


const UserShema = new Schema({
    fullname: {type: String, default: "No name"},
    telegram: {type: String, default: ""},
    password: String,
    login: String,
    isAdmin: {type:Boolean, default:false},
    publications: [Schema.Types.ObjectId]
});

exports.PublicationModel = mongoose.model('publication', PublicationSchema);
exports.UserModel = mongoose.model('user', UserShema);