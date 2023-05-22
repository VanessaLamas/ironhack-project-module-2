const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');
const petSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    longDescription: String,
    imageUrl: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }]
  });
const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;