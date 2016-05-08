define(function(require){
  'use strict';
  var services = angular.module('starter.services', ['ngResource']);
  services.factory('storageService',require('services/StorageService'));
  services.factory('BaiduMapService',require('services/BaiduMapService'));
  //controllers.controller('controller名字',require(对应的文件地址));
  services.factory('cargoService',require('services/cargoService'));
  services.factory('userService',require('services/userService'));
  return services;
});
