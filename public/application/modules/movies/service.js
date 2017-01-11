var movieService = function() {
    require('./repository');
    var mod = angular.module('MovieServiceModule', [
        'MovieRepositoryModule'
    ]);
    function MovieService(MovieRepository) {
        function getMovieList(params) {
            return MovieRepository.http.list();
        }
        var findVideoById = function(entries, id){
            var entry = null;
            var index = null;
            angular.forEach(entries, function (val, key) {
                index++;
                if(val.id == id){   // @TODO: to stop execution we can thrown an exception
                    entry = val;
                }
            });
            return {
                entry: entry,
                index: index
            };
        };
        var findVideoIdByIndex = function(entries, index){

        };
        return {
            getMovieList: getMovieList,
            findVideoById: findVideoById
        };
    }
    MovieService.$inject = ['MovieRepository'];
    mod.service('MovieService', MovieService);
};
module.exports = movieService();