const router = require('express').Router();
const contentTypeControllers = require('../controllers/contentTypeControllers');

router.get('/', contentTypeControllers.getAllContentTypes);

router.post('/', contentTypeControllers.createContentType);

router.put('/:contentTypeId', contentTypeControllers.editContentType);

router.delete('/:contentTypeId', contentTypeControllers.deleteContentType);


module.exports = router;