const api = {};

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
            res.json({success: true, message: 'Account created successfully', });
        } catch (e) {
            res.status(400).json({success: false, message: 'Username already exists.'});
        }
    }
}

api.update = (db_users) => async (req, res) => {
    console.log(req.user);
    try {
        if (req.body.username) {

        }
    } catch (e) {
        res.status(500).json('Error at set');
    }
    res.json('ok');
}
module.exports = api;