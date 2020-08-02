const express = require('express');
const router = express.Router();
const Education = require('../models/Education');
const moment = require('moment');
const adminAuth = require('../middlewares/adminAuth');

router.post('/create/education', adminAuth, (req, res) => {

    var institutionName = req.body.institutionName;
    var offeredCourse = req.body.offeredCourse;
    var joinMethod = req.body.joinMethod;
    var vacancy = req.body.vacancy;
    var country = req.body.country;
    var city = req.body.city;

    Education.create({
        institutionName: institutionName,
        offeredCourse: offeredCourse,
        joinMethod: joinMethod,
        vacancy: vacancy,
        country: country,
        city: city
    }).then(() => {
        res.json({result: 'Education registered successfully'});
    }).catch((err) => {
        console.log(err);
    })
})

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

module.exports = router;