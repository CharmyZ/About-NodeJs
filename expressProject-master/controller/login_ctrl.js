/**
 * Created by Administrator on 2015/11/27.
 */
var model = require('../model/user_model');


var PageMessage = {
    title: '登录页面',
    message: '',
    user:''
}

//登录提交
exports.login = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    model.query(model.getByName, username, function (err, result) {
        var r = result[0];
        if (r) {
            if (password !== r.password) {
                PageMessage.message = '登录密码错误';
                res.render('user/login', PageMessage);
            } else {
                req.session.user = r;
                res.cookie('user', r, {maxAge: 60000});
                PageMessage.user = r;
                PageMessage.message = '';
                res.redirect('/');
            }
        } else {
            PageMessage.message = '用户名不存在';
            res.render('user/login',PageMessage);
        }
    });
}

//登录页加载
exports.load = function (req, res, next) {
    if(req.session.user){
        res.redirect('/');
    }
    PageMessage.user='';
    PageMessage.message='';
    res.render('user/login', PageMessage);
}
