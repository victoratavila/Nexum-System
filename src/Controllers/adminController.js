const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const adminAuth = require('../middlewares/adminAuth');

// Acess admin profile ------------------------------------------------

router.get('/admin/profile', adminAuth, (req, res) => {
var sessao = req.session.admin
res.render('adminProfile', {sessao});

});

// Create new admin -------------------------------------------------------

router.post('/create/admin', (req, res) => {

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var gender = req.body.gender;
    var email = req.body.email;
    var password = req.body.password;

    Admin.create({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        password: password

    }).then( () => {
        res.json({result: 'admin saved successfully'});
    }).catch( (err) => {
        console.log(err);
    })
  
})

// Update admin profile form  -------------------------------------------

router.get('/admin/update/form', adminAuth, (req, res) => {
    var sessao = req.session.admin
    res.render('editAdminForm', {sessao});
})

// Update admin profile data  -------------------------------------------

router.post('/admin/update', (req, res) => {

    var email = req.body.email;
    var newFirstName = req.body.newFirstName;
    var newLastName = req.body.newLastName;
    var gender = req.body.gender;
    var newPassword = req.body.newPassword;


    Admin.update({
        
        firstName: newFirstName,
        lastName: newLastName,
        password: newPassword,
        gender: gender

    }, {
        where: {
            email: email
        }
    }).then(() => {
        console.log(newFirstName, newLastName, newPassword, email)
        res.redirect('/admin/profile')
        console.log(req.body);
        res.json({result: 'Admin register successfully updated'});
    }).catch(() => {
        console.log(newFirstName, newLastName, newPassword, email)
        res.json({result: 'Admin register was not updated'});
    })




})

// Register admin  -----------------------------------------------------

router.post('/admin/form/save', (req, res) => {
    var firstName = req.body.campoNome;
    var lastName = req.body.campoSobrenome;
    var email = req.body.campoEmail;
    var password = req.session.admin.password;
    var id = req.session.admin.id;
    var gender = req.body.gender;

   Admin.findOne({
       where: {
           id: id
       }
   }).then((adminData) => {
       
    Admin.update({
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        password: password
    }, {
        where: {
            id: adminData.id
        }
    }).then( () => {
        res.redirect('/admin/profile')
    }).catch( (err) => {
        console.log(err)
    })

   }).catch( (err) => {
       console.log(err)
   })
})


// Delete admin  ---------------------------------------------

router.post('/admin/delete', (req, res) => {

    var email = req.body.email;

    Admin.findOne({
        where: {
            email: email
        }
    }).then( (admin) => {

        var email = admin.email;

        Admin.destroy({
            where: {
                email: email,
            }
        }).then(() => {
            res.json({result: 'Admin register successfully deleted'});
        }).catch(() => {
            res.json({result: 'Admin register was not deleted'});
        })
    
    }).catch(() => {
        res.json({result: 'User register no found to delete'});
    })
})


// List all registered admins  ---------------------------------------------

router.get('/list/admin', (req, res) => {
    Admin.findAll().then((admins) => {

        res.json({admins});
    }).catch((err) => {
        console.log(err);
    })
})

router.get('/report/bug', adminAuth, (req, res) => {
    var sessao = req.session.admin
    res.render('reportBug', {sessao} );
})

router.get('/sent', adminAuth, (req, res) => {
    var sessao = req.session.admin

    if(sessao.gender == 'Masculino'){
        var welcome = "Obrigado";
    
    } else if(sessao.gender == 'Feminino'){
        var welcome = "Obrigada";
    
    } else {
        var welcome = "Obrigadx";
    }
    
    res.render('reportEnviado', {sessao, welcome} );
})


module.exports = router;