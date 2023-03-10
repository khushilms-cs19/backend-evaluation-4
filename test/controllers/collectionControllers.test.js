const collectionServices = require('../../src/services/collectionServices');
const collectionControllers = require('../../src/controllers/collectionControllers');
const contentTypeServices = require('../../src/services/contentTypeServices');
const columnServices = require('../../src/services/columnServices');
const HttpError = require('../../src/util/errors/HttpError');
const columnUtils = require('../../src/util/columnUtils/columnUtils');

const mockColumn = {
  "columnId": "1",
  "contentTypeId": "100",
  "name": "sham bhi koi 1",
};

const mockContentType = {
  "contentTypeId": "1000",
  "userId": "1",
  "contentTypeName": "random 2",

}

const mockCollection =
{
  "collectionId": "1",
  "contentTypeId": "100",
  "data": [
    {
      "columnId": "1",
      "name": "sham bhi koi 1",
      "value": "value"
    }
  ]
}

const mockData = [
  {
    "collectionId": "1",
    "data": [{
      "columnId": "1",
      "name": "sham bhi koi 1",
      "value": "value"
    }]
  }
]
const mockReq = {
  params: {
    contentTypeId: 'contentTypeId',
    columnId: 'columnId',
  },
  body: {
    name: 'name',
  },
};
const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe('Collection Controllers', () => {
  describe('getAllCollections', () => {
    it('should return all collections', async () => {
      jest.spyOn(collectionServices, 'getAllCollections').mockResolvedValue([mockCollection]);
      jest.spyOn(contentTypeServices, 'getContentType').mockResolvedValue(mockContentType);
      jest.spyOn(columnServices, 'getAllColumns').mockResolvedValue([mockColumn]);
      await collectionControllers.getAllCollections(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        contentType: mockContentType,
        allColumns: [mockColumn],
        data: mockData,
      });
    });
    it('should return error', async () => {
      jest.spyOn(collectionServices, 'getAllCollections').mockRejectedValue(new Error('Internal Server Error'));
      await collectionControllers.getAllCollections(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
    it('should return 404 error', async () => {
      jest.spyOn(collectionServices, 'getAllCollections').mockRejectedValue(new HttpError('No collections found', 404));
      await collectionControllers.getAllCollections(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'No collections found' });
    });
  });
  describe('createCollection', () => {
    it('should create collection', async () => {
      jest.spyOn(collectionServices, 'createCollection').mockResolvedValue(mockCollection);
      jest.spyOn(columnServices, 'getAllColumns').mockResolvedValue([mockColumn]);
      jest.spyOn(columnUtils, 'checkColumnExists').mockResolvedValue();
      await collectionControllers.createCollection(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(201);
      expect(mockRes.json).toBeCalledWith(mockCollection);
    });
    it('should return error', async () => {
      jest.spyOn(collectionServices, 'createCollection').mockRejectedValue(new Error('Internal Server Error'));
      await collectionControllers.createCollection(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
  });
  describe('editCollection', () => {
    it('should update collection', async () => {
      jest.spyOn(collectionServices, 'editCollection').mockResolvedValue(mockCollection);
      jest.spyOn(columnServices, 'getAllColumns').mockResolvedValue([mockColumn]);
      jest.spyOn(columnUtils, 'checkColumnExists').mockResolvedValue();
      await collectionControllers.editCollection(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockCollection);
    });
    it('should return error', async () => {
      jest.spyOn(collectionServices, 'editCollection').mockRejectedValue(new Error('Internal Server Error'));
      await collectionControllers.editCollection(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
    it('should return 400 error', async () => {
      jest.spyOn(collectionServices, 'editCollection').mockRejectedValue(new Error('Column does not exist'));
      await collectionControllers.editCollection(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.json).toBeCalledWith({ message: 'Column does not exist' });
    })
  });
  describe('deleteCollection', () => {
    it('should delete collection', async () => {
      jest.spyOn(collectionServices, 'deleteCollection').mockResolvedValue(1);
      await collectionControllers.deleteCollection(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(1);
    });
    it('should return error', async () => {
      jest.spyOn(collectionServices, 'deleteCollection').mockRejectedValue(new Error('Internal Server Error'));
      await collectionControllers.deleteCollection(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
    it('should return 404 error', async () => {
      jest.spyOn(collectionServices, 'deleteCollection').mockRejectedValue(new HttpError('Collection not found', 404));
      await collectionControllers.deleteCollection(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'Collection not found' });
    });
  });
});