var index = async function (ctx, next) {
    ctx.response.body = '<h1>Index</h1><form action="/signin" method="post"><p>Name: <input name="name" value="koa"></p><p>Password: <input name="password" type="password"></p><p><input type="submit" value="Submit"></p></form>';
};

var login = async function (ctx, next) {
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log('signin with name: ' + name + ', password:' + password);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = '<h1>Welcome, ${name}!</h1>';
    } else {
        ctx.response.body = '<h1>login in fail!</h1><p><a herf="/">Try again!</a></p>';
    }
};

module.exports = {
    'GET /' : index,
    'POST /signin' : login
};
