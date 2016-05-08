/**
 * Created by sammy on 2016/4/29.
 */
define([],function(){
  'use strict';
  function storageService(){

    console.log("-----------------enter storageService----------------");

    return {
      set: function(key, data) {
        return window.localStorage.setItem(key, window.JSON.stringify(data)); // 转化为字符串
      },
      get: function(key) {

        return window.JSON.parse(window.localStorage.getItem(key)); // 解析JSON数据，返回一个对象
      },
      remove: function(key) {
        return window.localStorage.removeItem(key);
      }
    };

  }

  return storageService;

});
