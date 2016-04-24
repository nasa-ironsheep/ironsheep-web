angular.module('orggue')
.service('api', function($http,$q,Config){
  return {
    call: function(url,params, data, callback, method){
      method = method ? method : 'GET';
      var canceler = $q.defer();

      $http({
        url: Config.apiBase + url,
        headers: {
          'Content-Type': "application/json"
        },
        method : method,
        params : params,
        timeout : canceler.promise,
        data : data
      })
      .success(function(data, status) {
        if (typeof callback == 'function') {
          callback(data);
        }
      });

      return {
        cancel: function(){
          canceler.resolve();
        }
      };
    }
  };
});
