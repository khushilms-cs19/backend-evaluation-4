const contentTypeServices = require('../services/contentTypeServices');

const getAllContentTypes = async (req, res) => {
  try {
    const contentTypes = await contentTypeServices.getAllContentTypes();
    res.status(200).json(contentTypes);
  } catch (err) {
    res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};

const editContentType = async (req, res) => {
  try {
    const { contentTypeId } = req.params;
    const { contentTypeName } = req.body;
    const contentType = await contentTypeServices.editContentType(contentTypeId, 'contentTypeName', contentTypeName);
    res.status(200).json(contentType);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
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