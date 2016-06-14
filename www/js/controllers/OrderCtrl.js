/**
 * Created by sammy on 2016/4/17.
 */

define([],function(){
  'use strict';
  function orderCtrl($scope,$rootScope,$state,$timeout,$ionicTabsDelegate,$ionicPopup,storageService,orderService ){

    console.log("---------------enter orderCtrl------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------orderCtrl销毁------------------");
    })

    var storageKey = "user";
    var user = storageService.get(storageKey);
    var _this = this;
    _this.orders = [];
    _this.deliveryList = [];
    _this.showloading = true;

    $rootScope.hideTabs = ' ';
    //
    //_this.toDetail = function(){
    //  console.log("toDetail");
    //  //$state.go("menu.orderDetail");
    //  $state.go("menu.tabs.orderDetail");
    //}

    // 0表示已取消，1表示配送中，2表示配送完成
    var listByType = function(type,callback){
      orderService.getList(user.id,type).then(function(res){
        console.log(res);
        if(res.code == 1){
          //_this.orders = res.orders;
          callback(res.orders);
        }
      },function(err){
        console.log(err);
      });
    }

    // 已完成
    _this.finish = function(){
      _this.finishList = [];
      _this.showloading = true;

      $ionicTabsDelegate.$getByHandle('my-handle').select(0);
      listByType(2,function(orders){

        var items = [];
        var yearObj = {};

        orders.forEach(function(item){
          var year = item.createTime.split("-")[0];
          var month = parseInt(item.createTime.split("-")[1]);
          var i;
          for(i = 0;i<items.length;i++){
            if(items[i].year == year){          //已经有这个年份的数据
              yearObj.yList[month].push(item);
              break;
            }
          }
          if(i == items.length){                  // 没有这个年份的数据
            yearObj = {};
            yearObj.year = year;
            yearObj.yList = [];

            for(var j = 0;j<12;j++){        // 初始化月份
              yearObj.yList[j] = [];
            }

            yearObj.yList[month].push(item);     // 将该月的第一个数据存入

            items.push(yearObj);
          }
        });

        _this.finishList = items;
        var timer = $timeout(
          function() {
            _this.showloading = false;
            $timeout.cancel(timer);
          },
          500
        );
      });
    };

    // 配送中
    _this.delivery = function(){
      _this.showloading = true;

      $ionicTabsDelegate.$getByHandle('my-handle').select(1);
      listByType(1,function(orders){
        _this.deliveryList = orders;
        var timer = $timeout(
          function() {
            _this.showloading = false;
            $timeout.cancel(timer);
          },
          500
        );
      });
    }

    // 已取消
    _this.canceled = function(){
      _this.canceledList = [];
      _this.showloading = true;

      $ionicTabsDelegate.$getByHandle('my-handle').select(2);
      listByType(0,function(orders){
        _this.canceledList = orders;
        var timer = $timeout(
          function() {
            _this.showloading = false;
            $timeout.cancel(timer);
          },
          500
        );
      });
    }

    // A confirm dialog
    var showConfirm = function(str,callback) {
      var confirmPopup = $ionicPopup.confirm({
        title: '提示信息',
        template: str,
        cancelText:"取消",
        okText:"确定"
      });

      confirmPopup.then(function(res) {
        if(res) {
          callback();
        } else {
          console.log('You are not sure');
        }
      });
    };

    // An alert dialog
    var showAlert = function(str) {
      var alertPopup = $ionicPopup.alert({
        title: '提示信息',
        template: str
      });

      alertPopup.then(function(res) {
        console.log('Thank you for not eating my delicious ice cream cone');
      });
    };

    // 申请退单
    _this.cancel = function(id){
      showConfirm("是否确定取消运单？",function(){   // 由于没有做后台管理系统，这里假设点击确定以后，运单就被取消了。
        orderService.cancel(id).then(function(res){
          if(res.code == 1){
            showAlert("您的运单已取消");
            listByType(1,function(orders){
              _this.deliveryList = orders;
              _this.showloading = true;
              var timer = $timeout(
                function() {
                  _this.showloading = false;
                  $timeout.cancel(timer);
                },
                500
              );
            });
          }else{
            showAlert("操作失败！");
          }

        },function(err){
          console.log(err);
        });

      });
    }

    // 确认收货
    _this.confirm = function(id){
      showConfirm("是否确定收货？",function(){
        orderService.confirm(id).then(function(res){
          if(res.code != 1){
            showAlert("操作失败！");
          }else{
            listByType(1,function(orders){
              _this.deliveryList = orders;
              _this.showloading = true;
              var timer = $timeout(
                function() {
                  _this.showloading = false;
                  $timeout.cancel(timer);
                },
                500
              );
            });
          }
        },function(err){
          console.log(err);
        });
      });
    }

    _this.finish();

  }

  return orderCtrl;
});
