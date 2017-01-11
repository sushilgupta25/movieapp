function ApplicationConstant(){
    var API_STATUS = {
        SUCCESS: 0,
        ERROR: -1
    };
    function applicationStatus(){
        return API_STATUS;
    }
    return {
        API_STATUS: API_STATUS
    }
}

module.exports = ApplicationConstant();