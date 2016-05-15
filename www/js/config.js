/**
 * Created by xiaomin on 2016/1/10.
 */


// 全局变量的配置（常量）
angular.module('starter.config',[])

    .constant('ENV',{
        "debug" : false,
        "api": "http://192.168.31.156:3000",
        //"api": "http://172.20.10.5:3000",
        'siteUrl':"http://www.phonegap100.com",
        //'imgUrl':"http://www.phonegap100.com/data/attachment/",
        'imgUrl':"http://192.168.31.156:3000/data/image/",
        'version':'1.0.1',
        'interface':{
          signin:'/user/signin',
          signup:'/user/signup',
          authentication:'/user/authentication',
          getById:'/user/getById',
          cargoAdd:'/cargo/add',
          cargoList:'/cargo/getListById',
          getOrderList:"/order/getList"
        }
    })
