const db = require('../../database/models');
const getAllContentTypes = async () => {
  const contentTypes = await db.contentType.findAll();
  return contentTypes;
};

const getContentType = async (contentTypeId) => {
  const contentType = await db.contentType.findOne({ where: { contentTypeId } });
  return contentType;
};

const editContentType = async (contentTypeId, attribute, data) => {
  const contentType = await db.contentType.update({ [attribute]: data }, { where: { contentTypeId } });
  return contentType;
};

const createContentType = async (userId, contentTypeName) => {
  const contentType = await db.contentType.create({ userId, contentTypeName });
  return contentType;
};

const deleteContentType = async (contentTypeId) => {
  const contentType = await db.contentType.destroy({ where: { contentTypeId } });
  return contentType;
};

module.exports = {
  getAllContentTypes,
  editContentType,
  createContentType,
  deleteContentType,
  getContentType,
};