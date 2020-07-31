const Sequelize = require('sequelize');

const connection = new Sequelize('nexumsystem','victoratavila','Vik5e82w43', {
host: 'mysql669.umbler.com',
dialect: 'mysql',
port: 41890
});

module.exports = connection;