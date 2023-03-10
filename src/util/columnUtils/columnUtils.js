const HttpError = require('../errors/httpError');

const checkColumnExists = (allColumns, data) => {
  data.forEach((item) => {
    const { columnId } = item;
    const column = allColumns.find((column) => column.columnId === columnId);
    if (!column) {
      throw new HttpError('Column does not exist', 404);
    }
  });
};

module.exports = {
  checkColumnExists,
};