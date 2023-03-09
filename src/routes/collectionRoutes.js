const router = require('express').Router();
const collectionControllers = require('../controllers/collectionControllers');
const { validateParams, schemas, validateBody } = require('../middlewares/validator');

router.get('/:contentTypeId', validateParams(schemas.contentTypeParam), collectionControllers.getAllCollections);
router.post('/:contentTypeId', validateParams(schemas.contentTypeParam), validateBody(schemas.createCollection), collectionControllers.createCollection);
router.put('/:collectionId', validateParams(schemas.collectionParam), validateBody(schemas.editCollection), collectionControllers.editCollection);
router.delete('/:collectionId', validateParams(schemas.collectionParam), collectionControllers.deleteCollection);

module.exports = router;
