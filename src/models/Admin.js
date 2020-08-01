//Importing sequelize
const Sequelize = require('sequelize');

//Importing the database connection
const connection = require('../database/connection');

const Admin = connection.define('admin', {

firstName: {
    type: Sequelize.STRING,
    allowNull: false
},

lastName: {
    type: Sequelize.STRING,
    allowNull: false
},

gender: {
    type: Sequelize.STRING,
    allowNull: false
},

email: {
    type: Sequelize.STRING,
    allowNull: false
},

password: {
    type: Sequelize.STRING,
    allowNull: false
}

});

Admin.sync({force: false});

module.exports = Admin;