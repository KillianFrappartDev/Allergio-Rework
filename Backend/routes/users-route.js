const express = require('express');

// Local imports
const controllers = require('../controllers/users-controllers');
const User = require('../models/user');

const router = express.Router();

router.get('/:uid', controllers.getUserById);
router.post('/signup', controllers.signup);
router.post('/login', controllers.login);
router.put('/edit', controllers.editUser);
router.put('/image', controllers.editImage);

module.exports = router;
