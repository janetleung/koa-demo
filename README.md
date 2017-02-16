Koa2-demo
==========

用Node编写，基于koa2、nunjucks、Sequelize、mysql的注册/登录系统。

### 安装依赖

```bash
npm install
```

### 进行本地mysql数据库建表

```bash
字段包括：id(autoIncrement、primaryKey)、username(unique)、password、creatdAt、updatedAt
```
### 进行mysql数据库配置

```javascript
module.exports = {
    databases : ,
    username : ,
    password : ,
    host : 'localhost',
    port : 3306
};

```

### 运行node服务器

```bash
node start.js
```


### 运行程序
http://127.0.0.1:3001
