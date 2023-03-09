const contentTypeServices = require('../services/contentTypeServices');

const getAllContentTypes = async (req, res) => {
  const contentTypes = await contentTypeServices.getAllContentTypes();
  res.status(200).json(contentTypes);
};

const editContentType = async (req, res) => {
  const { contentTypeId } = req.params;
  const { contentTypeName } = req.body;
  const contentType = await contentTypeServices.editContentType(contentTypeId, contentTypeName);
  res.status(200).json(contentType);
};

const createContentType = async (req, res) => {
  const { userId } = req.body;
  const { contentTypeName } = req.body;
  const contentType = await contentTypeServices.createContentType(userId, contentTypeName);
  res.status(200).json(contentType);
};

const deleteContentType = async (req, res) => {
  const { contentTypeId } = req.params;
  const contentType = await contentTypeServices.deleteContentType(contentTypeId);
  res.status(200).json(contentType);
};

module.exports = {
  getAllContentTypes,
  editContentType,
  createContentType,
  deleteContentType,
};