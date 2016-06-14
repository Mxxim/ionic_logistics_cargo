/**
 * Created by sammy on 2016/5/13.
 */

define([],function(){
  'use strict';

  function orderService($q,$resource,ENV){

    var add = function(userID,cargoID){
      return $q(function(resolve,reject){
        $resource(ENV.api+ENV.interface.addOrder, {}, {
          save: {
            method: 'post'
          }
        }).save({
          cargo:cargoID,
          userID:userID
        },function(res){
          resolve(res);
        });
      });
    }

    var getList = function(userID,state){
      return $q(function(resolve,reject){
        $resource(ENV.api+ENV.interface.getOrderList, {}, {
          getAll: {
            method: 'post'
          }
        }).getAll({
          userID:userID,
          state:state,
          type:0      // 表示货主
        },function(res){
          resolve(res);
        });
      });
    };

    var cancel = function(oid){
      return $q(function(resolve,reject){
        $resource(ENV.api+ENV.interface.cancelOrder, {}, {
          cancel: {
            method: 'post'
          }
        }).cancel({
          oid:oid
        },function(res){
          resolve(res);
        });
      });
    }

    var confirm = function(oid){
      return $q(function(resolve,reject){
        $resource(ENV.api+ENV.interface.confirmOrder, {}, {
          ok: {
            method: 'post'
          }
        }).ok({
          oid:oid
        },function(res){
          resolve(res);
        });
      });
    }

    //var getById = function(cid){
    //  return $q(function(resolve,reject){
    //
    //
    //    $resource(ENV.api+ENV.interface.getCargoById, {}, {
    //      get: {
    //        method: 'post'
    //      }
    //    }).get({
    //      cid:cid
    //    },function(res){
    //      resolve(res);
    //    });
    //  });
    //};
    //
    //var query = function(condition){
    //  return $q(function(resolve,reject){
    //    $resource(ENV.api+ENV.interface.getCargoByCon, {}, {
    //      getAll: {
    //        method: 'post'
    //      }
    //    }).getAll(condition,function(res){
    //      resolve(res);
    //    });
    //  });
    //};

    return{
      getList:getList,
      add:add,
      cancel:cancel,
      confirm:confirm
    }
  }

  return orderService;

});
