var mongoose = require('mongoose');
/*
* @options: options can have additional configuration i.e. {
* ssl:true,
* }
* */
var getConnectionString = function (host, port, username, password, database, options) {
    return "mongodb://{username}:{password}@{host}:{port}/{database}";
};
mongoose.connect(getConnectionString('localhost', 80, "", "", "accedo"));