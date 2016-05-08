/**
 * Created by xiaomin on 2016/3/30.
 */

//angular.module('starter.cargoCtrl', [])
//
//  .controller('CargoCtrl', function($scope) {
//
//    console.log("------货源-------");
//    $scope.hello = "hello Sammy";
//  })

define([],function(){
  'use strict';
  function cargoCtrl($scope,$rootScope,$ionicLoading,$ionicPopup,$timeout,$state,storageService ){

    console.log("---------------enter cargoCtrl------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------cargoCtrl销毁------------------");
    })
    //*******************初始化******************************
    var _this = this;
    var storageKey = "user";
    _this.cargo = {
      name:"",
      load:"",
      dateTime:"",
      lorryType:"",
      lorryLength:"",
      text:"",
      price:""
    };
    _this.lorryLength = [3,3.6,4,4.2,4.8,5,5.2,5.8,6.2,6.5,6.8,7.2,7.6,7.8,8,8.6,9.6,10,11.5,12,13,13.5,
                          15,16,16.5,17,17.5,18.5,20,21,22];
    _this.lorryType = ['平板车','高栏车','集装车','厢式车','半封闭','单桥车','双轿车','冷藏车','轿车运输车','特种车','大件车','危险品车','封闭车',
                        '半挂车','商品运输车','挂车','爬梯车','可拼车','低栏车','半挂一拖二','半挂一拖三','半挂二拖二','半挂二拖三','前四后四','前四后六',
                        '前四后八','前四后十','五轮车','后八轮','罐式车','自卸车','棉被车','其他'];

    //*********提交的数据**************
    var postData = {};


    var us = storageService.get(storageKey);
    if(us != undefined){
      $rootScope.userInfo =us;
    }
    $rootScope.hideTabs = ' ';


    //
    //
    //_this.address = {
    //  city:"",
    //  area:""
    //}
    // 发布货源
    _this.add = function(from,to,date,cargo){
      var user = storageService.get(storageKey);
      if(user == null){
        $ionicLoading.show({
          noBackdrop: true,
          template: "请先登录......",
          duration: 2000
        });
      }else{

        if(from == "" || to == "" || cargo.name == "" || cargo.load == "" || cargo.lorryLength == "" || cargo.lorryType == "" || cargo.dateTime == "--"){
          $ionicLoading.show({
            noBackdrop: true,
            template: "字段不能为空...",
            duration: 2000
          });
        }else{
          var cargo_date = date.year+"-"+date.month+"-"+date.day;
          var userID = user.id;
          postData = {
            userID:userID,
            from:from,
            to:to,
            dateTime:cargo_date,
            name:cargo.name,
            load:cargo.load,
            lorryType:cargo.lorryType,
            lorryLength:cargo.lorryLength,
            text:cargo.text
            //,
            //price:price   // 调用百度地图计算两点距离
          };
          $state.go('menu.tabs.cargoPrice',{cargo:postData});
        }
      }
    }


  }

  return cargoCtrl;
});
