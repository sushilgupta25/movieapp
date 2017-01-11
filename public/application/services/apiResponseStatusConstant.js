var API_RESPONSE_STATUS_CONSTANT = {
    OK: 200,
    NOT_AUTHENTICATED: 401,
    NOT_FOUND: 404,
    ACCESS_DENIED: 403,
    INTERNAL_SERVER_ERROR: 500
};
function API_RESPONSE_CODE_EXCEPTION(message){
    this.name = "API_RESPONSE_CODE_EXCEPTION";
    this.message = message;
}
function apiResponseStatusConstant(){
    var Ok = function(status){
        return (status == API_RESPONSE_STATUS_CONSTANT.OK);
    };
    var NotAuthenticated = function(status){
        return (status == API_RESPONSE_STATUS_CONSTANT.NOT_AUTHENTICATED);
    };
    var NotFound = function(status){
        return (status == API_RESPONSE_STATUS_CONSTANT.NOT_FOUND);
    };
    var AccessDenied = function(status){
        return (status == API_RESPONSE_STATUS_CONSTANT.ACCESS_DENIED);
    };
    var InternalServerError = function(status){
        return (status == API_RESPONSE_STATUS_CONSTANT.INTERNAL_SERVER_ERROR);
    };
    return {
        Ok: Ok,
        NotAuthenticated: NotAuthenticated,
        NotFound: NotFound,
        AccessDenied: AccessDenied,
        InternalServerError: InternalServerError
    }
}

module.exports = apiResponseStatusConstant();