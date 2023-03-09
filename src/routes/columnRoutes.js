const router = require('express').Router();

const columnControllers = require('../controllers/columnControllers');

router.get('/', columnControllers.getAllColumns);

router.post('/', columnControllers.addColumn);

module.exports = router;