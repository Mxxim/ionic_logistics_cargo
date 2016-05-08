/**
 * Created by sammy on 2016/5/4.
 */

define([],function(){
  'use strict';
  function cargoService($q,$resource,ENV){

    console.log("-----------------enter cargoService----------------");

    function add(cargo){
      return $q(function(resolve,reject){

        console.log(JSON.stringify(cargo));
        if(cargo.from == "" || cargo.to == "" || cargo.load == undefined || cargo.lorryLength == undefined || cargo.lorryType == undefined || cargo.dateTime == "--"){
          reject({message:"字段不能为空"});
        }else{
          $resource(ENV.api+ENV.interface.cargoAdd,{},{
            save : {
              method:"POST"
            }
          }).save(cargo, function(response) {
            resolve(response);
          });
        }
      });
    }

    var getPrice = function(distance,load){
      // 运费规则
      // 市场上分为重货和轻货，并且不同到货地方有不同的运价表，这里我们这算重货，按重量计算价钱，2.7元/公斤，1吨=1000公斤（kg）
      // 计算公式：整批货物运费（元） = 重量（吨）* 重量费用（元/吨）+ 里程（公里）* 重量（吨）* 整批货物运价（元/（吨*公里））

      var dis = parseInt(distance.replace("公里","")),
        weight = parseInt(load);

      var price = 0;  // 630元/吨
      if(dis < 600){     // 小于600公里，按280元/吨，0.8元/（吨*公里）计算
        price = weight * 180 + 0.8 * dis * weight;
      }else{                  // 大于600公里，按300元/吨，0.85元/（吨*公里）计算
        price = weight * 200 + 0.85 * dis * weight;
      }

      return {
        price:price.toFixed(2),
        distance:dis
      };

    };

    function getList(uid){
      return $q(function(resolve,reject){

          $resource(ENV.api+ENV.interface.cargoList,{},{
            query: {
              method: 'POST',
              params: {
                userID: '@userID'
              }
            }
          }).query({
            userID:uid
          },function(res){
            resolve(res);
          });
      });
    }

    return {
      addCargo:add,
      getPrice:getPrice,
      getList:getList
    };

  }

  return cargoService;

});
