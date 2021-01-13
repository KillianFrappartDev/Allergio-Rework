const express = require('express');

// Local imports
const controllers = require('../controllers/profiles-controllers');

const router = express.Router();

router.get('/:uid/allmight', controllers.getProfilesByUser);
//router.get("/:pid", controllers.getProfileById);
router.post('/', controllers.createProfile);
router.put('/:pid', controllers.editProfile);

module.exports = router;
