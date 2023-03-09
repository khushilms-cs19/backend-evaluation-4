const router = require('express').Router();
const collectionControllers = require('../controllers/collectionControllers');

router.get('/:contentTypeId', collectionControllers.getAllCollections);
router.post('/:contentTypeId', collectionControllers.createCollection);

module.exports = router;
