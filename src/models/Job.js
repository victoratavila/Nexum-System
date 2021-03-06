//Importing sequelize
const Sequelize = require('sequelize');

//Importing the database connection
const connection = require('../database/connection');

const Job = connection.define('job', {

company: {
    type: Sequelize.STRING,
    allowNull: false
},

role: {
    type: Sequelize.STRING,
    allowNull: false
},

level: {
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
}

});

Job.sync({force: false});

module.exports = Job;