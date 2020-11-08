const express = require('express');
const router = express.Router();
const Helper = require('../models/Helper');

router.get('/helper', (req, res) => {
    Helper.findAll().then(helper => {
        res.json(helper);
    }).catch(err => {
        console.log(err);
        res.status(500);
    })
});

router.post('/helper', (req, res) => {

    const data = { firstName, lastName, email, currentCountry, currentCity, 
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

module.exports = router;