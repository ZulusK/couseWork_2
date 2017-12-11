const UserModel = require('@DBmodels').User
const DB = require('@DBcore');

module.exports.create = (username, password, isAdmin) => {
    return DB.create(UserModel, {
        password: password,
        username: username
    })
}
module.exports.get = {
    async byCredentials (username, password) {
        const user = await DB.findOne(UserModel, {username: username});
        if (user && user.comparePasswords(password)) return user;
        else return null;
    },
    async byToken (name, token) {
        const user = (name == 'access') ?
            await DB.findOne(UserModel, {'tokens.access.value': token})
            : await DB.findOne(UserModel, {'tokens.refresh.value': token});
        if (user && user.verifyToken(name, token)) return user;
        else return null;

    }
}