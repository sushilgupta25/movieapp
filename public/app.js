'use strict';

require('./css/style.scss');
require('./bower_components/nprogress/nprogress.css');

var config = require('./config');
require('./application/services/apiResponseStatusConstant');
require('./common');
require('./application/services/loaderService');
require('./bower_components/angular-animate/angular-animate');
require('./bower_components/angular-aria/angular-aria');
require('./bower_components/angular-material/angular-material.scss');
require('./bower_components/angular-material/angular-material.min');
require('./application/directives/slideHandlerDirective');
require('../public/application/services/redirectService');
var app = angular.module('AccedoMovies', [
    'ngMaterial',
    'ui.router',
    'oc.lazyLoad',
    'ngResource',
    'LoaderServiceModule',
    'SlideHandlerDirectiveModule',
    'RedirectServiceModule'
]);
angular.module('AccedoMovies')
    .config([
        '$stateProvider',
        '$locationProvider',
        '$urlRouterProvider',
        '$httpProvider',
        '$locationProvider',
        function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {
            (function interceptor(){
                $httpProvider.interceptors.push(['$q', function($q) {
                    return {
                        request: function(config) {
                            if (config.serialize == true) config.data = $.param(config.data);
                            return config || $q.when(config);
                        }
                    }
                }]);
            })();
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state(config.getUIStates('404').state, {
                    url: config.getUIStates('404').url,
                    template: '<div class="alert alert-danger">State not found</div>'
                })
                .state(config.getUIStates('videos').state, {
                    url: config.getUIStates('videos').url,
                    template: '<div ui-view=""></div>'
                })
                .state(config.getUIStates('videoList').state, {
                    url: config.getUIStates('videoList').url,
                    template: '<list-movies-component></list-movies-component>',
                    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                        var deferred = $q.defer();
                        require.ensure([], function (require) {
                            var mod = require('./application/modules/movies/list');
                            $ocLazyLoad.load({
                                name: mod.name
                            });
                            deferred.resolve(mod.component);
                        });

                        return deferred.promise;
                    }]
                })
                .state(config.getUIStates('videoPlay').state, {
                    url: config.getUIStates('videoPlay').url,
                    template: '<play-movie-component></play-movie-component>',
                    resolve: ['$q', '$ocLazyLoad', function($q, $ocLazyLoad) {
                        var deferred = $q.defer();
                        require.ensure([], function (require) {
                            var mod = require('./application/modules/movies/play');
                            $ocLazyLoad.load({
                                name: mod.name
                            });
                            deferred.resolve(mod.component);
                        });

                        return deferred.promise;
                    }]
                });
                if((window.history && window.history.pushState)){
                    $locationProvider.html5Mode(true);
                }

        }]).run(['$q', function ($q) {

        }]);
