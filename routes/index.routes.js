const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middleware/isLoggedIn');

// require models of pet and user in the models folder and the fileuploader to upload an image
const Pet = require("../models/Pet.model");
const fileUploader = require("../config/cloudinary.config");
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

// create the new pet and upload the image into the database and get the url from cloudinary
const cloudinary = require('cloudinary').v2;
router.post('/new-pet', fileUploader.single('imageUrl'), (request, response) => {
  const { name, description, longDescription } = request.body;
  console.log('Attempting to create a new pet with POST /add-new-pet');
  // upload the image to Cloudinary and retrieve the URL
  cloudinary.uploader.upload(request.file.path, function (error, result) {
    if (error) {
      console.error(error);
      return response.status(500).send('Error uploading image to Cloudinary');
    } else {
      const imageUrl = result.secure_url;
      Pet.create({ name, description, longDescription, imageUrl }).then(() => {
        response.redirect('/all-pets');
      });
    }
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

module.exports = router;
