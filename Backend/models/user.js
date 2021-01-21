const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  image: { type: String },
  profiles: [{ type: mongoose.Types.ObjectId, ref: 'Profile' }],
  sharedProfiles: [{ type: mongoose.Types.ObjectId, ref: 'Profile' }],
  allergens: [{ type: mongoose.Types.ObjectId, ref: 'Allergen' }],
  contacts: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  sharedContacts: [{ type: mongoose.Types.ObjectId, ref: 'User' }]
});

schema.plugin(uniqueValidator);

module.exports = mongoose.model('User', schema);
