const router = require('express').Router();
const contentTypeControllers = require('../controllers/contentTypeControllers');
const collectionRouter = require('./collectionRoutes');

router.get('/', contentTypeControllers.getAllContentTypes);

router.post('/', contentTypeControllers.createContentType);

router.put('/:contentTypeId', contentTypeControllers.editContentType);

router.delete('/:contentTypeId', contentTypeControllers.deleteContentType);

router.use('/data', collectionRouter);


module.exports = router;