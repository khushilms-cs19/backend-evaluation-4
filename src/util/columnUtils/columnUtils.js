const checkColumnExists = (allColumns, data) => {
  data.forEach((item) => {
    const { columnId } = item;
    const column = allColumns.find((column) => column.columnId === columnId);
    if (!column) {
      throw new Error('Column does not exist');
    }
  });
};

module.exports = {
  checkColumnExists,
};