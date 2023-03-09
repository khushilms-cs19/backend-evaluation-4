const router = require('express').Router();
const contentTypeControllers = require('../controllers/contentTypeControllers');

router.get('/', contentTypeControllers.getAllContentTypes);

router.post('/', contentTypeControllers.createContentType);


module.exports = router;