angular.module('orggue')
.directive('orgguefooter',function(Config){
  return{
    restrict : 'E',
    replace : true,
    templateUrl : Config.baseViews + 'element/footer.html',
    controller : function($scope){
    }
  };
});
