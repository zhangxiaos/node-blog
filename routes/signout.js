var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

// 登录
router.get('/', checkLogin, function(req, res, next) {
	res.send(req.flalsh());
});

module.exports = router;