function listMoviesController(){
    var movieServices = require('./service');
    var lists = function(req, res){
        res.json("H");
        // movieServices.lists(function success(status, chunk){
        //     res.send(chunk);
        // }, function error(status, e){
        //     res.send(e);
        // });

    };
    return {
        lists: lists
    }
}

module.exports = listMoviesController();