
//var ctrl =require('../controller/menu_ctrl');
var model = require('../model/user_model');
var PageMessage={
    title:'主页',
    message:'',
    user:'',
    getEmpty:function (str){
        return str?str:"未填写";
    },
    getPassword:function(str){
        return str?"******":"未填写";
    }
}


exports.load = function (req, res, next) {
    if(req.session.user){
        PageMessage.user = req.session.user;
    }
    else{
        PageMessage.user='';
    }
    model.query(model.getAll,function(err,result){
        PageMessage.list = result;
        res.render('index', PageMessage);
    });
}

exports.logout = function(req,res,next){
    res.clearCookie('user');
    req.session.destroy();
    res.redirect('/');
}

