const router = require('express').Router();

const columnControllers = require('../controllers/columnControllers');

router.get('/:contentTypeId', columnControllers.getAllColumns);

router.post('/', columnControllers.addColumn);

router.put('/:columnId', columnControllers.editColumn);

router.delete('/:columnId', columnControllers.deleteColumn);

module.exports = router;