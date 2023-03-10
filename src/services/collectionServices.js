const db = require('../../database/models');
const HttpError = require('../util/errors/httpError');

const getAllCollections = async (contentTypeId) => {
  const collections = await db.collection.findAll({ where: { contentTypeId } });
  if (!collections) throw new HttpError('Collections not found', 404);
  console.log('here');
  return collections;
};

const editCollection = async (collectionId, data, columns) => {
  const collection = await db.collection.update({ data, columns }, { where: { collectionId } });
  if (collection[0] === 0) throw new HttpError('Collection not found', 404);
  return collection;
};

const createCollection = async (contentTypeId, data) => {
  const collection = await db.collection.create({ contentTypeId, data });
  return collection;
};

const deleteCollection = async (collectionId) => {
  const collection = await db.collection.destroy({ where: { collectionId } });
  if (collection === 0) throw new HttpError('Collection not found', 404);
  return collection;
};

module.exports = {
  getAllCollections,
  editCollection,
  createCollection,
  deleteCollection,
};