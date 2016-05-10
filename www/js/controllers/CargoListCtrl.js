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

    cargoService.getList(user.id).then(function(data){
      _this.showloading = false;
      _this.cargos = data.cargos;
    },function(err){
      console.log(err);
    });

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
