angular.module('orggue')
.directive('routes',function(Config){
  return{
    restrict : 'E',
    replace : true,
    scope: {route : '='},
    templateUrl : Config.baseViews + 'route/index.html',
    controller : function($scope,middleware){
      middleware.eachLoacation({
        url:'/IRONSHEEP-SERVER/services/ruta',
      }, function(data){
        //$scope.error = data.error;
      });
    }
  };
});
