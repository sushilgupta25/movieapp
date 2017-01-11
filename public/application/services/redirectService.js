var mod = angular.module('RedirectServiceModule', []);
function RedirectService($injector){
    var config = require('../../config');
    var $state = angular.element($("body")).injector().get("$state");   // not sure what it effects :-/

    var redirectTo = function(view){    // @TODO: validation for domain specific redirect
        var params = function(param, additionalParams){   // @TODO: validadate params
            try {
                $state.go(config.getUIStates(view).state, param, additionalParams);
            } catch(e){
                switch(e.name){
                    case 'StateNotFoundException':
                        $state.go(config.getUIStates('404').state, param);
                        break;
                }
            }
        };
        return {
            'with': params
        }
    };
    return {
        redirectTo: redirectTo
    }
}
RedirectService.$inject = ['$injector'];
mod.factory('RedirectService', RedirectService);
module.exports = mod;