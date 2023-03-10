const { UniqueConstraintError } = require('sequelize');
const contentTypeServices = require('../services/contentTypeServices');
const { handleError } = require('../util/errors/errorHandler');

const getAllContentTypes = async (req, res) => {
  try {
    const contentTypes = await contentTypeServices.getAllContentTypes();
    res.status(200).json(contentTypes);
  } catch (err) {
    handleError(err, res);
  }
};

const editContentType = async (req, res) => {
  try {
    const { contentTypeId } = req.params;
    const { contentTypeName } = req.body;
    const contentType = await contentTypeServices.editContentType(contentTypeId, 'contentTypeName', contentTypeName);
    res.status(200).json({
      message: 'Content Type updated',
      contentType,
    });
  } catch (err) {
    handleError(err, res);
  }
};

const createContentType = async (req, res) => {
  try {
    const { userId } = req.user;
    const { contentTypeName } = req.body;
    const contentType = await contentTypeServices.createContentType(userId, contentTypeName);
    res.status(200).json(contentType);
  } catch (err) {
    if (err instanceof UniqueConstraintError) {
      return res.status(409).json({
        message: 'Content Type already exists',
      });
    }
    handleError(err, res);
  }
};

const deleteContentType = async (req, res) => {
  try {
    const { contentTypeId } = req.params;
    const contentType = await contentTypeServices.deleteContentType(contentTypeId);
    res.status(200).json({
      message: 'Content Type deleted',
      contentType
    });
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getAllContentTypes,
  editContentType,
  createContentType,
  deleteContentType,
};