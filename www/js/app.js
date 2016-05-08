define([
  'config',
  'services/services',  // 加载services.js，该文件中注明了所有模块的service，因此也会加载各个模块的service文件
  'controllers/controllers', // 加载controllers.js，该文件中注明了所有模块的controller，因此也会加载各个模块的controller文件
  'filters/filters',
  'directives/directive',
],function(){
    'use strict';

  // Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

  function run($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      ////启动极光推送服务
      //window.plugins.jPushPlugin.init();
      ////调试模式
      //window.plugins.jPushPlugin.setDebugMode(true);
      ////接收消息并跳转相应的页面
      //window.plugins.jPushPlugin.openNotificationInAndroidCallback = function (data) {
      //  var obj = JSON.parse(data);
      //  console.log(obj);
      //  var id = obj.extras['cn.jpush.android.EXTRA'].id;
      //  $state.go('appealDetail', {appealid: id});
      //}
    });
  }

  function config($stateProvider, $urlRouterProvider,$ionicConfigProvider,$ionicNativeTransitionsProvider,baiduMapApiProvider) {

    $ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');

    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('center');

    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-back');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-ios-arrow-back');

    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');

    //$ionicConfigProvider.views.forwardCache(true);

    // 设置返回按钮的文字为空
    //$ionicConfigProvider.backButton.previousTitleText(false).text('');


    // 调用原生页面切换，配置 ionic-native-transitions 属性
    $ionicNativeTransitionsProvider.setDefaultOptions({
      duration: 400, // in milliseconds (ms), default 400,
      slowdownfactor: 4, // overlap views (higher number is more) or no overlap (1), default4
      iosdelay: -1, // ms to wait for the iOS webview to update before animation kicks in,default -1
      androiddelay: -1, // same as above but for Android, default -1
      winphonedelay: -1, // same as above but for Windows Phone, default -1,
      fixedPixelsTop: 0, // the number of pixels of your fixed header, default 0 (iOS andAndroid)
      fixedPixelsBottom: 0, // the number of pixels of your fixed footer (f.i. a tab bar), default0 (iOS and Android)
      triggerTransitionEvent: '$ionicView.afterEnter', // internal ionic-native-transitions option
      backInOppositeDirection: true // Takes over default back transition and state backtransition to use the opposite direction transition to go back
    });
// 配置默认页面切换效果
    $ionicNativeTransitionsProvider.setDefaultTransition({
      type: 'slide',
      direction: 'left'
    });
// 配置默认页面返回切换效果
    $ionicNativeTransitionsProvider.setDefaultBackTransition({
      type: 'slide',
      direction: 'right'
    });

    baiduMapApiProvider.version('2.0').accessKey('Dps0i1hOEQcMsbYYFgZKtRE1C4xufIwM');

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      .state('menu', {
        url: '/menu',
        abstract: true, // 抽象的意思就是只有在嵌套state出现的时候才出现，比如menu.tabs,menu.tabs.cargo
        templateUrl: 'templates/user/personal-menu.html'
        //,controller:'MainCtrl'
      })

      // Each tab has its own nav history stack:

      .state('menu.tabs', {
        url: '/tabs',
        views: {
          'menuContent': {
            templateUrl: 'templates/public/tabs.html'
          }
        }
      })

      .state('menu.tabs.cargo', {
        url: '/cargo',
        views: {
          'tab-cargo': {
            templateUrl: 'templates/cargo/tab-cargo.html',
            controller:'CargoCtrl',
            controllerAs:'cargo' // 控制器与$scope绑定，在页面中不再使用{{someObject}} ，而是用{{cargo.someObject}},控制器内用this代替$scope
            //resolve:CargoCtrl.resolve
          }
        }
      })
      .state('menu.tabs.cargoPrice', {
        url: '/cargo/{cargo:json}',
        views: {
          'tab-cargo': {
            templateUrl: 'templates/cargo/pathAndPrice.html',
            controller:'CargoPriceCtrl',
            controllerAs:'cargoPrice' // 控制器与$scope绑定，在页面中不再使用{{someObject}} ，而是用{{cargo.someObject}},控制器内用this代替$scope
            //resolve:CargoCtrl.resolve
            ,params: {
              cargo: null
            }
          }
        }
      })
      .state('menu.cargoList', {
        url: '/cargoList',
        views: {
          'menuContent': {
            templateUrl: 'templates/cargo/cargoList.html',
            controller:'CargoListCtrl',
            controllerAs:'cargoList'
          }
        }
      })

      .state('menu.tabs.order', {
        url: '/order',
        cache:false,  // 不加这个的话每次从“运单记录”返回“找货源”不会触发$destory事件，导致tabs不显示
        views: {
          'tab-order': {
            templateUrl: 'templates/order/myOrder.html',
            controller:'OrderCtrl',
            controllerAs:'order'
          }
        }
      })

      .state('menu.tabs.orderDetail', {
        url: 'order/1',
        views: {
          'tab-order': {
            templateUrl: 'templates/order/orderDetail.html',
            controller:'OrderCtrl',
            controllerAs:'order'
          }
        }
      })

      .state('menu.tabs.message', {
        url: '/message',
        views: {
          'tab-message': {
            templateUrl: 'templates/message/tab-message.html',
            controller:'MessageCtrl',
            controllerAs:'message'
          }
        }
      })

      .state('menu.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/user/login.html',
            controller:'UserCtrl',
            controllerAs:'user'
          }
        }
      })
      .state('menu.register', {
        url: '/register',
        views: {
          'menuContent': {
            templateUrl: 'templates/user/register.html',
            controller:'UserCtrl',
            controllerAs:'user'
          }
        }
      })
      .state('menu.authentication', {
        url: '/authentication',
        views: {
          'menuContent': {
            templateUrl: 'templates/user/authentication.html',
            controller:'UserCtrl',
            controllerAs:'user'
          }
        }
      })
      .state('menu.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'templates/user/settings.html',
            controller:'UserCtrl',
            controllerAs:'user' // 控制器与$scope绑定，在页面中不再使用{{someObject}} ，而是用{{cargo.someObject}},控制器内用this代替$scope
          }
        }
      })




    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/menu/tabs/cargo');

  }

  var app = angular.module('starter', ['ionic','ngBaiduMap', 'starter.config','starter.controllers', 'starter.services','starter.directive','starter.filter','ionic-native-transitions','ngCordova']);

    app.run(run)

    .config(config);

  return app;

});
