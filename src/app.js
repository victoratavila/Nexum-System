const express = require('express');
const app = express();
const connection = require('./database/connection');
const PeopleController = require('./Controllers/PeopleController');
const loginController = require('./Controllers/loginController');
const adminController = require('./Controllers/adminController');
const jobController = require('./Controllers/jobController');
const session = require('express-session');
const Admin = require('./models/Admin');
const Job = require('./models/Job');
const path = require('path');

// Authenticating database connection  ----------

connection.authenticate().then( () => {
    console.log('Connected to database');
}).catch( () => {
    console.log('Not connected to database');
})

// Setting view engine --------------------------

app.set('view engine', 'ejs');

// Setting view folder --------------------------

app.set('views', path.join(__dirname, '/views'));

// Setting Express ------------------------------

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

// Setting sessions -----------------------------

app.use(session({
    secret: 'nexum', 
    cookie: {
       maxAge: 3600000
    },
}))

// Setting routes -------------------------------

app.use('/', PeopleController );
app.use('/', loginController);
app.use('/', adminController);
app.use('/', jobController);

// Server listener ------------------------------

app.listen(3000, () => {
console.log('The server is running');
})