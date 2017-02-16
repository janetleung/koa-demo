var Pet = require('../Sequelize');

var index = async function (ctx, next) {
    ctx.render('index.html');
};

var register = async function (ctx, next) {
    console.log(ctx.response.status);
    var
        username = ctx.request.body.username,
        password = ctx.request.body.password,
        now = Date.parse(new Date()) / 1000;
    console.log('register with name: ' + username + ', password:' + password);
    var user = await Pet.create({
        username : username,
        password : password,
        createdAt : now,
        updatedAt : now
    });
    if (user) {
        ctx.render('register_success.html');
        console.log('created' + JSON.stringify(user));
    }
};

var login = async function (ctx, next) {
    var
        username = ctx.request.body.username || '',
        password = ctx.request.body.password || '';
    console.log('login with name: ' + username + ', password:' + password);
    var user = await Pet.findAll({
        where : {
            username : username
        },
    });
    var ob = JSON.parse(JSON.stringify(user))[0];
    if (password === ob.password) {
        ctx.render('login_success.html');
    } else {
        ctx.render('login_fail.html');
    }
 };

 var query = async function (ctx, next) {
    var
        username = ctx.request.body.username || '';
    console.log('query with name: ' + username);
    var user = await Pet.findAll({
        where : {
            username : username
        },
    });
    if (user.length === 0) {
        var resf = { query : true } ;
        ctx.response.type = "application/json";
        ctx.body = resf;
    } else {
        var rest = {
            query : false,
            text : "该用户名已被注册！"
        };
        ctx.response.type = "application/json";
        ctx.response.body = rest;
    }
 };

module.exports = {
    'GET /' : index,
    'POST /login' : login,
    'POST /register' : register,
    'POST /query' : query,
};
