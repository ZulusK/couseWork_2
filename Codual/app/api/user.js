const api = {};
const ObjectID = require('mongoose').Types.ObjectId;
api.setup = (db_users) => async (req, res) => {
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
        console.log(`-error '${e}'`);
        res.status(500).json({success: false});
    }
}

api.index = (db_users, token) => async (req, res) => {
    const token = token;
    if (token) {
        try {
            let users = await db_users.getAll();
            if (users) {
                res.status(200).json(users);
            } else {
                res.status(404).json({success: false});
            }
        } catch (e) {
            res.status(500).json({success: false});
        }
    } else {
        res.status(403).send({success: false, message: 'Unauthorized'});
    }
}

api.signup = (db_users) => async (req, res) => {
    console.log(req.body);
    if (!req.body.username || !req.body.password || !req.body.name) res.json({
        success: false,
        message: 'Please, pass a name,username and password.'
    });
    else {
        try {
            await db_users.create(
                req.body.name,
                req.body.contact,
                'user',
                req.body.username,
                req.body.password);
            res.json({success: true, message: 'Account created successfully',});
        } catch (e) {
            res.status(400).json({success: false, message: 'Username already exists.'});
        }
    }
}
api.update = (users_db) => async (req, res, next) => {
    if (!req.body.values) {
        res.status(400).json({success: false, message: 'values required'}).send();
    } else if (!req.body.target) {
        res.status(400).json({success: false, message: 'target required, use `.` to self-ref'}).send();
    }
    //get fields to update
    if (req.body.target === '.') {
        req.body.target = req.user.id;
    } else {
        req.body.target = new ObjectID.createFromHexString(req.body.target);
    }
    let client = req.user;
    if (((req.body.target === client.id) || client.access === 'admin')) {
        //get target to modify
        try {
            let target = (req.body.target === client.id) ? client : await users_db.getById(req.body.target);
            await target.set(JSON.parse(req.body.values), client.access == 'admin');
            res.status(200).json({success: true}).send();
        } catch (e) {
            console.log('error', e);
            res.status(400).json({success: false, message: "bad field's names or target id"}).send();
        }
    } else {
        res.status(403).json({success: false, message: 'Access denied'}).send();
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
    };
}
api.info = (db_users) => async (req, res, next) => {
    console.log('info', req.user);
    //admin can get access to all users
    if (req.user.access === 'admin') {
        let user = {};
        if (req.body.id && req.body.id != req.user.id) {
            user = db_users.getById(req.body.id);
        } else if (req.body.username && req.body.username != req.user.username) {
            user = db_users.getByUsername(req.body.username);
        } else {
            //get self info
            user = req.user;
        }
        res.json({success: user ? true : false, user: user ? api.collectUserInfo(req.user) : {}}).send();
    } else {
        //user can get only his info
        res.json({success: true, user: api.collectUserInfo(req.user)}).send();
    }
}
module.exports = api;