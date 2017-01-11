function CommonService(){
    var resultDTO = function(status, message, result){
        return {
            status: status,
            message: message,
            result: result
        };
    };
    return {
        resultDTO: resultDTO
    }
}

module.exports = CommonService();