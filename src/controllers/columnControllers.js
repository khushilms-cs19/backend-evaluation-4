const columnServices = require('../services/columnServices');
const contentTypeServices = require('../services/contentTypeServices');
const collectionServices = require('../services/collectionServices');
const { handleError } = require('../util/errors/errorHandler');

const getAllColumns = async (req, res) => {
  try {
    const { contentTypeId } = req.params;
    const columns = await columnServices.getAllColumns(contentTypeId);
    res.status(200).json(columns);
  } catch (err) {
    handleError(err, res);
  }
};

const addColumn = async (req, res) => {
  try {
    const { contentTypeId } = req.body;
    const { name } = req.body;
    const allColumns = await columnServices.getAllColumns(contentTypeId);
    const columnExists = allColumns.find((column) => column.name === name);
    console.log(columnExists, name, allColumns);
    if (columnExists) {
      throw new Error('Column already exists');
    }
    const column = await columnServices.createColumn(contentTypeId, name);
    res.status(200).json(column);
  } catch (err) {
    if (err.message === 'Column already exists') {
      res.status(409).json({ message: 'Column already exists' });
    } else {
      handleError(err, res);
    }
  }
};

const editColumn = async (req, res) => {
  try {
    const { columnId } = req.params;
    const { name } = req.body;
    const column = await columnServices.editColumn(columnId, name);
    res.status(200).json({
      message: 'Column edited',
      column
    });
  } catch (err) {
    handleError(err, res);
  }
};

const deleteColumn = async (req, res) => {
  try {
    const { columnId } = req.params;
    const column = await columnServices.getColumn(columnId);
    const contentType = await contentTypeServices.getContentType(column.contentTypeId);
    const allCollections = await collectionServices.getAllCollections(contentType.contentTypeId);
    await Promise.all(allCollections.map(async (collection) => {
      const { data } = collection;
      const newData = data.filter((item) => item.columnId !== columnId);
      console.log(newData);
      if (newData.length === 0) {
        return collectionServices.deleteCollection(collection.collectionId);
      } else {
        return collectionServices.editCollection(collection.collectionId, newData);
      }
    }));
    await columnServices.deleteColumn(columnId);
    res.status(200).json({
      message: 'Column deleted',
      column
    });
  } catch (err) {
    handleError(err, res);
  }
};

module.exports = {
  getAllColumns,
  addColumn,
  editColumn,
  deleteColumn,
};