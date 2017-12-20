let router = require('express').Router();
const Utils = require('@utils');
const config = require('@config');
router.use('/v1/auth', require('@APIv1/auth'));
router.use('/v1/res', require('@APIv1/res'));
router.use('/v1/publications', require('@APIv1/publications'));
router.use('/v1/users', require('@APIv1/users'));
router.use('/v1/blocks', require('@APIv1/blocks'));
router.get('/v1/docs', async (req, res, next) => {
    res.json({success: true, item: await Utils.fs.read(config.API_DOCS)})
})
module.exports = router;