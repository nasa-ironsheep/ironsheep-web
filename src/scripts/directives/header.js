angular.module('orggue')
.directive('orggueheader',function(Config){
  return{
    restrict : 'E',
    replace : true,
    templateUrl : Config.baseViews + 'element/header.html',
    controller : function($scope,middleware){
    }
  };
});
