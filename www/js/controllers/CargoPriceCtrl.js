/**
 * Created by sammy on 2016/5/7.
 */

define([],function(){
  'use strict';
  function cargoPriceCtrl($scope,$state,$ionicLoading,$ionicPopup,$stateParams,BaiduMapService,cargoService ){

    console.log("---------------enter cargoPriceCtrl------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------cargoPriceCtrl销毁------------------");
    })

    var cargo = $stateParams.cargo;
    var pointA = cargo.from,
         pointB = cargo.to;

    var _this = this;
    _this.showloading = true;

    console.log(cargo);

    // 初始化页面数据
    BaiduMapService.getDistance(pointA,pointB).then(function(data){
      _this.showloading = false;
      cargo.price = cargoService.getPrice(data.distance,cargo.load);
      _this.distance = data.distance;
      _this.cargo = cargo;
    });

    // 确认发布
    _this.publish = function(obj){
      cargoService.addCargo(obj).then(function(res){
        console.log(res);
        if(res.code == 1){
          // An alert dialog
          //$scope.showAlert = function() {
            var alertPopup = $ionicPopup.alert({
              title: '系统提示',
              template: '<p class="assertive text-center">发布成功！已将货源信息推送给优质司机！</p>'
            });

            alertPopup.then(function(res) {
              $state.go("menu.tabs.cargo");
            });
          //};
        }else{
          $ionicLoading.show({
            noBackdrop: true,
            template: res.message,
            duration: 1500
          });
        }

      },function(err){
        console.log(err);
      });
    }

  }

  return cargoPriceCtrl;
});
