const router = require('express').Router();

const columnControllers = require('../controllers/columnControllers');
const validateToken = require('../middlewares/validateToken');
const { validateParams, schemas, validateBody } = require('../middlewares/validator');

router.get('/:contentTypeId', validateToken, validateParams(schemas.contentTypeParam), columnControllers.getAllColumns);

router.post('/', validateToken, validateBody(schemas.createColumn), columnControllers.addColumn);

router.put('/:columnId', validateToken, validateParams(schemas.columnParam), validateBody(schemas.editColumn), columnControllers.editColumn);

router.delete('/:columnId', validateToken, validateParams(schemas.columnParam), columnControllers.deleteColumn);

module.exports = router;