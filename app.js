const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

app.use(async function (ctx, next) {
    console.log('Process ' + ctx.request.method + ' ' +ctx.request.url +' ...');
    var
        start = new Date().getTime(),
        time;
    await next();
    time = new Date().getTime() - start;
    ctx.response.set('X-Response-Time', time + 'ms');
});

const isProduction = process.env.NODE_ENV === 'production';
if (! isProduction) {
    var staticFiles = require('./static_files');
    app.use(staticFiles('/static/', __dirname));
}

app.use(bodyParser());

const template = require('./nunjucks');
app.use(template('views', {
    noCache : !isProduction,
    watch : !isProduction
}));

app.use(controller());

app.listen(3001);

console.log('app started at port 30001...');
