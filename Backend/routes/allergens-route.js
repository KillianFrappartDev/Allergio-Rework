const express = require('express');

// Local imports
const controllers = require('../controllers/allergens-controllers');

const router = express.Router();

router.get('/:aid', controllers.getAllergenById);
router.get('/', controllers.getAllergens);
router.get('/name/:name', controllers.getAllergenByName);

module.exports = router;
