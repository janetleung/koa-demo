const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const app = new Koa();

app.use(async function (ctx, next) {
    console.log('Process ' + ctx.request.method + ' ' +ctx.request.url +' ...');
    await next();
});

app.use(bodyParser());

app.use(controller());

app.listen(3001);

console.log('app started at port 30001...');
