var express = require('express');
var router = express.Router();
var url = require('url');
var superagent = require('superagent');
var cheerio = require('cheerio');
var fs = require('fs');

//调用数据库 暂不分层
var server = require('../db/mysql');
var mysql = require('mysql');
var pool = mysql.createPool(server.mysql);
var user = {
    insert: 'insert into visitedInfo(ip) values(?)',
    getOne: 'select * from visitedInfo where ip=?',
    getAll: 'select * from visitedInfo',

    query: function (query, param, callBack) {
        pool.getConnection(function (err, connection) {
            connection.query(query, param, function (err, result) {
                callBack(err, result);
                connection.release();
            });
        });
    }
}


/* GET home page. */
router.get('/', function (req, res, next) {
    var get_res = res;
    var currentPage = url.parse(req.url, true).query.page || 1;
    var totalPage = 5;//暂定写死 5页
    var clientIP =getClientIp(req);//客户端ip
    var visitedNum = 0;
    //查询数据库中所有ip
    user.query(user.getAll, null, function (err, result) {
        visitedNum = result.length;
        //查询数据库中访问者ip
        user.query(user.getOne, clientIP, function (err, result) {
            var l = result.length;
            //如果不存在
            if (l == 0) {
                user.query(user.insert, clientIP, function (err, result) {
                    visitedNum++;
                });
            }
        });
    });

    //获取客户端ip
    function getClientIp(req) {
        return req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
    };


    //爬虫抓取
    var targetUrl = 'https://cnodejs.org/?tab=all&page=' + currentPage;
    superagent.get(targetUrl)
        .end(function (err, res) {
            if (err) {
                return console.error(err);
            }
            var $ = cheerio.load(res.text);
            var topicUrls = [];
            $('#topic_list .topic_title').each(function (idx, element) {
                var $element = $(element);
                var href = url.resolve(targetUrl, $element.attr('href'));
                var title = $element.attr('title');
                topicUrls.push({title: title, href: href});
            });

            //返回页面
            get_res.render('index', {
                title: 'NodeJS',
                html: topicUrls,
                currentPage: currentPage,
                totalPage: totalPage,
                visitNum: visitedNum
            });

        });

});


module.exports = router;
