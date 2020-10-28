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
    
            var ageAverage = sum/totalAges;
    
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

        //    // Quantidade de mulheres imigrantes
        //    console.log('Mulheres: ' + femaleFound);
        //    // Quantidade de homens imigrantes
        //    console.log('Homens: ' + maleFound);

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

           // if(maleFound = true){
           //     console.log('Existem mais homens cadastrados');
           // } else if(moreWomen = true){
           //     console.log('Existem mais mulheres cadastradas');
           // } else if(theSame = true){
           //     console.log('Existe a mesma quantidade de homens e de mulheres');
           // }

            res.render('reportings', { 
                sessao: req.session.admin, moment, ageAverage, maleFound, femaleFound, tamanho
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
