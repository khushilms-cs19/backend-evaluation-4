const db = require('../../database/models');

const getAllCollections = async (contentTypeId) => {
  const collections = await db.collection.findAll({ where: { contentTypeId } });
  return collections;
};

const editCollection = async (collectionId, data, columns) => {
  const collection = await db.collection.update({ data, columns }, { where: { collectionId } });
  return collection;
};

const createCollection = async (contentTypeId, data, columns) => {
  const collection = await db.collection.create({ contentTypeId, data, columns });
  return collection;
};

const deleteCollection = async (collectionId) => {
  const collection = await db.collection.destroy({ where: { collectionId } });
  return collection;
};

module.exports = {
  getAllCollections,
  editCollection,
  createCollection,
  deleteCollection,
};