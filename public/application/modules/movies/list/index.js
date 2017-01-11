require('./style.scss');
require('../service');
require('../../../services/messageService');
var movieController = require('./controller');
var mod = angular.module('ListMoviesModule', [
    'MovieServiceModule',
    'MessageServiceModule'
]);

mod.component('listMoviesComponent', {
    name: 'listMoviesComponent',
    template: require('./list.html'),
    controller: movieController
});
module.exports = mod;