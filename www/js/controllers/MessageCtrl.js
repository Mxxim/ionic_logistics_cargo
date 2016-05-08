/**
 * Created by sammy on 2016/4/19.
 */

define([],function(){
  'use strict';
  function messageCtrl($scope,$rootScope,$state ){

    console.log("---------------enter messageCtrl------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------messageCtrl销毁------------------");
    })

    var _this = this;
    _this.order = {};

    //$rootScope.hideTabs = ' ';



  }

  return messageCtrl;
});
