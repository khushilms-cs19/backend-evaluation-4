const db = require('../../database/models');

const getAllColumns = async (collectionId) => {
  const columns = await db.column.findAll({ where: { collectionId } });
  return columns;
};

const getColumn = async (columnId) => {
  const column = await db.column.findOne({ where: { columnId } });
  return column;
};

const editColumn = async (columnId, name) => {
  const column = await db.column.update({ name }, { where: { columnId } });
  return column;
};

const createColumn = async (collectionId, name) => {
  const column = await db.column.create({ collectionId, name });
  return column;
};

const deleteColumn = async (columnId) => {
  const column = await db.column.destroy({ where: { columnId } });
  return column;
};


module.exports = {
  getAllColumns,
  getColumn,
  editColumn,
  createColumn,
  deleteColumn,
};