const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const moment = require('moment');
const adminAuth = require('../middlewares/adminAuth');

// Create new job -------------------------------------------------------

router.post('/create/job', (req, res) => {

    var company = req.body.company;
    var role = req.body.role;
    var level = req.body.level;
    var city = req.body.city;
    var pwd_exclusive = req.body.pwd_exclusive;

    Job.create({
        company: company,
        role: role,
        level: level,
        city: city,
        pwd_exclusive: pwd_exclusive

    }).then( () => {
        res.json({result: 'job saved successfully'});
    }).catch( (err) => {
        console.log(err);
    })
  
})

// List all jobs  -------------------------------------------------------

router.get('/list/jobs', (req, res) => {
    Job.findAll()
    .then((jobs) => {
        res.json(jobs)
    })
    .catch((err) => {
        console.log(err)
    })
})


// List all jobs frontend  ------------------------------------------------

router.get('/job/opportunity', adminAuth, (req, res) => {

    var navActive = 'nav-item active';

    Job.findAll({
        order: [
            ['id', 'DESC'],
        ],
    })
    .then((jobs) => {
        res.render('jobOpportunity', {jobs: jobs, moment, sessao: req.session.admin, navActive})
        console.log(page_name);
    })
    .catch((err) => {
        console.log(err)
    })

})

// Delete job ---------------------------------------------------------------

router.post('/job/delete', (req, res) => {

    var id = req.body.id;

      Job.destroy({
            where: {
                id: id
            }
        }).then(() => {
        res.json({result: 'job deleted successfully'})
    }).catch((err) => {
        console.log(err);
    })
    })



module.exports = router;