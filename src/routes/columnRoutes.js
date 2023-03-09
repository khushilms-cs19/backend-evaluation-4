const router = require('express').Router();

const columnControllers = require('../controllers/columnControllers');
const { validateParams, schemas, validateBody } = require('../middlewares/validator');

router.get('/:contentTypeId', validateParams(schemas.contentTypeParam), columnControllers.getAllColumns);

router.post('/', validateBody(schemas.createColumn), columnControllers.addColumn);

router.put('/:columnId', validateParams(schemas.columnParam), validateBody(schemas.editColumn), columnControllers.editColumn);

router.delete('/:columnId', validateParams(schemas.columnParam), columnControllers.deleteColumn);

module.exports = router;