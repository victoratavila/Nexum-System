const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const adminAuth = require('../middlewares/adminAuth');
const moment = require('moment');

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/authenticate', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    Admin.findOne({
        where: {
            email: email,
            password: password
        }
    }).then( admin => {

      // Se o usuário for encontrado
      if(admin){

        req.session.admin = {
            firstName: admin.firstName,
            password: admin.password,
            lastName: admin.lastName,
            gender: admin.gender,
            email: admin.email,
            updatedAt: moment(admin.updatedAt,'YYYY-MM-DD').format('DD/MM/YYYY'),
            id: admin.id
        }

          res.redirect('/');
      // Se o usuário não for encontrado
      } else {
          res.render('loginError');
      }

      }).catch((err) => {
         console.log(err)
      })
})


      router.get('/logout', (req, res) => {
          req.session.admin = undefined;
          res.redirect('/login');
      })




module.exports = router;