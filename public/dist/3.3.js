webpackJsonp([3],{

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	var movieService = function() {
	    __webpack_require__(26);
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

/***/ },

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	var movieRepository = function(){
	    var mod = angular.module('MovieRepositoryModule', []);
	    var config = __webpack_require__(10);
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

/***/ },

/***/ 27:
/***/ function(module, exports) {

	var messageService = function() {
	    var mod = angular.module('MessageServiceModule', []);

	    function MessageService($interval) {
	        var message = {};   // private property
	        var timer = {};

	        function messageMetaData(text) {
	            this.text = text;

	            this.toJson = function () {
	                return this.text;
	            }
	        }

	        var deleteMessage = function (key) {
	            delete message[key];
	        };

	        var clearTimer = function (key) {
	            if (key in timer) {
	                $interval.cancel(timer[key]);
	                return;
	            }
	        };

	        function hideMessages(key, timeout) {
	            if (timeout) { // @TODO Remove messages after interval not working yet :(
	                var t = $interval(function () {
	                    deleteMessage(key);
	                }, timeout);
	                timer[key] = t;
	            }
	        }

	        var pristineMessageObject = function () {
	            message = {};
	        };

	        var getMessage = function (key, timeout) {  // @TODO: need to hide messages after interval
	            if (key in message) {
	                // hideMessages(key, timeout);
	                return message[key];
	            }
	            return null;
	        };
	        var setMessage = function (key, msg) {
	            // clearTimer(key);    // @TODO remove messages on interval if provided
	            message[key] = new messageMetaData(msg).toJson();
	        };

	        var clearAllMessages = function () {
	            pristineMessageObject();
	        };

	        var handleMessage = function (key) {
	            return {
	                set: function (msg) {
	                    setMessage(key, msg);
	                },
	                get: function (timeout) {
	                    return getMessage(key, timeout);
	                },
	                delete: function () {
	                    deleteMessage(key);
	                },
	                clearAllMessages: function () {
	                    clearAllMessages();
	                }
	            };
	        };

	        return {
	            handleMessage: handleMessage
	        }
	    }

	    MessageService.$inject = ['$interval'];
	    mod.factory('MessageService', MessageService);
	    return mod;
	};
	module.exports = messageService();

/***/ },

/***/ 36:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(37);
	__webpack_require__(25);
	__webpack_require__(27);
	__webpack_require__(39);
	var playMovieController = __webpack_require__(41);
	var mod = angular.module('PlayMovieModule', [
	    'MovieServiceModule',
	    'MessageServiceModule',
	    'FullScreenVideoDirectiveModule'
	]);

	mod.component('playMovieComponent', {
	    name: 'playMovieComponent',
	    template: __webpack_require__(42),
	    controller: playMovieController
	});
	module.exports = mod;

/***/ },

/***/ 37:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(38);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/private/var/www/accedo/server/c02f20fd48f5afaa86a35104e1d2e5ca/node_modules/css-loader/index.js!/private/var/www/accedo/server/c02f20fd48f5afaa86a35104e1d2e5ca/node_modules/autoprefixer-loader/index.js!/private/var/www/accedo/server/c02f20fd48f5afaa86a35104e1d2e5ca/node_modules/sass-loader/index.js!/private/var/www/accedo/server/c02f20fd48f5afaa86a35104e1d2e5ca/public/application/modules/movies/play/style.scss", function() {
			var newContent = require("!!/private/var/www/accedo/server/c02f20fd48f5afaa86a35104e1d2e5ca/node_modules/css-loader/index.js!/private/var/www/accedo/server/c02f20fd48f5afaa86a35104e1d2e5ca/node_modules/autoprefixer-loader/index.js!/private/var/www/accedo/server/c02f20fd48f5afaa86a35104e1d2e5ca/node_modules/sass-loader/index.js!/private/var/www/accedo/server/c02f20fd48f5afaa86a35104e1d2e5ca/public/application/modules/movies/play/style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	exports.push([module.id, "", ""]);

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {var fullScreenVideo = function(){
	    var mod = angular.module('FullScreenVideoDirectiveModule', []);
	    function fullScreenVideoDirective($rootScope, $timeout, RedirectService){    // require jquery
	        return {
	            scope: {
	                url: '@'
	            },
	            template: __webpack_require__(40),
	            link: function(scope, element, attrs){
	                var videoElement = $(element).find("video");
	                function fullScreen(videoElement) { // check if fullScreen api available
	                    if(videoElement.requestFullScreen) {
	                        videoElement.requestFullScreen();
	                    } else if(videoElement.mozRequestFullScreen) {
	                        videoElement.mozRequestFullScreen();
	                    } else if(element.webkitRequestFullScreen) {
	                        videoElement.webkitRequestFullScreen();
	                    }  else {
	                        // throw an exception fullscreen api not available.
	                    }
	                }
	                fullScreen(videoElement); // need to debug why onload player is not fullscreen
	                videoElement.on("ended",function(e){
	                    RedirectService.redirectTo('videoList').with({_id: null});
	                });
	            }
	        }
	    }

	    fullScreenVideoDirective.$inject = ['$rootScope', '$timeout', 'RedirectService'];
	    mod.directive('fullScreenVideoDirective', fullScreenVideoDirective);
	    return mod;
	};
	module.exports = fullScreenVideo();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },

/***/ 40:
/***/ function(module, exports) {

	module.exports = "<video class=\"video_player\"  width=\"100%\" controls=\"controls\" autoplay=\"autoplay\">\n    <source src=\"{{ url }}\"/>\n    Your browser does not support the HTML5 video tag.  Use a better browser!\n</video>";

/***/ },

/***/ 41:
/***/ function(module, exports) {

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

/***/ },

/***/ 42:
/***/ function(module, exports) {

	module.exports = "<div ng-if=\"$ctrl.viewParams.currentMovie\">\n    <full-screen-video-directive\n            url=\"{{$ctrl.viewParams.currentMovie['contents'][0]['url']}}\"\n    ></full-screen-video-directive>\n</div>";

/***/ }

});