const columnServices = require('../services/columnServices');

const getAllColumns = async (req, res) => {
  const { contentTypeId } = req.body;
  const columns = await columnServices.getAllColumns(contentTypeId);
  res.status(200).json(columns);
};

const addColumn = async (req, res) => {
  const { contentTypeId } = req.body;
  const { name } = req.body;
  const column = await columnServices.createColumn(contentTypeId, name);
  res.status(200).json(column);
};

// const editColumn = async (req, res) => {
//   const { columnId } = req.params;
//   const { name } = req.body;
//   const column = await columnServices.editColumn(columnId, name);
//   res.status(200).json(column);
// };

module.exports = {
  getAllColumns,
  addColumn,
};