const Joi = require('joi');

const schemas = {
  contentType: Joi.object({
    contentTypeName: Joi.string().min(3).max(255).required(),
  }),
  contentTypeParam: Joi.object({
    contentTypeId: Joi.string().guid().required(),
  }),
  contentTypeName: Joi.object({
    contentTypeName: Joi.string().min(3).max(255).required(),
  }),
  contentTypeDelete: Joi.object({
    contentTypeId: Joi.string().guid().required(),
  }),
  createColumn: Joi.object({
    name: Joi.string().min(3).max(255).required(),
    contentTypeId: Joi.string().guid().required(),
  }),
  editColumn: Joi.object({
    name: Joi.string().min(3).max(255).required(),
  }),
  createCollection: Joi.object({
    data: Joi.array().min(1).items(Joi.object({
      columnId: Joi.string().guid().required(),
      value: Joi.string().min(3).max(255),
    })).required(),
  }),
  editCollection: Joi.object({
    contentTypeId: Joi.string().guid().required(),
    data: Joi.array().items(Joi.object({
      columnId: Joi.string().guid().required(),
      value: Joi.string().min(3).max(255).required(),
    })).required(),
  }),
  collectionParam: Joi.object({
    collectionId: Joi.string().guid().required(),
  }),
  columnParam: Joi.object({
    columnId: Joi.string().guid().required(),
  }),
};

const REQUEST_PROPERTY = {
  BODY: 'body',
  QUERY: 'query',
  PARAMS: 'params',
};



const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      next();
    }
  };
};

const validateParams = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) {
      res.status(400).json({ message: error.message });
    } else {
      next();
    }
  };
};

module.exports = {
  validateBody,
  validateParams,
  schemas,
  REQUEST_PROPERTY,
};