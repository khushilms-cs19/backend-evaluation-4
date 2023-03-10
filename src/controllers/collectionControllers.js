const collectionServices = require('../services/collectionServices');
const columnServices = require('../services/columnServices');
const contentTypeServices = require('../services/contentTypeServices');
const columnUtils = require('../util/columnUtils/columnUtils');
const { handleError } = require('../util/errors/errorHandler');

const getAllCollections = async (req, res) => {
  try {
    const { contentTypeId } = req.params;
    const contentType = await contentTypeServices.getContentType(contentTypeId);
    const collections = await collectionServices.getAllCollections(contentTypeId);
    const allColumns = await columnServices.getAllColumns(contentTypeId);
    const resultData = await Promise.all(collections.map(async (collection) => {
      const { data } = collection;
      const result = await Promise.all(data.map(async (item) => {
        const { columnId } = item;
        const column = allColumns.find((column) => column.columnId === columnId);
        const { name } = column;
        return { name, value: item.value, columnId };
      }));
      return {
        collectionId: collection.collectionId,
        data: result,
      };
    }));
    res.status(200).json({
      contentType,
      allColumns,
      data: resultData,
    });
  } catch (err) {
    handleError(err, res);
  }
};



const createCollection = async (req, res) => {
  try {
    const { contentTypeId } = req.params;
    const { data } = req.body;
    const allColumns = await columnServices.getAllColumns(contentTypeId);
    //check column exists
    columnUtils.checkColumnExists(allColumns, data);
    //
    // const usedColumns = allColumns.filter((column) => {
    //   const columnId = column.columnId;
    //   const columnExists = data.find((item) => item.columnId === columnId);
    //   if (columnExists) return true;
    //   return false;
    // });

    // const usedColumnIds = usedColumns.map((column) => column.columnId);
    // await contentTypeServices.editContentType(contentTypeId, 'usedColumns', usedColumnIds);
    const collection = await collectionServices.createCollection(contentTypeId, data);
    res.status(201).json(collection);
  } catch (err) {
    handleError(err, res);
  }
};

const editCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const { data } = req.body;
    const { contentTypeId } = req.body;
    const allColumns = await columnServices.getAllColumns(contentTypeId);
    //check column exists
    columnUtils.checkColumnExists(allColumns, data);
    //
    const collection = await collectionServices.editCollection(collectionId, data);
    res.status(200).json(collection);
  } catch (err) {
    if (err.message === 'Column does not exist') {
      res.status(400).json({ message: err.message });
    } else {
      handleError(err, res);
    }
  }
};

const deleteCollection = async (req, res) => {
  try {
    const { collectionId } = req.params;
    const collection = await collectionServices.deleteCollection(collectionId);
    res.status(200).json(collection);
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getAllCollections,
  createCollection,
  deleteCollection,
  editCollection
};


// const formattedCollection = result.reduce((acc, item) => {
//   acc[item.name] = item.value;
//   return acc;
// }, {});
// return formattedCollection;