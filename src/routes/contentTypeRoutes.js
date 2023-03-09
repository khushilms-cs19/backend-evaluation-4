const router = require('express').Router();
const contentTypeControllers = require('../controllers/contentTypeControllers');
const { validateBody, schemas, validateParams } = require('../middlewares/validator');
const collectionRouter = require('./collectionRoutes');

router.get('/', contentTypeControllers.getAllContentTypes);

router.post('/', validateBody(schemas.contentType), contentTypeControllers.createContentType);

router.put('/:contentTypeId', validateParams(schemas.contentTypeParam), validateBody(schemas.contentTypeName), contentTypeControllers.editContentType);

router.delete('/:contentTypeId', validateParams(schemas.contentTypeParam), contentTypeControllers.deleteContentType);

router.use('/data', collectionRouter);


module.exports = router;