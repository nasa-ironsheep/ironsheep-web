angular.module('orggue')
.controller('routeCtrl',function($scope,middleware){
  $scope.routes = [];

  $scope.$on('StartRoute',function(){
    $scope.routes = [];
  });

  $scope.$on('EndRoute',function(err,data){
    angular.forEach(data.route,function(route){
      $scope.routes.push(route);
    });
  });
});
