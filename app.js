const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

//请求响应时间
app.use(async function (ctx, next) {
    console.log('Process ' + ctx.request.method + ' ' +ctx.request.url +' ...');
    var
        start = new Date().getTime(),
        time;
    await next();
    time = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', time + 'ms');
});


//处理静态文件
const isProduction = process.env.NODE_ENV === 'production';
if (! isProduction) {
    var staticFiles = require('./static_files');
    app.use(staticFiles('/static/', __dirname));
}

//koa-bodyparser将post返回结果绑定到request.body
app.use(bodyParser());

//应用nunjuncks
const template = require('./nunjucks');
app.use(template('views', {
    noCache : !isProduction,
    watch : !isProduction
}));

//路由
app.use(controller());

app.listen(3001);

console.log('app started at port 30001...');
