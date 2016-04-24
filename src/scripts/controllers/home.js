angular.module('orggue')
.controller('homeCtrl',function($scope,middleware){
  $scope.contact = {
    lngDestination : 0,
    latDestination: 0
  };

  $scope.map = {center: {latitude: 51.219053, longitude: 4.404418 }, zoom: 14 };
  $scope.options = {scrollwheel: false};

  //send form
  $scope.sendLocation = function(){
    middleware.setFilter('url','https://maps.googleapis.com/maps/api/directions/json');
    //middleware.setFilter('origin',$scope.contact.latDestination);
    //middleware.setFilter('destination',$scope.contact.lngDestination);
    middleware.setFilter('origin', new maps.LatLng(40.4381311,-3.8196193));
    middleware.setFilter('destination', new maps.LatLng(39.8622699,-4.0344493));
    middleware.setFilter('region','es');
    middleware.location();
  };
});
