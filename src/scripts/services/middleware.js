angular.module('orggue')
.service('middleware',function($http,api,$rootScope,Config,uiGmapGoogleMapApi){
  var backupRoutes = [];

  var filters = {
    url : 'rutas',
    lngDestination : 0,
    latDestination : 0,
    lngOrigin : 0,
    latOrigin : 0,
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
        travelMode: maps.TravelMode['WALKING']
      };

      directionsService.route(request, function(response) {
        if (typeof callback == 'function') {
          callback(response.routes);
        }
      });
    });
  };

  return {
    location : function(){
      $rootScope.$broadcast('StartRoute');
      var send = location(filters, function(data){
        $rootScope.$broadcast('EndRoute', {route: data});
      });
      backupRoutes.push(send);
    },
    eachLoacation : function(params, callback){
      var param = {
        "lng": params.lng,
        "lat": params.lat
      }

      return api.call(params.url,{},[param],function(data){
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
