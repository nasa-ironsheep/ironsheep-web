angular.module('orggue')
.controller('homeCtrl',function($scope,middleware,uiGmapGoogleMapApi,$state){

  $scope.origin="41.665108,-0.8392267";
  $scope.destination="41.661414,-0.7776972";

  //send form
  $scope.sendLocation = function(){
    middleware.setFilter('url','https://maps.googleapis.com/maps/api/directions/json');
    uiGmapGoogleMapApi.then(function(maps){
      orig = [
        parseFloat($scope.origin.split(",")[0]),
        parseFloat($scope.origin.split(",")[1])
      ];
      dest = [
        parseFloat($scope.destination.split(",")[0]),
        parseFloat($scope.destination.split(",")[1])
      ];
      middleware.setFilter('origin', new maps.LatLng(orig[0], orig[1]));
      middleware.setFilter('destination', new maps.LatLng(dest[0],dest[1]));
      middleware.setFilter('region','es');
      middleware.setFilter('lngOrigin',orig[0]);
      middleware.setFilter('latOrigin',orig[1]);
      middleware.setFilter('lngDestination',dest[0]);
      middleware.setFilter('latDestination',dest[1]);
      middleware.location();
      $state.go('routes');
    });
  };
});
