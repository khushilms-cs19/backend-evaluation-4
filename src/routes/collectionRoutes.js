const router = require('express').Router();
const collectionControllers = require('../controllers/collectionControllers');
const validateToken = require('../middlewares/validateToken');
const { validateParams, schemas, validateBody } = require('../middlewares/validator');

router.get('/:contentTypeId', validateToken, validateParams(schemas.contentTypeParam), collectionControllers.getAllCollections);
router.post('/:contentTypeId', validateToken, validateParams(schemas.contentTypeParam), validateBody(schemas.createCollection), collectionControllers.createCollection);
router.put('/:collectionId', validateToken, validateParams(schemas.collectionParam), validateBody(schemas.editCollection), collectionControllers.editCollection);
router.delete('/:collectionId', validateToken, validateParams(schemas.collectionParam), collectionControllers.deleteCollection);

module.exports = router;
