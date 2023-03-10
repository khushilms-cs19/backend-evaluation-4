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
    if (columnExists) {
      return res.status(409).json({ message: 'Column already exists' });
    }
    const column = await columnServices.createColumn(contentTypeId, name);
    res.status(200).json(column);
  } catch (err) {
    handleError(err, res);
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
    console.log(allCollections);
    await Promise.all(allCollections.map(async (collection) => {
      const { data } = collection;
      const newData = data.filter((item) => item.columnId !== columnId);
      if (newData.length === 0) {
        return collectionServices.deleteCollection(collection.collectionId);
      } else {
        return collectionServices.editCollection(collection.collectionId, newData);
      }
    }));
    // const { usedColumns } = contentType;
    // if (usedColumns.includes(columnId)) {
    //   throw new Error('Column is in use');
    // }
    await columnServices.deleteColumn(columnId);
    res.status(200).json({
      message: 'Column deleted',
      column
    });
  } catch (err) {
    if (err.message === 'Column is in use') {
      res.status(400).json({ message: 'Column is in use' });
    } else {
      handleError(err, res);
    }
  }
};

module.exports = {
  getAllColumns,
  addColumn,
  editColumn,
  deleteColumn,
};