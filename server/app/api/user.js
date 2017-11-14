const api = {};
const ObjectID = require('mongoose').Types.ObjectId;
const userDB = require("@CodualDB/controllers/controller.user");


api.setup = async (req, res) => {
    try {
        await db_users.create(
            "admin",
            "#",
            "admin",
            "admin",
            "admin"
        );
        console.log('Admin account was succesfully set up');
        res.json({success: true});
    } catch (e) {
        // console.log(`-error '${e}'`);
        res.status(500).json({success: false});
    }
}

api.signup = async (req, res) => {
    // console.log(req.body);
    try {
        if (!req.body.username || !req.body.password || !req.body.name) {
            res.status(400).json({
                success: false,
                message: 'Please, pass a name,username and password.'
            }).end();
        }
        if (!userDB.verifyPassword(req.body.password)) {
            res.status(400).json({
                success: false,
                message: 'Please, use only characters A-z, 0-9 in your password, it should contain more than 8 symbols'
            }).end();
        }
        if (!userDB.verifyPassword(req.body.username)) {
            res.status(400).json({
                success: false,
                message: 'Username should start with A-z, and contains only characters _, A-z, 0-9 at all'
            }).end();
        }
        if (!userDB.verifyName(req.body.name.trim)) {
            res.status(400).json({
                success: false,
                message: 'Please, use only letters in your name'
            }).end();
        }
        else {
            try {
                await db_users.create(
                    req.body.name.trim(),
                    req.body.contact,
                    'user',
                    req.body.username,
                    req.body.password);
                res.json({success: true, message: 'Account created successfully',}).end();
            } catch (e) {
                res.status(400).json({
                    success: false,
                    message: `This username ${req.body.username.trim()}already exists.`
                }).end();
            }
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: `Smth going wrong`
        }).end();
    }
}

function getTarget (req) {
    if (!req.body.target) {
        throw null;
    } else {
        if (req.body.target === '.') {
            return req.user.id;
        } else {
            return new ObjectID.createFromHexString(req.body.target);
        }
    }
}

api.update = (userDB) => async (req, res, next) => {
    if (!req.body.values) {
        res.status(400).json({success: false, message: 'values required'}).send();
    }
    //get fields to update
    let targetid = "";
    try {
        targetid = getTarget(req);
    } catch (err) {
        res.status(400).json({success: false, message: 'target required, use `.` to self-ref'}).send();
    }
    let client = req.user;
    if (((targetid === client.id) || client.access === 'admin')) {
        //get target to modify
        try {
            let target = (targetid === client.id) ? client : await userDB.getById(targetid);
            await target.set(JSON.parse(req.body.values), client.access == 'admin');
            return res.status(200).json({success: true}).send();
        } catch (e) {
            console.log('error', e);
            return res.status(400).json({success: false, message: "bad field's names or target id"}).send();
        }
    } else {
        return res.status(403).json({success: false, message: 'Access denied'}).send();
    }
}
api.placeholder = "none";

api.collectUserInfo = (user) => {
    return {
        username: user.username || api.placeholder,
        name: user.name || api.placeholder,
        contact: user.contact || api.placeholder,
        access: user.access || api.placeholder,
        publications: user.publications || api.placeholder,
        id: user.id || api.placeholder
    };
}
api.info = async (req, res, next) => {
    // console.log('info', req.user);
    //admin can get access to all users
    try {
        if (req.user.access === 'admin') {
            let user = {};
            if (req.body.id && req.body.id != req.user.id) {
                user = await userDB.getById(req.body.id);
            } else if (req.body.username && req.body.username != req.user.username) {
                user = await userDB.getByUsername(req.body.username);
            } else {
                //get self info
                user = req.user;
            }
            return res.json({success: user ? true : false, user: user ? api.collectUserInfo(user) : {}}).send();
        } else {
            //user can get only his info
            return res.json({success: true, user: api.collectUserInfo(req.user)}).send();
        }
    }
    catch (e) {
        return res.status(400).json({success: false, message: "bad id"}).send();
    }
}
api.delete = async (req, res, next) => {
    let targetid = "";
    try {
        targetid = getTarget(req);
    } catch (err) {
        return res.status(400).json({success: false, message: 'target required, use `.` to self-ref'}).send();
    }
    let client = req.user;
    if (((targetid === client.id) || client.access === 'admin')) {
        //get target to modify
        try {
            await userDB.removeById(targetid);
            return res.status(200).json({success: true}).send();
        } catch (e) {
            console.log('error', e);
            return res.status(400).json({success: false, message: "bad target id"}).send();
        }
    } else {
        return res.status(403).json({success: false, message: 'Access denied'}).send();
    }
}

api.list = async (req, res, next) => {
    // console.log('list', req.user);
    //admin can get access to all users
    if (req.user.access === 'admin') {
        try {
            let pagination = await userDB.getAll(req.body.page, req.body.limit, {username: 1});
            let users = pagination.docs;
            let resultJSON = [];
            users.forEach((data) => {
                resultJSON.push(api.collectUserInfo(data));
            });
            return res.json({
                success: true,
                count: resultJSON.length,
                page: pagination.page,
                limit: pagination.limit,
                total: pagination.total,
                items: resultJSON
            }).send();
        } catch (e) {
            console.log(e);
            return res.status(400).json({success: false}).send();
        }
    } else {
        //user can get only his info
        return res.status(403).json({success: false, message: "Access denied"}).send();
    }
}
module.exports = api;