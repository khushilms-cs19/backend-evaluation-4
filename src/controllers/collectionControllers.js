const collectionServices = require('../services/collectionServices');
const columnServices = require('../services/columnServices');

const getAllCollections = async (req, res) => {
  const { contentTypeId } = req.params;
  const collections = await collectionServices.getAllCollections(contentTypeId);
  const allColumns = await columnServices.getAllColumns(contentTypeId);

  const resultData = await Promise.all(collections.map(async (collection) => {
    const { data } = collection;
    const result = await Promise.all(data.map(async (item) => {
      const { columnId } = item;
      const column = allColumns.find((column) => column.columnId === columnId);
      const { name } = column;
      return { name, value: item.value };
    }));
    const formattedCollection = result.reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});
    return formattedCollection;
  }));
  const columns = allColumns.map((column) => column.name);
  res.status(200).json({
    columns,
    data: resultData,
  });
};



const createCollection = async (req, res) => {
  const { contentTypeId } = req.params;
  const { data } = req.body;
  const collection = await collectionServices.createCollection(contentTypeId, data);
  res.status(200).json(collection);
};

module.exports = {
  getAllCollections,
  createCollection,
};