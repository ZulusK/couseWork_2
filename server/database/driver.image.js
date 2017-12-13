const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const stream = require('stream');
const Utils = require('@utils');
const config = require('@config');
let ImageModel = null;
const root = 'images';

module.exports = {
    /**
     * connects to mongo DB to store images
     */
    connect () {
        try {
            ImageModel = Grid(mongoose.connection.db, mongoose.mongo);
            ImageModel.collection(root);
        } catch (e) {
            console.log(`-IDB: cannot connect to DB: ${e}`);
        }
        console.log(`+IDB: connected`);
    },
    get: {
        /**
         * returns all files in a store
         * @returns {Promise} array of files
         */
        all () {
            "use strict";
            return new Promise((resolve, reject) => {
                ImageModel.files.find().toArray((err, data) => {
                    if (err) {
                        console.log(`-IDB:get all images`);
                        reject(err);
                    } else {
                        console.log(`+IDB:get all images`);
                        resolve(data);
                    }
                });
            });
        },
        /**
         * search files by query
         * @param query valid mongo query
         * @returns {Promise} array of files
         */
        byQuery (query) {
            return new Promise((resolve, reject) => {
                ImageModel.files.find(query).toArray((err, data) => {
                    if (err) {
                        console.log(`-IDB:get image: ${query}`);
                        reject(err);
                    } else {
                        console.log(`+IDB:get image: ${query}`);
                        resolve(data);
                    }
                });
            });
        },
        /**
         * get file by id
         * @param id id of file
         * @returns {Promise|null} file with such id
         */
        byID (id) {
            return new Promise((resolve, reject) => {
                ImageModel.findOne({_id: id, root: root},
                    (err, file) => {
                        try {
                            if (err) {
                                reject(err);
                            } else if (file === null) {
                                console.log(`-IDB: get by id ${id}`);
                                resolve(null);
                            } else {
                                console.log(`+IDB: get by id ${id}`);
                                resolve(file);
                            }
                        } catch (e) {
                            reject(e);
                        }
                    });
            });
        },
        /**
         * creates stream with file data
         * @param id id of file to read
         * @returns {Stream} stream with file data
         */
        stream (id) {
            return ImageModel.createReadStream({_id: id, root: root});
        }
    },
    /**
     * count of files in storage
     */
    count () {
        return ImageModel.files.find().count();
    },
    remove: {
        /**
         * remove file by it's id
         * @param id if of file
         * @returns {Promise}
         */
        byID (id) {
            return new Promise((resolve, reject) => {
                ImageModel.remove({_id: id, root: root}, (err, gridStore) => {
                    if (err) {
                        console.log(`-IDB: remove image: ${err}`);
                        reject(err);
                    } else {
                        console.log(`+IDB: remove image: ${id}`);
                        resolve(gridStore);
                    }
                });
            });
        }
    },
    /**
     * check is file exist in DB
     * @param id if of file
     * @returns {Promise}
     */
    isExist (id) {
        return new Promise((resolve, reject) => {
            ImageModel.exist({_id: id, root: root}, (err, found) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(found);
                }
            });
        });
    },
    /**
     * save image to DB
     * @param file file to save
     * @param meta addition info of file
     * @return {Promise}
     */
    save (file, meta) {
        return new Promise(async (resolve, reject) => {
            if (!Utils.files.isImage(file)) {
                reject(new Error("File is not an image file"));
            }
            if (file.size > config.MAX_FILE_SIZE) {
                reject(new Error(`Too large file(${Math.round(file.size / 1000) / 1000}Mb), max size is ${Math.round(config.MAX_FILE_SIZE / 1000) / 1000}Mb`))
            }
            let ext = Utils.files.extOf(file.data);
            var bufferStream = new stream.PassThrough();
            bufferStream.end(file.data);
            //create stream to db
            let writeStream = ImageModel.createWriteStream(
                {
                    filename: file.name,
                    mode: 'w', // default value: w
                    chunkSize: 1024 * 256,
                    content_type: `image/${ext}`,
                    root: root,
                    createdAt: Date.now(),
                    metadata: meta
                });
            if (await bufferStream.pipe(writeStream)) {
                console.log(`+DBI:image saved: ${writeStream.id}`);
                resolve(writeStream.id);
            } else {
                reject("-DBO: image didn't saved");
            }
        });

    }
}