//Importing sequelize
const Sequelize = require('sequelize');

//Importing the database connection
const connection = require('../database/connection');

const Helper = connection.define('helper', {

    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },

    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    }, 

    email: {
        type: Sequelize.STRING,
        allowNull: false
    },

    currentCountry: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    currentCity: {
        type: Sequelize.STRING,
        allowNull: false
    },

    
    businessman: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },

       
    jobHelp: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },

       
    habitationHelp: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
       
    studyingHelp: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },

    helpDescription: {
        type: Sequelize.TEXT,
        allowNull: true
    }

})

Helper.sync({ force: false});
module.exports = Helper;