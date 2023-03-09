const router = require('express').Router();
const collectionControllers = require('../controllers/collectionControllers');

router.get('/:contentTypeId', collectionControllers.getAllCollections);
router.post('/:contentTypeId', collectionControllers.createCollection);
router.put('/:collectionId', collectionControllers.editCollection);
router.delete('/:collectionId', collectionControllers.deleteCollection);

module.exports = router;
