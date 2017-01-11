var slideHandler = function(){
    var mod = angular.module('SlideHandlerDirectiveModule', []);
    function slideHandlerDirective($rootScope){    // require jquery
        return {
            scope: {
                activeElement: '@'
            },
            template: '',
            link: function(scope, element, attrs){
                try {
                    $(element).on('keypress', function(e){
                        if(e.keyCode == 37){
                            $rootScope.$broadcast('SLIDER_KEYPRESS', {
                                data: 'previous'
                            })
                        }
                        if(e.keyCode == 39){
                            $rootScope.$broadcast('SLIDER_KEYPRESS', {
                                data: 'next'
                            })
                        }
                    })
                } catch (e){

                }
            }
        }
    }

    slideHandlerDirective.$inject = ['$rootScope'];
    mod.directive('slideHandlerDirective', slideHandlerDirective);
    return mod;
};
module.exports = slideHandler();