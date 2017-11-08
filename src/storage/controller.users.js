"use strict";
const mongoose = require('mongoose');
const User = require('./models').UserModel;
const controller = require('./controller');
//create new entity
exports.create = async function (fullname, telegram, login, password, isAdmin) {
    let result = await controller.select('login', login, User);
    if (result && result.length > 0) {
        console.log(result);
        throw `User with such login '${login}' exist`;
    }
    return controller.create({
        fullname: fullname,
        telegram: telegram,
        login: login,
        isAdmin: isAdmin,
        password: password,
        Users: []
    }, User);
}

exports.getAll = function () {
    return controller.getAll(User);
}

exports.getById = function (id) {
    return controller.getById(id, User);
}

exports.size = function () {
    return controller.size(User);
}

exports.remove = function (id) {
    return controller.remove(id, User);
}

exports.find = function (field, value) {
    return controller.find(field, value, User);
}

exports.addPublication = async function (user_id, publ_id) {
    let user = await this.getById(user_id);
    user.publications.push(publ_id);
    return user.save();
}

exports.removePublication = async function (user_id, publ_id) {
    let user = await this.getById(user_id);
    let index = user.publications.indexOf(publ_id);
    if (index >= 0) {
        user.publications.splice(index, 1);
        return user.save();
    }
}

exports.update = async function (id, field, value) {
    if (["", "id"].indexOf(field) !== -1) {
        return;
    }
    return controller.update(id, field, value, User);
}