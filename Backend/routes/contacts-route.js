const express = require('express');

// Local imports
const controllers = require('../controllers/contacts-controllers');

const router = express.Router();

router.get('/:uid', controllers.getContacts);
router.post('/search', controllers.searchContacts);
router.post('/share', controllers.shareProfiles);
router.post('/', controllers.addContact);
router.delete('/', controllers.deleteContact);
router.delete('/unshare', controllers.unshareProfiles);

module.exports = router;
