const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
const petSchema = new Schema(
  {
    name: String,
    description: String,
    image: Buffer,
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  });
const User = require("../models/User.model");
const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
