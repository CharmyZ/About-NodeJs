/**
 * Created by Administrator on 2015/11/30.
 */
var express = require('express');
var ctrl = require('../controller/login_ctrl');
var router = express.Router();

router.route('/')
    .get(ctrl.load)
    .post(ctrl.login);

module.exports = router;