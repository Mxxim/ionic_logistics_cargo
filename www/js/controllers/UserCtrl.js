/**
 * Created by xiaomin on 2016/3/30.
 */

define([],function(){
  'use strict';
  function userCtrl($scope,$ionicLoading,$state,$ionicActionSheet,$rootScope,$cordovaFileTransfer,storageService,userService,ENV){

    console.log("---------------enter userCtrl------------------");
    $scope.$on('$destroy',function(){
      console.log("---------------userCtrl销毁------------------");
    })

    var _this =this;
    var storageKey = "user";

    _this.user = {
      username:"",
      password:"",
      re_password:"",
      type:""
    };

    // 用户登录
    _this.signin = function(type){
      userService.signin(_this.user.username,_this.user.password,type)
        .then(function(res){
          console.log(res);
          if(res.code != 1){
            $ionicLoading.show({
              noBackdrop: true,
              template: res.message,
              duration: 1500
            });
          }else{
            storageService.set(storageKey,res.user);
            $rootScope.userInfo = storageService.get(storageKey);
            $state.go('menu.tabs.cargo');  //路由跳转
          }

        },function(res){
          $ionicLoading.show({
            noBackdrop: true,
            template: res.message,
            duration: 1500
          });
        });
    }

    // 退出登录
    _this.logout = function(){
      // 在安卓端下显示不正常，注释ionic.css代码
      // Show the action sheet
      $ionicActionSheet.show({
        destructiveText: '退出登录',
        titleText: '确定退出当前登录账号么？',
        cancelText: '取消',
        cancel: function() {
          // add cancel code..
        },
        destructiveButtonClicked: function() {
          storageService.remove(storageKey);
          $rootScope.userInfo = storageService.get(storageKey);
          $state.go('menu.tabs.cargo');
          return true;
        }
      });
    }

    // 用户注册
    _this.signup = function(type){
      _this.user.type = type;
      userService.signup(_this.user)
        .then(function(res){
          console.log(res);
          if(res.code != 1){
            $ionicLoading.show({
              noBackdrop: true,
              template: res.message,
              duration: 1500
            });
          }else{
            $state.go('menu.login');  //路由跳转
          }

        },function(res){
          $ionicLoading.show({
            noBackdrop: true,
            template: res.message,
            duration: 1500
          });
        });
    }

    _this.image =
    {IDCard:"",
      IDCardBack:"",
      userImage:""};
    //  定义上拉菜单的样式与操作
    _this.showActionSheet = function(type){
      _this.hideSheet = $ionicActionSheet.show({
        buttons:[
          {
            text:"拍照"
          },
          {
            text:"从相册中选择"
          }
        ],
        buttonClicked:function(index){
          //switch(index){
          //case 0:
          _this.addImage(index,type);
          //break;
          //case 1:
          //  _this.addImageFromLib(type);
          //break;
          //}
          return true;
        },
        cancelText:"取消",
        cancel:function(){
          console.log("您执行了取消操作");
          return true;
        }
      });
    }

    // 相机或图库
    _this.addImage = function(index,type){
      _this.hideSheet();
      userService.saveImage(index).then(function(theImage){
        switch(type){
          // 身份证正面
          case 0:
            console.log("--------------0--------------");
            //_this.image.IDCard = theImage;
            _this.image.IDCard = "data:image/jpeg;base64,"+theImage;
            break;
          //  身份证背面
          case 1:
            console.log("--------------1--------------");
            _this.image.IDCardBack = "data:image/jpeg;base64,"+theImage;
            break;
          // 个人近照
          case 2:
            console.log("--------------2--------------");
            _this.image.userImage = "data:image/jpeg;base64,"+theImage;
            break;
        }
      },function(e){
        console.log("error: "+e);
      });
    }

    // 用户认证
    _this.authentication = function (images) {

      console.log("----------images--------------");
      console.log("images = "+JSON.stringify(images));

      var userID = storageService.get(storageKey).id;

      // 只传dataURL给后端去解析
      userService.authentication(images,userID).then(function(res){
        console.log(JSON.stringify(res));
        $ionicLoading.show({
          noBackdrop: true,
          template: res.message,
          duration: 1000
        });
        if(res.code == 1){
          userService.getById($rootScope.userInfo.id)
            .then(function(res){
              console.log(JSON.stringify(res));
              storageService.set(storageKey,res.user);
              $rootScope.userInfo = storageService.get(storageKey);
              $state.go('menu.tabs.cargo');  //路由跳转
            },function(err){
              console.log(err);
            });
        }
      },function(err){
        console.log(err);
      });
    }
  }

  return userCtrl;
});
