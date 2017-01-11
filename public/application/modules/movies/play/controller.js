function PlayMovieController(
    $scope,
    $state,
    MovieService,
    MessageService,
    $q,
    $ocLazyLoad
){
    // [ Variable declaration ]
    var self = this;
    var id = $state.params._id;
    // [ Variable declaration ]

    // [ Bind params to scope ]
    self.viewParams = {
        currentMovie: null,
        messageService: MessageService
    };
    self.getMovieList = getMovieList;
    // [/ Bind params to scope ]

    (function __construct(){
        MessageService.handleMessage('apiError').delete();
    })();

    (function render(){
        getMovieList();
    })();
    function getMovieList(){
        MovieService.getMovieList({}).then(function success(data){  // get this from cache ;)
            var entries = data.data.entries;
            var movieData = MovieService.findVideoById(entries, id);
            if(movieData) {
                self.viewParams.currentMovie = movieData.entry;
            } else {
                // throw an exceoption video not found of invalid id added in url
            }
        }, function error(){
            MessageService.handleMessage('apiError').set('Something went wrong');
        });
    };
}
PlayMovieController.$inject = [
    '$scope',
    '$state',
    'MovieService',
    'MessageService',
    '$q',
    '$ocLazyLoad'
];

module.exports = PlayMovieController;