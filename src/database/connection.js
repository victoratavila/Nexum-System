const Sequelize = require('sequelize');

const connection = new Sequelize('nexumsystem','victoratavila','', {
host: 'mysql669.umbler.com',
dialect: 'mysql',
port: 41890
});

module.exports = connection;
