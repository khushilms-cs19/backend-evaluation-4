const columnServices = require('../services/columnServices');
const contentTypeServices = require('../services/contentTypeServices');

const getAllColumns = async (req, res) => {
  const { contentTypeId } = req.params;
  console.log(contentTypeId);
  const columns = await columnServices.getAllColumns(contentTypeId);
  res.status(200).json(columns);
};

const addColumn = async (req, res) => {
  const { contentTypeId } = req.body;
  const { name } = req.body;
  const allColumns = await columnServices.getAllColumns(contentTypeId);
  const columnExists = allColumns.find((column) => column.name === name);
  if (columnExists) {
    return res.status(400).json({ message: 'Column already exists' });
  }
  const column = await columnServices.createColumn(contentTypeId, name);
  res.status(200).json(column);
};

const editColumn = async (req, res) => {
  const { columnId } = req.params;
  const { name } = req.body;
  const column = await columnServices.editColumn(columnId, name);
  res.status(200).json(column);
};

const deleteColumn = async (req, res) => {
  try {
    const { columnId } = req.params;
    const column = await columnServices.getColumn(columnId);
    const contentType = await contentTypeServices.getContentType(column.contentTypeId);
    const { usedColumns } = contentType;
    console.log(usedColumns);
    if (usedColumns.includes(columnId)) {
      throw new Error('Column is in use');
    }
    await columnServices.deleteColumn(columnId);
    res.status(200).json(column);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAllColumns,
  addColumn,
  editColumn,
  deleteColumn,
};