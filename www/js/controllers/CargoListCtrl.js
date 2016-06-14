/**
 * Created by sammy on 2016/5/8.
 */

define([],function(){
  'use strict';
  function cargoListCtrl($scope,$state,$ionicLoading,$ionicPopup,$stateParams,storageService,BaiduMapService,cargoService ){

    console.log("---------------enter cargoListCtrl------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------cargoListCtrl销毁------------------");
    })

    var storageKey = 'user';
    var _this =this;

    _this.showloading = true;
    _this.cargos = [];

    var  user = storageService.get(storageKey);
    var userID;

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

    var getList = function(uid){
      _this.showloading = true;
      cargoService.getList(uid).then(function(data){
        if(data.code == 1){
          _this.showloading = false;
          _this.cargos = data.cargos;
        }

      },function(err){
        console.log(err);
      });
    }

    _this.del = function(id){
      showConfirm("是否确定删除货源？",function(){   // 由于没有做后台管理系统，这里假设点击确定以后，运单就被取消了。
        cargoService.deleteCargoInfo(id).then(function(res){
          if(res.code == 1){
            $ionicLoading.show({
              noBackdrop: true,
              template: res.message,
              duration: 500
            });
            getList(user.id);
          }
        },function(err){
          console.log(err);
        });
      });
    }

    getList(user.id);

    //$scope.$on("$ionicView.beforeEnter", function(event, data){
    //  // handle event
    //  //userID = storageService.get(storageKey).id;
    //  user = storageService.get(storageKey);
    //  if(user == "" || user == null || user == undefined){
    //    $state.go("menu.login");
    //  }else{
    //    cargoService.getList(user.id).then(function(data){
    //      _this.showloading = false;
    //      _this.cargos = data.cargos;
    //    },function(err){
    //      console.log(err);
    //    });
    //  }
    //});
  }

  return cargoListCtrl;
});
