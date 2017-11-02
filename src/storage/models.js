const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PublicationSchema = new Schema({
    title: {type:String, default: "New publication"},
    author: String,
    link: String,
    difficult: Number,
    image_id: {type: Schema.Types.ObjectId, default: new mongoose.Types.ObjectId},
    tags: [String],
    text: String,
    description: {type: String, default: ""},
    createdOn: {type: Date, default: Date.now}
});

exports.PublicationModel = mongoose.model('publication', PublicationSchema);