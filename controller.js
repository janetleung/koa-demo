const router = require('koa-router')();

function addrouter () {
    var mapping = require(__dirname + '/controllers/url.js');
    for (var url in mapping) {
        if (url.indexOf('GET') == 0) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log('register url mapping: GET ' + path);
        } else if (url.indexOf('POST') == 0) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log('register url mapping: POST ' + path);
        }else {
            console.log('invalid url: ' + url);
        }
    }
};

module.exports = function () {
    addrouter();
    return router.routes();
};
