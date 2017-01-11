var fullScreenVideo = function(){
    var mod = angular.module('FullScreenVideoDirectiveModule', []);
    function fullScreenVideoDirective($rootScope, $timeout, RedirectService){    // require jquery
        return {
            scope: {
                url: '@'
            },
            template: require('./index.html'),
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