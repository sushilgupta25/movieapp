var movieRepository = function(){
    var mod = angular.module('MovieRepositoryModule', []);
    var config = require('../../../config');
    function MovieRepository($resource, $http, $sce) {
        var url = $sce.trustAsResourceUrl(config.APPLICATION_END_POINT + '/movies');
        var apis = $resource('', '', {
            'list': {   // for now cant use to get movies as certificate doesn't recogize by server with public key
                method: 'GET',  // need to debug why jsonp is not working with $sce.trustAsResourceUrl()
                url: url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });

        apis.http = {
            list: function(params){
                return $http.get(url, {
                    cache: true
                });
            }
        };

        return apis;
    }

    MovieRepository.$inject = ['$resource', '$http', '$sce'];
    mod.factory('MovieRepository', MovieRepository);
    return mod;
};


module.exports = movieRepository();