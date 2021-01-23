const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String, required: true },
  image: { type: String },
  allergens: [{ type: mongoose.Types.ObjectId, ref: 'Allergen' }],
  readers: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  owner: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Profile', schema);
