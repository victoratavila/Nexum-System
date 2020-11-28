const express = require('express');
const app = express();
const connection = require('./database/connection');
const PeopleController = require('./Controllers/PeopleController');
const loginController = require('./Controllers/loginController');
const adminController = require('./Controllers/adminController');
const jobController = require('./Controllers/jobController');
const educationController = require('./Controllers/educationController');
const homeController = require('./Controllers/homeController');
const chartController = require('./Controllers/chartController');
const helperController = require('./Controllers/helperController');
const session = require('express-session');
const Admin = require('./models/Admin');
const Job = require('./models/Job');
const Education = require('./models/Education');
const Home = require('./models/Home');
const path = require('path');
const cors = require('cors');


// Authenticating database connection  ----------

connection.authenticate().then( () => {
    console.log('Connected to database');
}).catch( () => {
    console.log('Not connected to database');
})

// Setting cors --------------------------------

app.use(cors());

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
    saveUninitialized: true,
    resave: true
}))

// Setting routes -------------------------------

app.use('/', PeopleController );
app.use('/', loginController);
app.use('/', adminController);
app.use('/', jobController);
app.use('/', educationController);
app.use('/', homeController);
app.use('/', chartController);
app.use('/', helperController);

// Server listener ------------------------------

app.listen(3000, () => {
console.log('The server is running');
})