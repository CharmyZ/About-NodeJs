var express = require('express');
var ctrl = require('../controller/index_ctrl');
var router = express.Router();


/* GET home page. */
router.route('/')
    .get(ctrl.load);
router.route('/logout')
    .get(ctrl.logout);

module.exports = router;



