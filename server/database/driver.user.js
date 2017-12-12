const UserModel = require('@DBmodels').User
const DB = require('@DBcore');

module.exports.create = {
    basic (email, password, isAdmin) {
        return DB.create(UserModel, {
            password: password,
            email: email,
            isAdmin: isAdmin || false
        })
    },
    facebook (profile) {
        return DB.create(UserModel, {
            facebook: {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                avatar: `https://graph.facebook.com/v2.5/${profile.id}/picture?width=256`
            }
        })
    }
}

module.exports.update = {
    facebook (user, profile) {
        if (user.facebook.name != profile.displayName) {
            user.facebook.name = profile.displayName;
        }
        if (user.facebook.name != profile.email) {
            user.facebook.email = profile.emails[0].value;
        }
        return user.isModified() ? user.save() : undefined;
    }
}
module.exports.get = {
    async byCredentials (email, password) {
        const user = await DB.findOne(UserModel, {email: email});
        if (user && user.comparePasswords(password)) return user;
        else return null;
    },
    async byToken (name, token) {
        const user = await UserModel.findById(token.id);
        if (user && user.verifyToken(name, token)) return user;
        else return null;
    },
    async byFacebook (facebookID) {
        const user = await DB.findOne(UserModel, {'facebook.id': facebookID});
        return user;
    }
}