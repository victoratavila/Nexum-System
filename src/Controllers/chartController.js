const express = require('express');
const People = require('../models/People');
const { Sequelize } = require('sequelize');
const router = express.Router();
const adminAuth = require('../middlewares/adminAuth');
const moment = require('moment');

router.get('/relatorios', adminAuth, (req, res) => {
    People.findAll({ attribute: ['age'] }).then((age) => {

        // Calcula a média da idade dos imigrantes
        async function mediaIdade(){

            let totalAges = age.length;
            age = JSON.parse(JSON.stringify(age));
    
            for( var i = 0; i < totalAges; i++){
               if(i > totalAges ) break;
    
                if( i == 0){
                    var sum = age[i].age;
                } else {
                    sum += age[i].age;
                }
            }

            var criancas = 0;

            for(var i = 0; i < totalAges; i++){
               if( age[i].age < 12 ) {
                   criancas += 1;
               } 
            }
    
            var ageAverage = sum/totalAges;
     ;
            // Média de idade dos imigrantes
            ageAverage = parseInt(ageAverage);
            // console.log('A média é ' + ageAverage + ' anos');

            // ------------------------------------------------------------------

            // Calcula qual a quantidade de homens e mulheres na plataforma
            await People.findAll({ attribute: 'gender' }).then((gender) => {
               gender = JSON.parse(JSON.stringify(gender));
               var tamanho = gender.length;
               var maleFound = 0;
               var femaleFound = 0;

           for(i = 0; i < tamanho; i++){

                if(gender[i].gender == "Feminino"){
                       femaleFound += 1;
                } else if(gender[i].gender == "Masculino"){
                   maleFound += 1;
                }
           
           }

           let moreMan;
           let moreWomen;
           let theSame;

           if(maleFound > femaleFound){
               moreMan = true;
           } else if(femaleFound > maleFound){
               moreWomen = true;
           } else if(femaleFound == maleFound){
               theSame = true;
           }

            res.render('reportings', { 
                sessao: req.session.admin, moment, ageAverage, maleFound, femaleFound, tamanho, criancas
            });

           }).catch((err) => {
               console.log(err);
           })

        };
        
  
       
        mediaIdade();
        // genero();


        
    

    }).catch((err) => {
        console.log(err);
    })
});






module.exports = router;
