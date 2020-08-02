//Importing sequelize
const Sequelize = require('sequelize');

//Importing the database connection
const connection = require('../database/connection');

const Education = connection.define('education', {

institutionName: {
    type: Sequelize.STRING,
    allowNull: false
},

offeredCourse: {
    type: Sequelize.STRING,
    allowNull: false
},

joinMethod: {
    type: Sequelize.STRING,
    allowNull: false
},

vacancy: {
    type: Sequelize.INTEGER,
    allowNull: false
},

country: {
    type: Sequelize.STRING,
    allowNull: false
},

city: {
    type: Sequelize.STRING,
    allowNull: false
}
})

Education.sync({force: false});

module.exports = Education;