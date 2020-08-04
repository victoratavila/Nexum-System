const express = require('express');
const People = require('../models/People');
const { Sequelize } = require('sequelize');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const moment = require('moment');

router.get('/', adminAuth, (req,res) => {
res.render('actions', {sessao: req.session.admin});
})

router.get('/form/create/people', adminAuth, (req,res) => {
res.render('createPeopleForm', {sessao: req.session.admin});
})

router.get('/search/id', adminAuth, (req,res) => {
res.render('searchByID', {sessao: req.session.admin});
})


//Route to save people
router.post('/people/save', (req, res) => {
var firstName = req.body.firstName;
var lastName = req.body.lastName;
var age = req.body.age;
var gender = req.body.gender;
var country = req.body.country;
var currentCountry = req.body.currentCountry;
var currentCity = req.body.currentCity;
var state = req.body.state;
var motherLanguage = req.body.motherLanguage;
var maritalStatus = req.body.maritalStatus;

People.create({
firstName: firstName,
lastName: lastName,
age: age,
gender: gender,
country: country,
currentCountry: currentCountry,
currentCity: currentCity,
state: state,
motherLanguage: motherLanguage,
maritalStatus: maritalStatus,
}).then( (data) => {
res.redirect('/people/list');
}).catch( (err) => {
console.log(err)
});
});
// ----------------------------------------------------------------------------------

//See all people frontend
router.get('/people/list', adminAuth, (req, res) => {

People.findAll({
    order: [
        ['id', 'DESC'],
    ], raw: true
}).then( (list) => {
console.log(list);
res.render('peopleList', {list: list, sessao: req.session.admin, moment});
}).catch( (err) => {
res.send(err)

});
});

//See all people backend
router.get('/list/people', (req, res) => {

    People.findAll({
        order: [
            ['id', 'DESC'],
        ], raw: true
    }).then( (list) => {
    res.json(list)
    }).catch( (err) => {
    res.send(err)
    
    });
    });


// ----------------------------------------------------------------------------------

router.get('/people/search', adminAuth, (req, res) => {
var firstName = req.body.firstName;
var lastName = req.body.lastName;
var gender = req.body.gender;
var country = req.body.country;
var maritalStatus = req.body.maritalStatus;

People.findAll({
where: {
    firstName: firstName,
    lastName: lastName,
    gender: gender,
    country: country,
    maritalStatus: maritalStatus
}
}).then( (result) => {
return res.json({result});
}).catch(() => {
    res.redirect('/');
})
})
// ----------------------------------------------------------------------------------

//Delete person/people
router.post('/people/delete', adminAuth, (req, res) => {
var id = req.body.id;

People.destroy({
where: {
id: id
}
}).then((result) => {

if(result != undefined){

if(result != ""){
console.log(' Immigrant successfully deleted');
res.redirect('/');
} else {
console.log('Imiggrant not found');
res.render('notFoundPersonToDelete', {sessao: req.session.admin});
}}
}).catch(() => {
    res.redirect('/');
})
});

// ----------------------------------------------------------------------------------

//Search for people by id

router.post('/people/search', adminAuth, (req, res) => {

People.findAll({
where: {
id: req.body.id,
}, raw: true
}).then( (result) => {
if(result != undefined){

if(result != ""){
    console.log('User found');
    console.log(result);
    res.render('foundPerson', {person: result, sessao: req.session.admin, moment});
} else {
console.log('User not found');
res.render('notFoundPerson', {sessao: req.session.admin});
}}
}).catch(() => {
    res.redirect('/');
})
});

// ----------------------------------------------------------------------------------

router.get('/people/form/delete', adminAuth, (req, res) => {
res.render('deletePeopleForm', {sessao: req.session.admin});
})

// ----------------------------------------------------------------------------------

router.get('/people/form/edit', (req, res) => {
var id = req.body.id;

res.render('editPeopleForm', {id: req.body.id, sessao: req.session.admin});
})


// ----------------------------------------------------------------------------------

//Update person/people
router.post('/information/update', adminAuth, (req, res) => {
    var id = req.body.id;
    
    People.findAll({
    where: {
    id: id
    }, raw: true
    }).then((person) => {
    if(person != ""){
        console.log(person);
        res.render('peopleInformationUpdate', {person, sessao: req.session.admin});
    } else {
        console.log('Immigrant not found');
        res.render('notFoundPersonToEdit', {sessao: req.session.admin});
    }
    })
    });

// ----------------------------------------------------------------------------------

router.post('/update/form/sent', adminAuth, (req, res) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var age = req.body.age;
    var gender = req.body.gender;
    var country = req.body.country;
    var currentCountry = req.body.currentCountry;
    var currentCity = req.body.currentCity;
    var state = req.body.state;
    var motherLanguage = req.body.motherLanguage;
    var maritalStatus = req.body.maritalStatus;
    var id = req.body.id2;

People.update({
    firstName: firstName, 
    lastName: lastName, 
    gender: gender, 
    age: age, 
    country: country, 
    currentCountry: currentCountry,
    currentCity: currentCity,
    maritalStatus: maritalStatus,
    state: state,
    motherLanguage: motherLanguage}, {

where: {
id: id
}

}).then( (result) => {
res.render('updatedSuccessfully', {id, firstName, lastName, sessao: req.session.admin});
}).catch( (err) => {
console.log(err);
})
}) 
 

// ----------------------------------------------------------------------------------

router.get('/registered/successfuly', adminAuth, (req, res) => {
res.render('theIdIs', {sessao: req.session.admin});
})

module.exports = router;