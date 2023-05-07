const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
const petSchema = new Schema(
  {
    name: String,
    description: String,
    longDescription: String,
    imageUrl: String, 
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  });
const User = require("../models/User.model");
const Pet = mongoose.model('Pet', petSchema);
const fileUploader = require("../config/cloudinary.config");
module.exports = Pet;

