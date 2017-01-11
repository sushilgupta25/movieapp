webpackJsonp([4],{

/***/ 20:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(21);
	__webpack_require__(23);
	__webpack_require__(25);
	var movieController = __webpack_require__(26);
	var mod = angular.module('ListMoviesModule', [
	    'MovieServiceModule',
	    'MessageServiceModule'
	]);

	mod.component('listMoviesComponent', {
	    name: 'listMoviesComponent',
	    template: __webpack_require__(33),
	    controller: movieController
	});
	module.exports = mod;

/***/ },

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(22);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(7)(content, {});
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/private/var/www/accedo/server/node_modules/css-loader/index.js!/private/var/www/accedo/server/node_modules/autoprefixer-loader/index.js!/private/var/www/accedo/server/node_modules/sass-loader/index.js!/private/var/www/accedo/server/public/application/modules/movies/list/style.scss", function() {
			var newContent = require("!!/private/var/www/accedo/server/node_modules/css-loader/index.js!/private/var/www/accedo/server/node_modules/autoprefixer-loader/index.js!/private/var/www/accedo/server/node_modules/sass-loader/index.js!/private/var/www/accedo/server/public/application/modules/movies/list/style.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	exports.push([module.id, "", ""]);

/***/ },

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	var movieService = function() {
	    __webpack_require__(24);
	    var mod = angular.module('MovieServiceModule', [
	        'MovieRepositoryModule'
	    ]);
	    function MovieService(MovieRepository) {
	        function getMovieList(params) {
	            return MovieRepository.http.list();
	        }
	        return {
	            getMovieList: getMovieList
	        };
	    }
	    MovieService.$inject = ['MovieRepository'];
	    mod.service('MovieService', MovieService);
	};
	module.exports = movieService();

/***/ },

/***/ 24:
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

/***/ 25:
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

/***/ 26:
/***/ function(module, exports, __webpack_require__) {

	function ListMovieController(
	    $scope,
	    $state,
	    MovieService,
	    MessageService,
	    $q,
	    $ocLazyLoad
	){
	    var self = this;
	    self.viewParams = {
	        movieData: null,
	        messageService: MessageService
	    };
	    MovieService.getMovieList({}).then(function success(data){
	        var deferred = $q.defer();
	        __webpack_require__.e/* nsure */(2, function(){
	            __webpack_require__(27);
	            __webpack_require__(29);
	            __webpack_require__(31);
	            __webpack_require__(32);
	            $ocLazyLoad.load({
	                name: 'slick'
	            });
	            self.viewParams.movieData = data.data;
	            deferred.resolve();
	        });
	    }, function error(){
	        MessageService.handleMessage('apiError').set('Something went wrong');
	    });
	}
	ListMovieController.$inject = [
	    '$scope',
	    '$state',
	    'MovieService',
	    'MessageService',
	    '$q',
	    '$ocLazyLoad'
	];

	module.exports = ListMovieController;

/***/ },

/***/ 33:
/***/ function(module, exports) {

	module.exports = "<md-toolbar class=\"\">\n    <div class=\"md-toolbar-tools\">\n        <h2 class=\"md-flex\">Accedo Movies</h2>\n    </div>\n</md-toolbar>\n\n<md-grid-list md-cols-sm=\"12\">\n    {{$ctrl.viewParams.messageService.handleMessage('apiError').get()}}\n    <div ng-if=\"$ctrl.viewParams.movieData\">\n        <slick class=\"slider single-item\" current-index=\"index\" responsive=\"breakpoints\" slides-to-show=5 slides-to-scroll=1>\n            <div ng-repeat=\"entries in $ctrl.viewParams.movieData.entries\">\n                <a ui-sref=\"videos.list.play({_id:$index})\">\n                    <img ng-src=\"{{ entries.images[0].url }}\" width=\"{{ entries.images[0].width }}\" height=\"{{ entries.images[0].height }}\" title=\"entries.title\" />\n                </a>\n            </div>\n        </slick>\n    </div>\n    <div ui-view=\"\"></div>\n</md-grid-list>";

/***/ }

});