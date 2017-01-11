function CommonUtil(){
    var config = require('../config');
    var s2sCall = function(obj, success, error){
        // obj {protocol, host, api, method, querystring, port, headers, key, cert}



        var querystringHandler = require('querystring');
        var querystringData = '';
        if(obj.querystring){
            querystringData = querystringHandler.stringify(obj.querystring);
        }
        var https = require('https');
        var fs = require('fs');

        var options = {};
        options.hostname = obj.host;
        options.port = obj.port || 80;
        options.path = obj.api + '?' + querystringData;
        options.method = obj.method || 'GET';
        options.headers = obj.headers;
        if(obj.key){
            options.key = obj.key;
        }
        if(obj.cert){
            options.cert = obj.cert;
        }
        if(querystringData) {
            options.headers['Content-Length'] = Buffer.byteLength(querystringData);
            options.headers['content'] = querystringData;
        }
        try {
            var req = https.request(options, function (res) {
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    success(config.applicationStatus().SUCCESS, chunk);
                });
                res.on('error', function (e) {
                    console.log(e.message);
                    error(config.applicationStatus().ERROR, e.message)
                });
            });
        } catch(e){
            console.log(e.message);
            error(config.applicationStatus().ERROR, e.message);
        }
    };
    return {
        s2sCall: s2sCall
    }
}

module.exports = CommonUtil();