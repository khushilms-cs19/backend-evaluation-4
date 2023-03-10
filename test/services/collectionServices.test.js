const collectionServices = require('../../src/services/collectionServices');
const HttpError = require('../../src/util/errors/httpError');
const { collection } = require('../../database/models');

const mockCollection = {
  "collectionId": "1",
  "contentTypeId": "100",
  "data": [
    {
      "columnId": "1",
      "name": "sham bhi koi 1",
      "value": "value"
    }
  ]
};

describe('Collection Services', () => {
  describe('getAllCollections', () => {
    it('should return all collections', async () => {
      jest.spyOn(collection, 'findAll').mockResolvedValue([mockCollection]);
      const collections = await collectionServices.getAllCollections('100');
      expect(collections).toEqual([mockCollection]);
    });
    it('should throw error if collections not found', async () => {
      jest.spyOn(collection, 'findAll').mockResolvedValue(null);
      await expect(async () => await collectionServices.getAllCollections('100')).rejects.toThrow(new HttpError("Collections not found", 404));
    });
  });
  describe('editCollection', () => {
    it('should return edited collection', async () => {
      jest.spyOn(collection, 'update').mockResolvedValue([1]);
      const col = await collectionServices.editCollection('1', '100', mockCollection.data);
      expect(col).toEqual([1]);
    });
    it('should throw error if collection not found', async () => {
      jest.spyOn(collection, 'update').mockResolvedValue([0]);
      await expect(async () => await collectionServices.editCollection('1', '100', mockCollection.data)).rejects.toThrow(new HttpError("Collection not found", 404));
    });
  });
  describe('createCollection', () => {
    it('should return created collection', async () => {
      jest.spyOn(collection, 'create').mockResolvedValue(mockCollection);
      const col = await collectionServices.createCollection('100', mockCollection.data);
      expect(col).toEqual(mockCollection);
    });
  });
  describe('deleteCollection', () => {
    it('should return deleted collection', async () => {
      jest.spyOn(collection, 'destroy').mockResolvedValue(1);
      const col = await collectionServices.deleteCollection('1');
      expect(col).toEqual(1);
    });
    it('should throw error if collection not found', async () => {
      jest.spyOn(collection, 'destroy').mockResolvedValue(0);
      await expect(async () => await collectionServices.deleteCollection('1')).rejects.toThrow(new HttpError("Collection not found", 404));
    });
  });
});