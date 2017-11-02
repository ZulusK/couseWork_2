"use strict";
const mongoose = require('mongoose');

let fileType = require("file-type");
let shortid = require('shortid');
let fs = require('fs-promise');
let path = require('path');
var stream = require('stream');
const uploadImageFolder = path.join(__dirname, "..", "public", "images", "publications");
const imageAllowedTypes = ["png", "jpg", "gif"];

//create grid to save images
let ImageModel;
let Images;
//connect to db
exports.connect = function () {
    try {
        let gridfs = require('mongoose-gridfs')({
            collection: 'files',
            model: 'Images',
            mongooseConnection: mongoose.connection
        });
        ImageModel = gridfs.model;
        console.log(mongoose.modelNames());
        Images = mongoose.model('Images');
    } catch (e) {
        console.log("Error: " + e);
        throw e;
    }
}

exports.getAll = function () {
    return Images.find().exec();
}

exports.getById = function (id) {
    return Images.findById(id).exec();
}

exports.size = function () {
    return Images.count();
}

exports.remove = function (id) {
    return new Promise((resolve, reject) => Images.unlinkById(id, (err, unlinkFile) => {
        if (err) reject(err);
        resolve(unlinkFile);
    }));
}

function isImage(file) {
    try {
        return imageAllowedTypes.indexOf(fileType(file.data).ext) !== -1;
    } catch (e) {
        return false;
    }
}

exports.saveImage = function (file) {
    if (!isImage(file)) {
        throw "File is not an image file";
    }
    let ext = fileType(file.data).ext;
    let newFileName = shortid.generate() + '.' + ext;
    var bufferStream = new stream.PassThrough();
    bufferStream.end(file.data);

    return new Promise((resolve, reject) => {
        ImageModel.write({
                filename: newFileName,
                contentType: 'image/*',
                ext: ext
            },
            bufferStream,
            function (error, createdFile) {
                if (error) reject(error);
                else {
                    resolve(createdFile._id);
                }
            }
        )
    });
}


exports.image = function (id) {
    var Grid = require('gridfs-stream');
    var gfs = Grid(mongoose.connection.db, mongoose.mongo);
    var readstream = gfs.createReadStream({
        _id: id
    });
    return readstream;

}
exports.getImage = function (id) {
    return new Promise(async (resolve, reject) => {
        resolve({ext: 'jpg', stream: ImageModel.readById(id)});
        // this.getById(id).then(data => {
        //     if (data == null) reject();
        //     console.log('AAAA');
        //     console.log(ImageModel);
        //     data.stream = ImageModel.readById(id);
        //     console.log(data);
        //     resolve(data);
        // }).catch(e => {
        //     reject(e);
        // })
    });
}