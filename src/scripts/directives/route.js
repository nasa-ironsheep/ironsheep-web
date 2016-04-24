angular.module('orggue')
.directive('oneroute',function(Config){
  return{
    restrict : 'E',
    replace : true,
    scope: {route : '='},
    templateUrl : Config.baseViews + 'element/route.html',
    controller : function($scope,middleware){
      middleware.eachLoacation({
        url:'/IRONSHEEP-SERVER/services/ruta',
      }, function(data){
        //$scope.error = data.error;
      });
    }
  };
});
