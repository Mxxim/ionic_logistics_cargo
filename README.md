#用Ionic开发的物流配货App

&emsp;本项目的需求还不是特别完整，并不是一个完成的项目，其主要目的还只是用于学习，适合给想用Ionic做项目的同学做参考。编码方面还有很多地方需要改善，如果您能献上宝贵的建议，不甚感激！

## 简介

&emsp;本项目包括两个客户端，分别是车主端、货主端。服务端代码使用的是**Node.js**，**Express4**框架，数据库采用**MongoDB**，使用**Mongoose**来操作MongoDB数据库。

[物流配货车主端Hybrid App][]主要的功能有：<br/>
1、用户注册、登录，用户上传个人照片。<br/>
2、首页会定位到车主当前城市，然后显示出当前城市的所有货源列表。<br/>
3、搜索货源。（模糊查询）<br/>
4、车主可以对货源进行抢单，抢单操作完成后生成运单。并且服务端会推送一条类似【已有车主接了您的货源】的通知给货主。<br/>
5、添加车辆。<br/>
6、发布车源。<br/>

[物流配货货主端Hybrid App][]主要的功能有：<br/>
1、用户注册、登录，用户上传个人照片。<br/>
2、发布货源，系统会将该货源与系统中未交易的车源进行匹配，然后推送一条类似【您收到一条新的货源】的通知给多个符合条件的车源的车主。<br/>
3、查看运单。<br/>


使用到的关键技术有如下：
- **ionic** - HTML5框架，可以帮助快速打造界面优美的app，基于**AngularJS**与**Cordova**，详细教程参见[ionic官网][]
- **CrossWalk** - 用于提升性能。
- 相机拍照。
- 上传图片到服务端。
- 百度地图定位API。
- 百度地图位置关键词搜索API。
- 百度地图计算两地距离API。
- JPush消息推送。

## 插件安装
首先，为项目添加对应平台，此App主要应用于Android系统，IOS系统暂时不考虑。
>ionic platform add android

其次，插件安装，
###ngCordova
>// ngCordova<br/>
>bower install ngCordova --save

ngCordova官网地址：<http://ngcordova.com/>
###调用手机相机、上传文件插件
>// 相机、文件插件<br/>
>ionic plugin add cordova-plugin-camera<br/>
>ionic plugin add cordova-plugin-file<br/>
>ionic plugin add cordova-plugin-file-transfer<br/>

###调用原生页面切换插件
>// 在项目中调用原生页面切换插件<br/>
>ionic plugin add https://github.com/Telerik-Verified-Plugins/NativePageTransitions#0.6.2<br/>
>// 如果是IOS还要添加<br/>
>ionic plugin add cordova-plugin-wkwebview

原生页面切换插件GitHub地址：<https://github.com/shprink/ionic-native-transitions>
###~~百度地图定位插件(后来没用这个插件了)~~
>// 使用百度地图插件，后来自己修改了这个插件，修改内容后续内容会讲<br/>
>ionic plugin add https://github.com/mrwutong/cordova-qdc-baidu-location --variable API_KEY="API_KEY"

API_KEY为你自己的key，详细教程参考[百度定位SDK][]。另外还需要在build.gradle上添加
```
sourceSets {
                main {
                        jniLibs.srcDirs = ['libs']
                }}
```

###极光推送插件
>// 极光推送插件<br/>
>cordova plugin add jpush-phonegap-plugin --variable API_KEY=your_jpush_appkey

需要到[极光推送官网](https://www.jpush.cn/)注册一个账号，然后到自己的控制台创建一个应用，注意应用名称与项目名称一致，应用包名务必为你项目的包名（可以在config.xml中查看），创建成功后会生成一个appKey，使用这个appKey来安装极光推送插件。
极光推送官网文档：<http://docs.jpush.io/>

###集成Crosswalk

>cordova plugin add cordova-plugin-crosswalk-webview

注意：
- 集成Crosswalk以后，apk比原来大了20MB左右，但是app速度明显比以前快了很多，没那么卡了。
- 在platform/android目录下新建gradle.properties文件，内容为：`android.useDeprecatedNdk =true`，否则放到Android studio中build的时候会报Ndk的错误。

- 在config.xml文件中添加：
``` xml
<!--if you are using Crosswalk > 1.3 please add the following to your  config.xml-->
<preference name="CrosswalkAnimatable" value="true" />
```
Crosswalk官网地址：<https://crosswalk-project.org/>


[物流配货车主端Hybrid App]: https://github.com/Mxxim/ionic_logistics "GitHub地址"
[物流配货货主端Hybrid App]: https://github.com/Mxxim/ionic_logistics_cargo "GitHub地址"
[ionic官网]: http://ionicframework.com/docs/ "ionic官网"
[百度定位SDK]: http://lbsyun.baidu.com/index.php?title=android-locsdk/guide/buildprojec  "百度定位SDK官网"


