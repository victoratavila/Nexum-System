const express = require('express');
const Home = require('../models/Home');
const router = express.Router();


router.get('/list/habitation', (req, res) => {
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

    Home.create({
        street: street,
        number: number,
        neighborhood: neighborhood,
        city: city,
        state: state,
        country: country,
        roomsAmount: roomsAmount,
        squareMeters: squareMeters
    }).then(() => {
        res.json({result: 'Habitation registered successfully'});
    }).catch((err) => {
        console.log(err);
    })

})

module.exports = router;