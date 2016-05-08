/**
 * Created by sammy on 2016/4/19.
 */
require.config({
  baseUrl:'js'   //  所有模块所放的目录

});

// 启动项目，若需要启动判断，可以在这里面做扩展
require(['app'],function(app){
  angular.bootstrap(document, [app.name]);  // 去除掉了index.html的ng-app之后，需要我们手动启动angular项目
});
