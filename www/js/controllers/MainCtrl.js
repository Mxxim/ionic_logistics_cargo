/**
 * Created by sammy on 2016/5/8.
 */


define([],function(){
  'use strict';
  function mainCtrl($scope,$state,storageService ){

    console.log("---------------enter mainCtrl------------------");

    var storageKey = 'user';
    var _this =this;

    _this.showloading = true;
    _this.cargos = [];

    var  user = storageService.get(storageKey);

    var jump = function(name){
      console.log(name);
    }



  }

  return mainCtrl;
});
