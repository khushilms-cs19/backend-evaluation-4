const router = require('express').Router();
const contentTypeControllers = require('../controllers/contentTypeControllers');
const validateToken = require('../middlewares/validateToken');
const { validateBody, schemas, validateParams } = require('../middlewares/validator');
const collectionRouter = require('./collectionRoutes');

router.get('/', validateToken, contentTypeControllers.getAllContentTypes);

router.post('/', validateToken, validateBody(schemas.contentType), contentTypeControllers.createContentType);

router.put('/:contentTypeId', validateToken, validateParams(schemas.contentTypeParam), validateBody(schemas.contentTypeName), contentTypeControllers.editContentType);

router.delete('/:contentTypeId', validateToken, validateParams(schemas.contentTypeParam), contentTypeControllers.deleteContentType);

router.use('/data', collectionRouter);


module.exports = router;