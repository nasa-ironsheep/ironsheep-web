angular.module('orggue')
.service('middleware',function($http,api,$rootScope,Config,uiGmapGoogleMapApi){
  var backupRoutes = [];

  var filters = {
    url : 'rutas',
    lngDestination : 0,
    latDestination : 0,
    origin : '',
    destination : '',
    region : 'es',
  };

  var location= function(filters,callback){
    uiGmapGoogleMapApi.then(function(maps){
      var directionsService = new maps.DirectionsService();

      var request = {
        origin: filters.origin,
        destination: filters.destination,
        region: filters.region,
        travelMode: maps.TravelMode['WALKING'],
        optimizeWaypoints: true
      };

      directionsService.route(request, function(response, StartRoutetus) {
        if (typeof callback == 'function') {
          callback(response);
        }
      });
    });
    //return api.call(filters.url,params,{},function(data){
    //if (typeof callback == 'function') {
    //callback(data);
    //}
    //});
  };

  return {
    location : function(){
      $rootScope.$broadcast('StartRoute');
      var send = location(filters, function(data){
        console.log(data)
        $rootScope.$broadcast('EndRoute', {route: data.routes});
      });
      backupRoutes.push(send);
    },
    eachLoacation : function(params, callback){
      var param = {
        //TODO
      }

      return api.call(params.url,param,{},function(data){
        if (typeof callback == 'function') {
          callback(data);
        }
      },'POST');
    },
    setFilter: function (key, value) {
      filters[key] = value;
    },
    getFilter: function (key) {
      return filters[key];
    },
    getAllFilters: function () {
      return filters;
    },
    filters: filters
  };
});
