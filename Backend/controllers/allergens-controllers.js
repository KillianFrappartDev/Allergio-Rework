// Local imports
const Allergen = require('../models/allergen');

const getAllergenById = async (req, res, next) => {
  const allergenId = req.params.aid;
  console.log('allergen');
  let allergen;
  try {
    allergen = await Allergen.findById(allergenId);
  } catch (error) {
    return next(new Error('[GET][ALLERGENS] Could not find allergen.'));
  }

  console.log('[GET][ALLERGENS] Allergen found!');
  res.json({ allergen });
};

const getAllergenByName = async (req, res, next) => {
  const allergenName = req.params.name;
  let allergen;
  try {
    allergen = await Allergen.findOne({ name: allergenName });
  } catch (error) {
    return next(new Error('[GET][ALLERGENS] Could not find allergen by name.'));
  }

  console.log('[GET][ALLERGENS] Allergen found!');
  res.json({ message: allergen });
};

const getAllergens = async (req, res, next) => {
  let allergens;
  try {
    allergens = await Allergen.find({});
  } catch (error) {
    return next(new Error('[GET][ALLERGENS] Could not find allergen.'));
  }

  console.log('[GET][ALLERGENS] Allergen found!');
  res.json({ allergens });
};

exports.getAllergenById = getAllergenById;
exports.getAllergens = getAllergens;
exports.getAllergenById = getAllergenById;
exports.getAllergenByName = getAllergenByName;
