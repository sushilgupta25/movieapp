function JSON_EXCEPTION(message){
    this.message = message;
    this.type = "JSON_PARSING_EXCEPTION";
}
function JsonParser(){
    var toJson = function(obj){
        try{
            if(angular) {
                return angular.toJson(obj);
            } else {
                return JSON.stringify(obj);
            }
        } catch(e){ // @TODO: need to send data to mongo for analytics
            throw new JSON_EXCEPTION("Unable to stringify json " + e);
            return "{}";
        }
    };
    var fromJson = function(stringify){
        try {
            if(angular){
                return angular.fromJson(stringify);
            } else {
                return JSON.parse(stringify);
            }
        } catch(e){ // @TODO: need to send data to mongo for analytics
            throw new JSON_EXCEPTION("Unable to parse json " + e);
            return {};
        }
    };
    return {
        toJson: toJson,
        fromJson: fromJson
    }
}