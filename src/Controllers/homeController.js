const express = require('express');
const Home = require('../models/Home');
const People = require('../models/People');
const moment = require('moment');
const adminAuth = require('../middlewares/adminAuth');
const router = express.Router();


// Front-end list --------------------------------------------

router.get('/list/habitation', adminAuth,  (req, res) => {
    Home.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then( (list) => {
        var sessao = req.session.admin;
        const url = '/habitation/compability/';

        res.render('habitationOpportunity', {list: list, url: url, sessao: sessao, moment})
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

// See compatible immigrants

router.get('/habitation/compability/:id', adminAuth, (req, res) => {
    var id = req.params.id;

    Home.findOne({
        where: {
            id: id
        }
    }).then((list) => {

        People.findAll({
            where: {
                currentCountry: list.country,
                currentCity: list.city,
                state: list.state
            }
        }).then((result) => {

            if(result != 0){

                if(result.length == 1){
                    var amount = 'Imigrante compatível'; 
                } if(result.length > 1){
                    var amount = 'Imigrantes compatíveis';
                }
    
                sessao = req.session.admin;
    
                res.render('habitationCompatible', {result: result, sessao: sessao, amount: amount, moment, list: list});

            } else {
                var sessao = req.session.admin;
                res.render('habitationNotCompatible', {result: result, sessao: sessao, amount: amount, moment, list: list});
            }


        }).catch((err) => {
            console.log(err);
        })

    }).catch((err) => {
        console.log(err)
    })

})



// Delete home 

router.get('/delete/habitation/:id', (req, res) => {
    var id  = req.params.id;
    
    Home.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.json({result: 'habitation register deleted successfully'});
    }).catch((err) => {
        console.log(err); 
    })
})

module.exports = router;