function MoviesService(){
    var commonUtil = require('../../services/commonUtil');
    var moviesRepository = require('./repository');

    var lists = function(success, error){
        commonUtil.s2sCall(moviesRepository.lists, success, error);
    };
    return {
        lists: lists
    }
}

module.exports = MoviesService();