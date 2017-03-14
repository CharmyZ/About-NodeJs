/**
 * Created by Administrator on 2015/11/30.
 */
var model = require('../model/user_model');


var PageMessage = {
    title: '注册页面',
    message: '',
    user:''
}

//注册提交
exports.register = function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var nickname = req.body.nickname;
    var sex = req.body.sex;
    var age = req.body.age;
    var birthday = req.body.birthday;
    model.query(model.getByName, username, function (err, result) {
        var r = result[0];
        if (r) {
            PageMessage.message = "用户名存在";
            res.render('user/register', PageMessage);
        } else {
            model.query(model.insert, [username, password, nickname,sex,age,birthday], function (err, result) {
                var user = {
                    username:username,
                    password:password,
                    nickname:nickname,
                    sex:sex,
                    age:age,
                    birthday:birthday
                };
                req.session.user = user;
                res.cookie('user', user, {maxAge: 60000});
                PageMessage.user = user;
                PageMessage.message = '';
                res.redirect('/');
            });
        }
    });
}


//注册页面加载
exports.load = function (req, res, next) {
    if(req.session.user){
        res.redirect('/');
    }
    PageMessage.user='';
    PageMessage.message='';
    res.render('user/register', PageMessage);
}