//Importing sequelize
const Sequelize = require('sequelize');

//Importing the database connection
const connection = require('../database/connection');

const People = connection.define('people', {

firstName: {
    type: Sequelize.STRING,
    allowNull: false
},

lastName: {
    type: Sequelize.STRING,
    allowNull: false
},

age: {
    type: Sequelize.INTEGER,
    allowNull: false
},

gender: {
    type: Sequelize.STRING,
    allowNull: false
},

country: {
    type: Sequelize.STRING,
    allowNull: false
},

motherLanguage: {
    type: Sequelize.STRING,
    allowNull: false
},

maritalStatus: {
    type: Sequelize.STRING,
    allowNull: false
}
})

// People.sync({force: false});

module.exports = People;