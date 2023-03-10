const db = require('../../database/models');
const HttpError = require('../util/errors/httpError');

const getAllColumns = async (contentTypeId) => {
  const columns = await db.column.findAll({ where: { contentTypeId } });
  if (!columns) throw new HttpError('Columns not found', 404);
  return columns;
};

const getColumn = async (columnId) => {
  const column = await db.column.findOne({ where: { columnId } });
  if (!column) throw new HttpError('Column not found', 404);
  return column;
};

const editColumn = async (columnId, name) => {
  const columnEdit = await db.column.update({ name }, { where: { columnId } });
  if (columnEdit[0] === 0) throw new HttpError('Column not found', 404);
  const column = await getColumn(columnId);
  return column;
};

const createColumn = async (contentTypeId, name) => {
  const column = await db.column.create({ contentTypeId, name });
  return column;
};

const deleteColumn = async (columnId) => {
  const column = await db.column.destroy({ where: { columnId } });
  if (column === 0) throw new HttpError('Column not found', 404);
  return column;
};

module.exports = {
  getAllColumns,
  getColumn,
  editColumn,
  createColumn,
  deleteColumn,
};