let router = require('express').Router();

router.use('/v1/auth', require('@APIv1/auth'));
module.exports = router;