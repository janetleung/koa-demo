const Koa = require('koa');

const router = require('koa-router')();

const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(async function (ctx, next) {
    console.log('Process ' + ctx.request.method + ' ' +ctx.request.url +' ...');
    await next();
});

app.use(bodyParser());

router.get('/hello/:name', async function (ctx, next) {
    var name = ctx.params.name;
    ctx.response.body = '<h1>Hello, ' + name + '!</h1>';
});

router.get('/', async function (ctx, next) {
    ctx.response.body = '<h1>Index</h1><form action="/signin" method="post"><p>Name: <input name="name" value="koa"></p><p>Password: <input name="password" type="password"></p><p><input type="submit" value="Submit"></p></form>';
});

router.post('/signin', async function (ctx, next) {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log('signin with name: ' + name + ', password:' + password);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = '<h1>Welcome, ${name}!</h1>';
    } else {
        ctx.response.body = '<h1>login in fail!</h1><p><a herf="/">Try again!</a></p>';
    }
});

app.use(router.routes());

app.listen(3001);

console.log('app started at port 30001...');
