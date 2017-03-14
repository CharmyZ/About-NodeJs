/**
 * Created by Administrator on 2015/11/27.
 */

var server = require('../config/mysqlServer');
var mysql = require('mysql');
var pool = mysql.createPool(server.mysql);

var user = {
    insert:'insert into userinfo(id,username,password,nickname,sex,age,birthday) values(null,?,?,?,?,?,?)',
    update:'update userinfo set username=?, password=?,desc=? where id=?',
    delete: 'delete from userinfo where id=?',
    getById: 'select * from userinfo where id=?',
    getByName:'select * from userinfo where username=?',
    getAll: 'select * from userinfo',

    query:function(query,param,callBack){
        pool.getConnection(function(err,connection){
            connection.query(query,param,function(err,result){
                callBack(err,result);
                connection.release();
            });
        });
    }
}





module.exports = user;