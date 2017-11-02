"use strict";
let fsp = require('fs-promise');
let shortid = require('shortid');
let path = require('path');
let fileType = require("file-type");
const uploadImageFolder = path.join(__dirname, "..", "public", "images", "publications");

const FILE_NAME = "publications.json";
const imageAllowedTypes = ["png", "jpg", "gif"];

function saveStorage(path, storage) {
    storage.lastUpdate = new Date().toISOString();
    return fsp.writeFile(path, JSON.stringify(storage));
}

function Storage() {
    this.currentID = 0;
    this.lastUpdate = new Date().toISOString();
    this.items = [];
}

function getStorage(path) {
    return new Promise((resolve) => {
        fsp.readFile(path)
            .then(data => {
                try {
                    let storage = JSON.parse(data.toString());
                    resolve(storage);
                } catch (e) {
                    resolve(new Storage());
                }
            })
            .catch(() => {
                resolve(new Storage());
            });
    });
}

function Publication(title, author, author_link, date, image_path, tags, difficult, description, text) {
    this.title = title;
    this.author = author;
    this.description = description;
    this.image_path = image_path;
    this.author_link = author_link;
    this.date = new Date(date);
    this.tags = tags.slice();
    this.difficult = difficult;
    this.text = text;
}

function create(title, author, author_link, date, image_path, tags, difficult, description, text) {
    return new Promise((resolve, reject) => {
        let x = new Publication(title, author, author_link, date, image_path, tags, difficult, description, text);
        getStorage(FILE_NAME).then((storage) => {
            x.id = storage.currentID++;
            storage.items.push(x);
            saveStorage(FILE_NAME, storage)
                .then(() => resolve(JSON.stringify(x)))
                .catch((err) => reject("CANNOT SAVE UPDATED STORAGE " + err));
        });
    });
}

function getAll() {
    // return new Promise((resolve, reject) => {
    return getStorage(FILE_NAME)
        .then((storage) => storage.items)
        .catch(() => Promise.reject("CANNOT LOAD STORAGE"));
    //});
}

function findIndex(id, storage) {
    return storage.items.findIndex((e) => {
        if (Number(e.id) === id) {
            return true;
        }
    });
}

function getById(id) {
    return getStorage(FILE_NAME)
        .then((storage) => {
                let index = findIndex(id, storage);
                if (index === -1) {
                    return Promise.reject("NO SUCH ID " + id);
                } else {
                    return storage.items[index];
                }
            }
        )
        .catch(() => Promise.reject("CANNOT LOAD STORAGE"));
}



function update(id, property, value) {
    return new Promise((resolve, reject) => {
        property = property.toLowerCase();
        //check is valid property title
        if (["", "id", "date"].indexOf(property) >= 0) {
            reject("INVALID PROPERTY NAME '" + property + "'");
        }
        if (value === undefined) {
            reject("EMPTY VALUE");
        }
        getStorage(FILE_NAME)
            .then((storage) => {
                    let index = findIndex(id, storage);
                    if (index === -1) {
                        reject("NO SUCH ID " + id);
                    } else if (storage.items[index][property] === undefined) {
                        reject("INVALID PROPERTY NAME");
                    } else {
                        if (property === "tags") {
                            storage.items[index]["tags"] = value.split(" ");
                        } else {
                            storage.items[index][property] = value;
                        }
                        return saveStorage(FILE_NAME, storage).then(() => {
                            resolve("UPDATED");
                        }).catch(() => {
                            reject("CANNOT SAVE STORAGE");
                        });
                    }
                }
            )
            .catch((err) => reject(err));
    });
}

function remove(id) {
    return new Promise((resolve, reject) => {
        getStorage(FILE_NAME).then((storage) => {
                let index = findIndex(id, storage);
                if (index === -1) {
                    reject("NO SUCH ID");
                } else {
                    storage.items[index] = storage.items[storage.items.length - 1];
                    storage.items.pop();
                    saveStorage(FILE_NAME, storage).then(() => {
                        resolve("REMOVED");
                    }).catch(() => {
                        reject("CANNOT SAVE STORAGE");
                    });
                }
            }
        ).catch(() => reject("CANNOT LOAD STORAGE"));
    });
}

async function loadFile(file) {
    try {
        let fileName = file.name;
        let newFileName = shortid.generate() + '.' + fileType(file.data).ext;
        if (imageAllowedTypes.indexOf(fileType(file.data).ext) !== -1) {
            await fsp.writeFile(path.join(uploadImageFolder, newFileName), file.data);
            console.log("___________________________ SAVED FILE " + path.join(uploadImageFolder, newFileName));
            return newFileName;
        } else {
            console.log(`___________________________ FILE IS NOT AN IMAGE`);
            return "";
        }
    } catch (e) {
        console.log(`___________________________ Error: ${e}`);
        return "";
    }
}

module.exports = {
    create: create,
    getById: getById,
    update: update,
    remove: remove,
    getAll: getAll,
    uploadImage: loadFile
};