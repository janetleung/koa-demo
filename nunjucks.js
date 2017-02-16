const nunjucks = require('nunjucks');

//创建Env，并设置参数
function creatEnv (path, opts) {
    var
        autoescape = opts.autoescape && ture,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path || 'views', {
                noCache : noCache,
                watch : watch,
            }), {
                autoescape : autoescape,
                throwOnUndefined : throwOnUndefined,
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addfliter(f, opts.filters[f]);
        }
    }
    return env;
};

//添加render函数，模板渲染页面输出
function template (path, opts) {
    var env = creatEnv(path, opts);
    return async function (ctx, next) {
        ctx.render = function (view, model) {
            ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = 'text/html';
        };
        await next();
    };
};

module.exports = template;
