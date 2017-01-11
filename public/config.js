function Config(){
    var APPLICATION_END_POINT = "https://demo2697834.mockable.io";
    var API_STATUS = {
        SUCCESS: 0,
        ERROR: -1
    };
    var APPLICATION_MODE = 'dev';
    var LOGGING_LEVEL = ['info','warning'];
    function getApplicationMode(){
        return APPLICATION_MODE;
    }
    function getLoggingLevel(){
        return LOGGING_LEVEL;
    }
    function StateNotFound(message){
        this.message = message;
        this.name = "StateNotFoundException";
    }
    function getUIStates(state){
        var states = {
            '404': {
                'state': '404',
                'url': '/404'
            },
            'videos': {
                'state': 'videos',
                'url': ''
            },
            'accessDenied': {
                'state': '403',
                'url': '/403'
            },
            'videoList': {
                'state': 'videos.list',
                'url': '/list'
            },
            'videoPlay': {
                'state': 'videos.list.play',
                'url': '/play/:_id'
            }
        };
        if(!states[state]){
            throw new StateNotFound("State not found")
        } else {
            return states[state];
        }
    }
    return {
        getUIStates: getUIStates,
        APPLICATION_END_POINT: APPLICATION_END_POINT,
        API_STATUS: API_STATUS,
        APPLICATION_MODE: APPLICATION_MODE,
        getLoggingLevel: getLoggingLevel
    }
}

module.exports = Config();