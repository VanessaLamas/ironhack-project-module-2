const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

// require models of pet and user in the models folder
const Pet = require("../models/Pet.model");
const User = require("../models/User.model");

// render the homepage, my account page, all pets and new pet
router.get("/", (req, res, next) => {
  res.render("index");
});
router.get('/my-account', isLoggedIn, (req, res, next) => {
  res.render('my-account');
})
router.get('/all-pets', isLoggedIn, (request, response) => {
  Pet.find()
    .then((data) => {
      response.render('pets/all-pets', { data });
    })
});
router.get('/new-pet', isLoggedIn, (request, response) => {
  response.render('pets/new-pet');
});

// create the new pet
router.post('/new-pet', (request, response) => {
  const petData = request.body;
  console.log(petData);
  console.log('Attempting to create a new pet with POST /add-new-pet');
  Pet.create(petData).then(() => {
    response.redirect('/all-pets');
  });
});

// get the specific pet render page
router.get('/all-pets/:petId', (request, response) => {
  const { petId } = request.params;
  Pet.findById(petId)
    .then((data) => {
      response.render('pets/pet-profile', { data });
    });
});

// delete a pet
router.post('/all-pets/:petId/delete', (req, res, next) => {
  const { petId } = req.params;
  console.log(req.params);
  Pet.findByIdAndDelete(petId)
    .then(() => res.redirect('/all-pets'))
    .catch(error => next(error));
});

// render the edit page and the get the updated page
router.get('/all-pets/:petId/edit', (req, res, next) => {
  const { petId } = req.params;
  Pet.findById(petId)
    .then((data) => {
      res.render('pets/edit-pet.hbs', { data });
    })
    .catch(error => next(error));
});
router.post('/all-pets/:petId/edit', (req, res, next) => {
  const { petId } = req.params;
  const updatedPetData = req.body;
  console.log(req.params);
  Pet.findByIdAndUpdate(petId, updatedPetData, { new: true })
    .then(updatedPet => res.redirect(`/all-pets/${updatedPet._id}`))
    .catch(error => next(error));
});

// setting the dogs api




module.exports = router;
