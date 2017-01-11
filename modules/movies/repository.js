function MoviesRepository(){
    var lists = function(){
        var path = require('path');
        var appPath = process.cwd();
        var key = path.join(appPath, 'certificates/mockable.io.key');
        var cert = path.join(appPath, 'certificates/mockable.io.cer');

        var fs = require('fs');
        var obj = {
            protocol: 'https',
            host: 'demo2697834.mockable.io',
            api: '/movies',
            method: 'get',
            port: 443,
            // key: fs.readFileSync(key),
            // ca: fs.readFileSync(cert),
            headers: {
                'Content-Type': 'application/json'
            }
        };
        return obj;
    };
    return {
        lists: lists()
    }
}

module.exports = MoviesRepository();