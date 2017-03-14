/**
 * Created by Administrator on 2016/3/4.
 */
var express = require('express');
var client = require('mysql');
var app = express();
//数据库连接
var settings = {
    host:'127.0.0.1',
    user:'root',
    passowrd:'123',
    database:'test',
    port:'3306'
}
//获取数据库对象
function getConnection(client, settings){
    return client.createConnection( settings)
}

//连接数据库
function connectFun(conn){
    conn.connect(function(err, resulet){
        if(err){
            console.log('Connection Error:'+err.message);
            return;
        }
    });
}

//数据库操作
function execQuery(sql, conn, successFun, errFun){
    conn.query(sql, function(err, rows, fields){
        if(err) throw err;
        if(rows.constructor === Array ){
            if(!!rows.length){
                successFun();
            }else{
                errFun();
            }
        }else{
            if(rows.affectedRows === 1){
                succrssFun();
            }else{
                errFun();
            }
        }
    });
}

var exports = {
    client:client,
    settings:settings,
    getConnection:getConnection,
    connectDB:connectFun,
    execQuery:execQuery

};
module.exports = exports;