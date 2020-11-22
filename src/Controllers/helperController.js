const express = require('express');
const router = express.Router();
const Helper = require('../models/Helper');
const moment = require('moment');
const adminAuth = require('../middlewares/adminAuth');

router.get('/helper', (req, res) => {
    Helper.findAll().then(helper => {
        res.json(helper);
    }).catch(err => {
        console.log(err);
        res.status(500);
    })
});

router.post('/helper', (req, res) => {

    const data = { firstName, lastName, email, currentCountry, currentCity, state,
    businessman, jobHelp, habitationHelp, studyingHelp, helpDescription } = req.body;

    // Verificar o email do helper já existe
    Helper.findOne({ where: { email: email }}).then((email) => {
        if(email == null || email == undefined || email == ''){

            Helper.create(data).then(() => {
                res.json({result: 'A new helper was successfully created'});
            }).catch((err) => {
                console.log(err);
                res.json({error: 'Something went wrong when saving a new helper'})
            })

        } else {
            res.status(400).json({error: 'This helper is already registered'});
        }

    }).catch(err => {
        console.log(err);
    })

})

// Search helper by email

router.get('/helper/:email', async (req, res) => {
    const { email } = req.params;

    await Helper.findOne({ where: {
        email: email
    }}).then(result => {

       if(result == null || result == ""){
           res.json(false);
       } else {
           res.json(true);
       }

    }).catch(err => {
        console.log(err);
    })
})

router.delete('/helper/:id', (req, res) => {
    const { id } = req.params;

    Helper.findOne( {where: { id: id } }).then( helper => {

        if(helper != undefined && helper != null && helper != ''){

            Helper.destroy({where: { id: id }}).then( () => {
                res.json({result: `The helper ${helper.firstName} was successfully deleted`});
            }).catch(err => {
                console.log(err);
            })

        } else {
            res.status(400).json({error: 'There is not an helper with this id'});
        }

    }).catch((err) => {
        console.log(err);
    })
})


// Frontend routes


router.get('/helpers', adminAuth, (req, res) => {
    const sessao = req.session.admin;

    Helper.findAll().then(helpers => {
        res.render('helperList', {sessao, moment, helpers})
    }).catch(err => {
        console.log(err);
    })

})

router.get('/helper/delete/:id', adminAuth, (req, res) => {
    const { id } = req.params;

    Helper.findOne( {where: { id: id } }).then( helper => {

        if(helper != undefined && helper != null && helper != ''){

            Helper.destroy({where: { id: id }}).then( () => {
                res.redirect('/helpers')
            }).catch(err => {
                console.log(err);
            })

        } else {
            res.status(400).json({error: 'There is not an helper with this id'});
        }

    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;