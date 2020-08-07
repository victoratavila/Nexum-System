//Importing sequelize
const Sequelize = require('sequelize');

//Importing the database connection
const connection = require('../database/connection');

const Home = connection.define('home', {

street: {
    type: Sequelize.STRING,
    allowNull: false
},

number: {
    type: Sequelize.INTEGER,
    allowNull: false
},

neighborhood: {
    type: Sequelize.STRING,
    allowNull: false
},

city: {
    type: Sequelize.STRING,
    allowNull: false
},

state: {
    type: Sequelize.STRING,
    allowNull: false
},

country: {
    type: Sequelize.STRING,
    allowNull: false
},

roomsAmount: {
    type: Sequelize.STRING,
    allowNull: false
},

squareMeters: {
    type: Sequelize.STRING,
    allowNull: false
},

type: {
    type: Sequelize.STRING,
    allowNull: false
}

});

Home.sync({force: false});

module.exports = Home;