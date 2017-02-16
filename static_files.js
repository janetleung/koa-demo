const path = require('path');

const fs = require('mz/fs');

const mime = require('mime');

//处理静态文件
function staticFiles (url, dir) {
    return async function (ctx, next) {
        var f_path = ctx.request.path;
        if (f_path.startsWith(url)) {
            var d_path = path.join(dir, f_path);
            if (await fs.exists(d_path)) {
                ctx.response.type = mime.lookup(f_path);
                ctx.response.body = await fs.readFile(d_path);
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }

    };
};

module.exports = staticFiles;
