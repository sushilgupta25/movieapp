function ListMovieController(
    $scope,
    $state,
    MovieService,
    MessageService,
    $q,
    $ocLazyLoad,
    RedirectService
){
    // [ Variable declaration ]
    var self = this;
    var config = require('../../../../config');
    // [/ Variable declaration ]

    // [ Bind params to scope ]
    self.viewParams = {
        movieData: null,
        messageService: MessageService,
        redirectService: RedirectService,
        slick: {
            onAfterChange: function(selection,index){   // @TODO: have to implement for change event of slide to autoplay video on enter according to key
                console.log(index);
            }
        }
    };

    // [/ Bind params to scope ]

    self.getMovieList = getMovieList;

    (function __construct(){
        MessageService.handleMessage('apiError').delete();
    })();

    (function render(){
        getMovieList();
        keyListnerOnSlider();
    })();

    function getMovieList() {
        MovieService.getMovieList({}).then(function success(data) {
            var deferred = $q.defer();
            require.ensure([], function () {
                require('../../../../bower_components/slick-carousel/slick/slick.scss');
                require('../../../../bower_components/slick-carousel/slick/slick-theme.css');
                require('../../../../bower_components/slick-carousel/slick/slick');
                require('../../../../bower_components/angular-slick/dist/slick');

                $ocLazyLoad.load([{
                    name: 'slick'
                }]);
                self.viewParams.movieData = data.data;
                deferred.resolve();
            });
        }, function error() {
            MessageService.handleMessage('apiError').set('Something went wrong');
        });
    }
    function keyListnerOnSlider(){
        $scope.$on('SLIDER_KEYPRESS', function(e, data){
            var index = parseInt($state.params._id, 10) || 0;
            var keypress = data.data;
            if(index == 0){
                if(keypress == "next"){
                    index += 1;
                }
            } else if(index >= 1){
                if(keypress == "next"){ // @TODO: need to check if list is at end of index.
                    index += 1;
                } else {
                    index -= 1;
                }
            }
            RedirectService.redirectTo('videoPlay').with({
                _id: index
            });
        })
    }
}
ListMovieController.$inject = [
    '$scope',
    '$state',
    'MovieService',
    'MessageService',
    '$q',
    '$ocLazyLoad',
    'RedirectService'
];

module.exports = ListMovieController;