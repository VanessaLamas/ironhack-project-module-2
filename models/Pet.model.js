const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const petSchema = new Schema({
  name: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});
const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;
