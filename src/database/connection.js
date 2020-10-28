const Sequelize = require('sequelize');

const connection = new Sequelize('api','root','', {
host: 'localhost',
dialect: 'mysql',
});

module.exports = connection;
