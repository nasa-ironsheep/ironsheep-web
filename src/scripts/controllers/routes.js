angular.module('orggue')
.controller('routeCtrl',function($scope,middleware,$state,$timeout){
  $scope.routes = [];

  $scope.$on('StartRoute',function(){
    $scope.routes = [];
  });

  $scope.$on('EndRoute',function(err,data){
    angular.forEach(data.route,function(route){

      $timeout(function(){
        middleware.eachLoacation({
          url:'http://10.10.11.64:8080/IRONSHEEP-SERVER-0.1/services/ruta',
          lng: middleware.getFilter('lngDestination'),
          lat: middleware.getFilter('latDestination')
        }, function(data){
          $scope.routes[0].greenZone = data.greenZone;
          $scope.routes[0].weather = data.weather;
          console.log(data);
        });
        $scope.$apply()
      },500);

      $scope.routes.push(route);
      $scope.$apply()
    });
  });
});
