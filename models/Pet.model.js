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
    },
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment",
    }]
  });
const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;