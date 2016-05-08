
define(function(require){
  'use strict';
  var services = require('services/services');
  var controllers = angular.module('starter.controllers', []);
  //controllers.controller('controller名字',require(对应的文件地址));
  //controllers.controller('MainCtrl',require('controllers/MainCtrl'));
  controllers.controller('CargoCtrl',require('controllers/CargoCtrl'));
  controllers.controller('CargoPriceCtrl',require('controllers/CargoPriceCtrl'));
  controllers.controller('CargoListCtrl',require('controllers/CargoListCtrl'));
  controllers.controller('OrderCtrl',require('controllers/OrderCtrl'));
  controllers.controller('MessageCtrl',require('controllers/MessageCtrl'));
  controllers.controller('UserCtrl',require('controllers/UserCtrl'));

  // 放在第一会报MainCtrl is not function的错误
  //controllers.controller('MainCtrl',require('controllers/MainCtrl'));
  return controllers;
});
