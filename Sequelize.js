const Sequelize = require('sequelize');

const config = require('./mysql_config');

var sequelize = new Sequelize(config.databases, config.username, config.password, {
    host : config.host,
    dialect : 'mysql',
    port : config.port,
    pool : {
        max : 5,
        min : 0,
        idle : 30000
    }
});

var Pet = sequelize.define('user', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    username : {
        type : Sequelize.STRING(100),
        unique: true
    },
    password : Sequelize.STRING(100),
    createdAt : Sequelize.BIGINT,
    updatedAt : Sequelize.BIGINT
}, {
    timestamps : false
});

module.exports = Pet;
