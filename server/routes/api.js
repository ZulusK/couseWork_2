let router = require('express').Router();

router.use('/v1/auth', require('@APIv1/auth'));
router.use('/redirect/', (req, res, next) => {
    return res.redirect('127.0.0.1:3000/api/v1/login/facebook/callback');
})
module.exports = router;