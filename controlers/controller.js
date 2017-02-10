module exports = function () {
    router.routes()
};

const fs = require('fs');

const router = require('koa-router')();

function addrouter (mapping) {
    for (var url of mapping) {
        if (url.indexOf('GET') == 0) {
            var path = url.substring(4);
            router.get('path', mapping[url]);
            console.log('register url mapping: GET ' + path);
        } else if (url.indexOf('POST') == 0) {
            var path = url.substring(5);
            router.post('path', mapping[url]);
            console.log('register url mapping: POST ' + path);
        }else {
            console.log('invalid url: ' + url);
        }
    }
};


function scan_dir () {
    var files = fs.readdirSync(__dirname + '/controllers');
    var files_js = files.filter(function (file) {
        return file.indexOf('.js') > 0;
    });
    for (var file of files_js) {
        console.log('Process controller: ' + file);
        var mapping = require(__dirname + '/controllers' + file);
        addrouter(mapping);
    }
};
