const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
// Require the Pet model in order to interact with the database
const Pet = require("../models/Pet.model");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/my-account', isLoggedIn, (req,res,next) => {
  res.render('my-account');
})

router.get('/all-pets', isLoggedIn, (request, response) => {
  Pet.find()
    .then( (data) => {
      response.render('pets/all-pets', { data });
  })
});

router.get('/add-new-pet', isLoggedIn, (request, response) => {
  response.render('pets/add-new-pet');
});

router.post('/add-new-pet', (request, response) => {
  const petData = request.body;
  console.log(petData);
  console.log('Attempting to create a new pet with POST /add-new-pet');
  Pet.create(petData).then( () => {
    response.redirect('/all-pets');
  });
});

router.get('/all-pets/:petId', (request, response) => {
  const { petId } = request.params;
  Pet.findById(petId)
    .then( (data) => {
      response.render('pets/my-pet-profile', { data });
    });
});



router.get('/all-pets/:petId', (req, res, next) => {
  const { petId } = req.params;
  Pet.findById(petId)
  .then(thePets => {
    thePets.deleteOne();
  })
  .then (() => {
   res.redirect('/all-pets')
  })
});

module.exports = router;
