/**
 * Created by xiaomin on 2016/1/10.
 */


// 全局变量的配置（常量）
angular.module('starter.config',[])

    .constant('ENV',{
        "debug" : false,
      "api": "http://192.168.31.156:3000",
        //'imgUrl':"http://192.168.31.156:3000/data/image/",
        'version':'1.0.1',
        'interface':{
          signin:'/user/signin',
          signup:'/user/signup',
          authentication:'/user/authentication',
          getById:'/user/getById',
          cargoAdd:'/cargo/add',
          cargoList:'/cargo/getListById',
          cargoDelete:'/cargo/delete',
          getOrderList:"/order/getList",
          cancelOrder:"/order/cancel",
          confirmOrder:"/order/confirm"
        }
    })
