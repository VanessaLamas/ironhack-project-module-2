const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');
// Require the Pet model in order to interact with the database
const Pet = require("../models/Pet.model");
const User = require("../models/User.model");

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

router.get('/new-pet', isLoggedIn, (request, response) => {
  response.render('pets/new-pet');
});

router.post('/new-pet', (request, response) => {
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
      response.render('pets/pet-profile', { data });
    });
});

router.post('/all-pets/:petId/delete', (req, res, next) => {
  const { petId } = req.params;
  console.log(req.params);
   Pet.findByIdAndDelete(petId)
     .then(() => res.redirect('/all-pets'))
     .catch(error => next(error));
});

router.get('/all-pets/:petId/edit', (req, res, next) => {
  const { petId } = req.params;
  Pet.findById(petId)
    .then(petToEdit => {
   console.log(petToEdit);
   res.render('pets/edit-pet.hbs', { pet: petToEdit});
    })
    .catch(error => next(error));
  });






module.exports = router;
