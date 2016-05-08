/**
 * Created by sammy on 2016/5/7.
 */
define([],function(){
  'use strict';
  function baiduService($q,baiduMapApi){

    var cityName = "";

    console.log("-----------------enter baiduService----------------");

    function getLocalCity(){
      return $q(function(resolve,reject){
        baiduMapApi.then(function(BMap){

          var localCity = new BMap.LocalCity();

          localCity.get(function(msg) {    // msg.name为当前城市的名称
            cityName = msg.name;
            resolve();
          })

        });
      });
    }


    return {
      getDistance:function(pointA,pointB){
        return $q(function(resolve,reject){

          var data = {
            time:0,
            distance:0
          };

          baiduMapApi.then(function(BMap){

            getLocalCity().then(function(){
              console.log(cityName);

              // 百度地图API功能
              var map = new BMap.Map("l-map");
              map.centerAndZoom(cityName,12);

              //var output = "时间：";
              var searchComplete = function (results){
                //console.log(results);
                if (transit.getStatus() != BMAP_STATUS_SUCCESS){
                  //console.log(transit.getStatus());
                  //console.log("???????????");
                  return ;
                }
                //console.log("!!!!!!!!");
                var plan = results.getPlan(0);
                data.time = plan.getDuration(true);   // 获取时间
                data.distance = plan.getDistance(true); // 获取距离
                //output += plan.getDuration(true) + "\n";                //获取时间
                //output += "总路程为：" ;
                //output += plan.getDistance(true) + "\n";             //获取距离
                resolve(data);
              }

              var transit = new BMap.DrivingRoute(map, {renderOptions: {map: map},
                onSearchComplete: searchComplete,
                onPolylinesSet: function(){
                  //setTimeout(function(){alert(output)},"1000");
                }
              });
              console.log(pointA);
              console.log(pointB);
              transit.search(pointA, pointB);

            });
        });
        });
      }
    };

  }

  return baiduService;

});
