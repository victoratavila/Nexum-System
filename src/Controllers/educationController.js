const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const moment = require('moment');
const adminAuth = require('../middlewares/adminAuth');

router.post('/create/education', (req, res) => {

    var institutionName = req.body.institutionName;
    var offeredCourse = req.body.offeredCourse;
    var joinMethod = req.body.joinMethod;
    var vacancy = req.body.vacancy;
    var state = req.body.state;
    var city = req.body.city;
    var country = req.body.country;

    Education.create({
        institutionName: institutionName,
        offeredCourse: offeredCourse,
        joinMethod: joinMethod,
        vacancy: vacancy,
        country: country,
        city: city,
        state: state
    }).then(() => {
        res.json({result: 'Education registered successfully'});
    }).catch((err) => {
        console.log(err);
    })
})

// List education backend

router.get('/education/list', (req, res) => {
    Education.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then((education) => {
        res.json(education)
    }).catch((err) => {
        console.log(err);
    })
})

// List education frontend
router.get('/list/education', adminAuth, (req, res) => {
    Education.findAll({
        order: [
            ['id', 'DESC']
        ]
    }).then((education) => {
        res.render('education', { education: education, sessao: req.session.admin, moment});
    }).catch((err) => {
        console.log(err);
    })
})

// Delete education ----------------==

router.post('/education/delete', (req, res) => {

    var id = req.body.id;

    Education.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.json({result: 'Education deleted successfully'})
    }).catch((err) => {
        console.log(err);
    })
})

module.exports = router;