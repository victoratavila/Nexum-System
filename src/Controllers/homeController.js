const express = require('express');
const Home = require('../models/Home');
const moment = require('moment');
const adminAuth = require('../middlewares/adminAuth');
const router = express.Router();


// Front-end list --------------------------------------------

router.get('/list/habitation', adminAuth,  (req, res) => {
    Home.findAll().then( (list) => {
        var sessao = req.session.admin;
        res.render('habitationOpportunity', {list: list, sessao: sessao, moment})
    }).catch((err) => {
        console.log(err);
    })
})


// Back-end list --------------------------------------------


router.get('/list/habitation/test',  (req, res) => {
    Home.findAll().then( (list) => {
       res.json(list);
    }).catch((err) => {
        console.log(err);
    })
})

router.post('/save/habitation', (req, res) => {
    var street = req.body.street;
    var number = req.body.number;
    var neighborhood = req.body.neighborhood;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;
    var roomsAmount = req.body.roomsAmount;
    var squareMeters = req.body.squareMeters;
    var type = req.body.type;

    Home.create({
        street: street,
        number: number,
        neighborhood: neighborhood,
        city: city,
        state: state,
        country: country,
        roomsAmount: roomsAmount,
        squareMeters: squareMeters,
        type: type
    }).then(() => {
        res.json({result: 'Habitation registered successfully'});
    }).catch((err) => {
        console.log(err);
    })

})

module.exports = router;