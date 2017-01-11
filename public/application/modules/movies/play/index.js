require('./style.scss');
require('../service');
require('../../../services/messageService');
require('../../../directives/fullscreenVideoDirective/index');
var playMovieController = require('./controller');
var mod = angular.module('PlayMovieModule', [
    'MovieServiceModule',
    'MessageServiceModule',
    'FullScreenVideoDirectiveModule'
]);

mod.component('playMovieComponent', {
    name: 'playMovieComponent',
    template: require('./play.html'),
    controller: playMovieController
});
module.exports = mod;