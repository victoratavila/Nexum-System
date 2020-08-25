const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const People = require('../models/People');
const moment = require('moment');
const adminAuth = require('../middlewares/adminAuth');

// Create new job -------------------------------------------------------

router.post('/create/job', (req, res) => {

    var company = req.body.company;
    var role = req.body.role;
    var level = req.body.level;
    var city = req.body.city;
    var state = req.body.state;
    var country = req.body.country;

    Job.create({
        company: company,
        role: role,
        level: level,
        city: city,
        state: state,
        country: country,

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
        const url = '/job/compatibility/';
        res.render('jobOpportunity', {jobs: jobs, moment, url: url, sessao: req.session.admin, navActive})
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

// Job compability ------------------------------------

router.get('/job/compatibility/:vacancyID', adminAuth, (req, res) => {
    var vacancyID = req.params.vacancyID;

    Job.findOne({
        where: {
            id: vacancyID
        }
    }).then((job) => {
       
        People.findAll({
            where: {
                currentCity: job.city,
                state: job.state
            }
        }).then((compatiblePeople) => {

            
            if(compatiblePeople != 0){

                var sessao = req.session.admin;
                const url = '/job/compatibility/';

                if(compatiblePeople.length == 1){
                    var amount = 'Imigrante compatível'; 
                } if(compatiblePeople.length > 1){
                    var amount = 'Imigrantes compatíveis';
                }
                res.render('jobCompatible', {sessao, amount, job: job, compatiblePeople: compatiblePeople, moment});

            } else {
                var sessao = req.session.admin;
                res.render('jobNotCompatible', {sessao, amount, job: job, compatiblePeople: compatiblePeople, moment});
            }
            


        }).catch((err) => {
            console.log(err)
        })

    }).catch((err) => {
        console.log(err);
    })

})


module.exports = router;