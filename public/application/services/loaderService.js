var mod = angular.module('LoaderServiceModule', []);
function LoaderService($q) {
    var pendingRequest = 0;
    var interceptor = function(){
        var nprogress = require('../../bower_components/nprogress/nprogress');
        var obj = {
            request: function(config) {
                pendingRequest++;
                nprogress.start();
                return config;
            },
            response: function(response) {
                pendingRequest--;
                if (pendingRequest <= 0) {
                    nprogress.done();
                }
                return response;
            },
            responseError: function(response) {
                pendingRequest--;
                if (pendingRequest <= 0) {
                    nprogress.done();
                }
                return $q.reject(response);
            }
        };
        return obj;
    };
    return interceptor();

}
LoaderService.$inject = ['$q'];
mod.factory('loaderService', LoaderService);
mod.config(['$httpProvider', function($httpProvider){
    $httpProvider.interceptors.push('loaderService');
}]);
module.exports = mod;