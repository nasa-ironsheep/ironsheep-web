angular.module("orggue", ['ui.router','ngRoute','ngAnimate','uiGmapgoogle-maps'])
.constant('Config',{
  apiBase : '',
  baseViews : '../views/',
  api_key : 'AIzaSyBhXutSdckuc_b_0wDIu2_rh1V_T3-Cehc'
})
.config(function(Config,$stateProvider,$urlRouterProvider,$locationProvider,uiGmapGoogleMapApiProvider){
  $stateProvider
  .state('map',{
    url : "/map/{id}",
    controller : 'mapCtrl',
    templateUrl : Config.baseViews + "element/map.html",
    params:{
      id:{squash:true}
    }
  })
  .state('routes',{
    url : "/routes",
    controller : 'routeCtrl',
    templateUrl : Config.baseViews + "element/routes.html"
  })
  .state('home',{
    url : "/",
    controller : 'homeCtrl',
    templateUrl : Config.baseViews + "element/home.html"
  })
  .state('phones',{
    url : "/phones",
    templateUrl : Config.baseViews + "element/phones.html"
  })
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);

  uiGmapGoogleMapApiProvider.configure({
    key: Config.api_key,
    libraries: 'weather,geometry,visualization',
    styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
  });
})
.run(function(middleware){
  middleware.setFilter('url','ruta');
});
