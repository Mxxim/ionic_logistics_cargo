/**
 * Created by sammy on 2016/4/8.
 */

define([],function(){
  'use strict';
  function userService($resource,$q,$cordovaImagePicker,$cordovaCamera,$cordovaFile,ENV){

    console.log("-----------------enter userService----------------");

    var user,
      storageKey = "user";

    /**
     * 用户登录
     * @param username
     * @param password
     * @param type  0表示车主，1表示货主
       * @returns {*}
       */
    function login(username,password,type){
      return $q(function(resolve,reject){


        if(username == "" || password == ""){
          reject({message:"不能为空"});
        }else{
          $resource(ENV.api+ENV.interface.signin,{},{
            save : {
              method:"POST"
            }
          }).save({
            username: username,
            password: password,
            type:type
          }, function(response) {
            //console.log(response);
            //user=response.result;
            //$rootScope.$emit('User.loginUpdated',{user:response});
            resolve(response);
          });
        }
      });

    }

    /**
     * 用户注册
     * @param user  一个用户对象
     * @returns {*}
       */
    function signup(user){
      return $q(function(resolve,reject){

        if(user.username == "" || user.password == "" || user.re_password == "" ||  user.realName == ""){
          reject({message:"不能为空"});
        }else if(user.password != user.re_password){
          reject({message:"密码不一致"});
        }else{
          $resource(ENV.api+ENV.interface.signup,{},{
            save : {
              method:"POST"
            }
          }).save(user, function(response) {
            resolve(response);
          });
        }
      });
    }

    function makeid(){
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for(var i = 0;i < 5;i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    }

    function saveImage(index){
      return $q(function(resolve,reject){
        var theImage;
        var options = {
          quality: 50,
          //destinationType: Camera.DestinationType.FILE_URI,
          destinationType: Camera.DestinationType.DATA_URL,
          //sourceType: Camera.PictureSourceType.CAMERA,
          allowEdit: false,
          encodingType: Camera.EncodingType.JPEG,
          popoverOptions: CameraPopoverOptions,
          saveToPhotoAlbum: true
        };
        if(index == 0){
          // 拍照
          console.log("------------相机------------");
          options.sourceType = Camera.PictureSourceType.CAMERA;
        }else{
          // 相册
          console.log("------------图库------------");
          options.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
        }
        // 相机插件
        $cordovaCamera.getPicture(options).then(function(imageURI){
          //window.resolveLocalFileSystemURI(imageURI, function (fileEntry) {
          //  console.log("fileEntry: "+JSON.stringify(fileEntry));
          //  console.log("fileEntry.nativeURL: "+fileEntry.nativeURL);
          //
          //  resolve(fileEntry.nativeURL);
          //});
          //console.log("imageURI: "+imageURI);
          //
          resolve(imageURI);

          //var name = imageURI.substr(imageURI.lastIndexOf('/') + 1),
          //  path = imageURI.substr(0,imageURI.lastIndexOf('/') + 1),
          //  newName =  makeid() + name,
          //  newPath = cordova.file.cacheDirectory;
          //
          //console.log("name: "+name);
          //console.log("Path: "+path);
          //console.log("newName: "+newName);
          //console.log("newPath: "+newPath);

          // 拷贝到缓存
          //$cordovaFile.copyFile(path,name,newPath,newName)
          //  .then(function(fileEntry){
          //    console.log("----------success enter copyFile----------------");
          //    console.log(JSON.stringify(fileEntry));
          //    theImage = newPath + newName;
          //    console.log("----------leave copyFile----------------");
          //    resolve(theImage);
          //  },function(e){
          //    console.log("error: "+e);
          //    console.log("----------fail happened copyFile----------------");
          //    reject();
          //  });
        },function(e){
          console.log("error: "+e);
          $ionicLoading.show({template: 'Errore di caricamento...', duration: 3000});
          reject();
        });
      });
    }

    //function saveFromLib(){
    //
    //  return $q(function(resolve,reject){
    //    var theImage;
    //    var options = {
    //      maximumImagesCount: 1
    //    };
    //    $cordovaImagePicker.getPictures(options)
    //      .then(function(results){
    //        console.log("iamge URI: " + results[0]);
    //        theImage = results[0];
    //        resolve(theImage);
    //      },function(e){
    //        console.log("error: "+e);
    //        reject();
    //      });
    //
    //  });
    //}

    /**
     * 用户认证
     * @param images  一个key-value对象
     * @param userID  用户ID
     * @returns {*}
       */
    function authentication(images,userID){
      return $q(function(resolve,reject){

          $resource(ENV.api+ENV.interface.authentication,{},{
            save : {
              method:"POST"
            }
          }).save({
            images: images,
            userID:userID
            //type:type
          }, function(response) {
            resolve(response);
          });
      });
    }

    /**
     * 根据用户ID获取user
     * @param userID
     * @returns {*}
       */
    function getById(userID){
      return $q(function(resolve,reject){

        $resource(ENV.api+ENV.interface.getById,{},{
          save : {
            method:"POST"
          }
        }).save({
          userID:userID
          //type:type
        }, function(response) {
          response.user.userImage = ENV.api+response.user.userImage;
          resolve(response);
        });
      });
    }

    return {
      signin:login,
      signup:signup,
      saveImage:saveImage,
      //saveFromLib:saveFromLib,
      authentication:authentication,
      getById:getById
    };

  }

  return userService;

});
