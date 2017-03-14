-- phpMyAdmin SQL Dump
-- version 3.4.10.1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2015 年 12 月 02 日 07:27
-- 服务器版本: 5.5.20
-- PHP 版本: 5.3.10

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `nodetest`
--

-- --------------------------------------------------------

--
-- 表的结构 `userinfo`
--

CREATE TABLE IF NOT EXISTS `userinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `nickname` varchar(100) NOT NULL,
  `sex` int(2) DEFAULT NULL,
  `age` int(3) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `desc` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- 转存表中的数据 `userinfo`
--

INSERT INTO `userinfo` (`id`, `username`, `password`, `nickname`, `sex`, `age`, `birthday`, `desc`) VALUES
(1, 'xujiaxin', '123456', 'katte', NULL, NULL, NULL, NULL),
(6, 'xujiaxin3', 'xujiaxin', 'xujiaxin3', NULL, NULL, NULL, NULL),
(7, 'katte', '123456', '攻城狮', NULL, NULL, NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
