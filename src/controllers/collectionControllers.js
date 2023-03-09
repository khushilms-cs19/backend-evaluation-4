const collectionServices = require('../services/collectionServices');
const columnServices = require('../services/columnServices');

const getAllCollections = async (req, res) => {
  const { contentTypeId } = req.params;
  const collections = await collectionServices.getAllCollections(contentTypeId);
  const allColumns = await columnServices.getAllColumns(contentTypeId);
  const resultData = collections.map(async (collection) => {
    const { data } = collection;
    const result = data.map(async (item) => {
      const { columnId } = item;
      const column = allColumns.find((column) => column.columnId === columnId);
      const { name } = column;
      return { name, value: item.value };
    });
    const formattedCollection = result.reduce((acc, item) => {
      acc[item.name] = item.value;
      return acc;
    }, {});
    resultData.push(formattedCollection);
  });
  res.status(200).json(resultData);
};



// const createCollection = async (req, res) => {
//   const { contentTypeId } = req.params;
//   const { data } = req.body;
//   const formattedData = data.map((item) => {
//     const { name, value } = item;

//     const collection = await collectionServices.createCollection(contentTypeId, data);
//     res.status(200).json(collection);
//   };

module.exports = {
  getAllCollections,
};