"use strict";
const mongoose = require('mongoose'),
    fileType = require("file-type"),
    shortid = require('shortid'),
    Grid = require('gridfs-stream'),
    stream = require('stream');

const imageAllowedTypes = ["png", "jpg", "jpeg", "gif"],
    root = 'images';


let imageStorage;
//create grid to save images
//connect to db

exports.connect = function () {
    try {
        imageStorage = Grid(mongoose.connection.db, mongoose.mongo);
        imageStorage.collection(root);
    } catch (e) {
        console.log(`ERROR AT CONNECT TO IMAGE DB: ${e}`);
    }
}

exports.getAll = function () {
    return new Promise((resolve, reject) => {
        imageStorage.files.find().toArray((err, data) => {
            if (err) {
                console.log(`-GET ALL IMAGE`);
                reject(err);
            } else {
                console.log(`+GET ALL IMAGE`);
                resolve(data);
            }
        });
    });
}

exports.getById = function (id) {
    return new Promise((resolve, reject) => {
        imageStorage.findOne({_id: id, root: root},
            async (err, file) => {
                try {
                    if (err) {
                        console.log(`ERROR FIND IMAGE ${id}`);
                        reject(err);
                    } else if (file === null) {
                        console.log(`-FIND IMAGE ${id}`);
                        reject("Wrong id");
                    } else {
                        file.stream = getImageData(id);
                        console.log(`+FIND IMAGE ${id}`);
                        resolve(file);
                    }
                } catch (e) {
                    reject(e);
                }
            });
    });
}

exports.size = function () {
    return imageStorage.files.find().count();
}

exports.remove = function (id) {
    return new Promise((resolve, reject) => {
        imageStorage.remove({_id: id, root: root}, (err, gridStore) => {
            if (err) {
                console.log(`-REMOVED IMAGE ${id}`);
                reject(err);
            } else {
                console.log(`+REMOVED IMAGE ${id}`);
                resolve();
            }
        });
    });
}

function isImage(file) {
    try {
        return imageAllowedTypes.indexOf(fileType(file.data).ext) !== -1;
    } catch (e) {
        return false;
    }
}

exports.saveImage = function (file) {
    return new Promise(async (resolve, reject) => {
        if (!isImage(file)) {
            reject("File is not an image file");
        }
        let ext = fileType(file.data).ext;
        let newFileName = `${shortid.generate()}.${ext}`;
        var bufferStream = new stream.PassThrough();
        bufferStream.end(file.data);
        //create stream to db
        let id = new mongoose.Types.ObjectId;
        let writeStream = imageStorage.createWriteStream(
            {
                filename: newFileName,
                _id: id,
                mode: 'w', // default value: w
                chunkSize: 1024 * 256,
                content_type: `image/${ext}`,
                root: root,
                createdOn: Date.now()
            });
        if (await bufferStream.pipe(writeStream)) {
            console.log(`+IMAGE SAVED ${id}`);
            resolve(id);
        } else {
            reject("Cannot write to db");
        }
    });
}
exports.isFileExist = function (id) {
    return new Promise((resolve, reject) => {
        imageStorage.exist({_id: id, root: root}, (err, found) => {
            if (err) {
                reject(err);
            } else {
                console.log(`+IMAGE EXIST ${id} ${found}`);
                resolve(found);
            }
        });
    });
}

async function getImageData(id) {
    return imageStorage.createReadStream({_id: id, root: root});
}