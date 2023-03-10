const columnControllers = require('../../src/controllers/columnControllers');
const columnServices = require('../../src/services/columnServices');
const contentTypeServices = require('../../src/services/contentTypeServices');
const collectionServices = require('../../src/services/collectionServices');
const HttpError = require('../../src/util/errors/httpError');

const mockReq = {
  params: {
    contentTypeId: 'contentTypeId',
    columnId: '1',
  },
  body: {
    name: 'name',
  },
};
const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const mockColumn = {
  "columnId": "1",
  "contentTypeId": "10",
  "name": "name 1",
};

const mockContentType = {
  "contentTypeId": "10",
  "userId": "1",
  "contentTypeName": "random 2",
}

const mockCollection =
{
  "collectionId": "100",
  "contentTypeId": "10",
  "data": [
    {
      "columnId": "1",
      "value": "name 1"
    },
    {
      "columnId": "2",
      "value": "name 2"
    },
  ]
}

describe('columnControllers', () => {
  describe('getAllColumns', () => {
    it('should return all columns', async () => {
      jest.spyOn(columnServices, 'getAllColumns').mockResolvedValue([mockColumn]);
      await columnControllers.getAllColumns(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith([mockColumn]);
    });
    it('should return error', async () => {
      jest.spyOn(columnServices, 'getAllColumns').mockRejectedValue(new Error('Internal Server Error'));
      await columnControllers.getAllColumns(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
    it('should return 404 error', async () => {
      jest.spyOn(columnServices, 'getAllColumns').mockRejectedValue(new HttpError('No columns found', 404));
      await columnControllers.getAllColumns(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'No columns found' });
    });
  });
  describe('addColumn', () => {
    it('should add column', async () => {
      jest.spyOn(columnServices, 'getAllColumns').mockResolvedValue([mockColumn]);
      jest.spyOn(columnServices, 'createColumn').mockResolvedValue(mockColumn);
      await columnControllers.addColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockColumn);
    });
    it('should return error', async () => {
      jest.spyOn(columnServices, 'getAllColumns').mockRejectedValue(new Error('Internal Server Error'));
      await columnControllers.addColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
    it('should return 404 error', async () => {
      jest.spyOn(columnServices, 'getAllColumns').mockRejectedValue(new HttpError('No columns found', 404));
      await columnControllers.addColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'No columns found' });
    });
    // it('should return 400 error', async () => {
    //   jest.spyOn(columnServices, 'getAllColumns').mockRejectedValue(new HttpError('Column already exists', 400));
    //   const newMockReq = {
    //     ...mockReq,
    //     body: {
    //       name: 'sham bhi koi 1',
    //       contentTypeId: 'f20fcc64-6300-4930-9f48-2ecfe87e1664',
    //     },
    //   }
    //   await columnControllers.addColumn(newMockReq, mockRes);
    //   expect(mockRes.status).toBeCalledWith(400);
    //   expect(mockRes.json).toBeCalledWith({ message: 'Column already exists' });
    // });
    it('should return 409 error', async () => {
      jest.spyOn(columnServices, 'getAllColumns').mockResolvedValue([{ ...mockColumn, name: 'name' }]);
      const newMockReq = {
        ...mockReq,
        body: {
          name: 'name',
          contentTypeId: 'f20fcc64-6300-4930-9f48-2ecfe87e1664',
        },
      }
      await columnControllers.addColumn(newMockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(409);
      expect(mockRes.json).toBeCalledWith({ message: 'Column already exists' });

    })
  });
  describe('editColumn', () => {
    it('should edit column', async () => {
      jest.spyOn(columnServices, 'editColumn').mockResolvedValue(mockColumn);
      await columnControllers.editColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: 'Column edited', column: mockColumn });
    });
    it('should return error', async () => {
      jest.spyOn(columnServices, 'editColumn').mockRejectedValue(new Error('Internal Server Error'));
      await columnControllers.editColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
    it('should return 404 error', async () => {
      jest.spyOn(columnServices, 'editColumn').mockRejectedValue(new HttpError('Column not found', 404));
      await columnControllers.editColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'Column not found' });
    });
  });
  describe('deleteColumn', () => {
    it('should delete column', async () => {
      jest.spyOn(columnServices, 'getColumn').mockResolvedValue(mockColumn);
      jest.spyOn(contentTypeServices, 'getContentType').mockResolvedValue(mockContentType);
      jest.spyOn(collectionServices, 'getAllCollections').mockResolvedValue([mockCollection]);
      jest.spyOn(collectionServices, 'deleteCollection').mockResolvedValue(1);
      jest.spyOn(collectionServices, 'editCollection').mockResolvedValue(1);
      jest.spyOn(columnServices, 'deleteColumn').mockResolvedValue(1);
      await columnControllers.deleteColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: 'Column deleted', column: mockColumn });
    });
    it('should delete column and collection', async () => {
      jest.spyOn(columnServices, 'getColumn').mockResolvedValue(mockColumn);
      jest.spyOn(contentTypeServices, 'getContentType').mockResolvedValue(mockContentType);
      jest.spyOn(collectionServices, 'getAllCollections').mockResolvedValue([{
        ...mockCollection,
        data: [mockCollection.data[0]]
      }]);
      jest.spyOn(collectionServices, 'deleteCollection').mockResolvedValue(1);
      jest.spyOn(collectionServices, 'editCollection').mockResolvedValue(1);
      jest.spyOn(columnServices, 'deleteColumn').mockResolvedValue(1);
      await columnControllers.deleteColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: 'Column deleted', column: mockColumn });
    });
    it('should return error', async () => {
      jest.spyOn(columnServices, 'deleteColumn').mockRejectedValue(new Error('Internal Server Error'));
      jest.spyOn(columnServices, 'getColumn').mockResolvedValue(mockColumn);
      jest.spyOn(contentTypeServices, 'getContentType').mockResolvedValue(mockContentType);
      jest.spyOn(collectionServices, 'getAllCollections').mockResolvedValue([mockCollection]);
      jest.spyOn(collectionServices, 'deleteCollection').mockResolvedValue(1);
      jest.spyOn(collectionServices, 'editCollection').mockResolvedValue(1);
      jest.spyOn(columnServices, 'deleteColumn').mockResolvedValue(1);
      jest.spyOn(contentTypeServices, 'getContentType').mockResolvedValue(mockContentType);
      await columnControllers.deleteColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
    // it('should return 404 error', async () => {
    //   jest.spyOn(columnServices, 'deleteColumn').mockRejectedValue(new HttpError('Column not found', 404));
    //   jest.spyOn(columnServices, 'getColumn').mockResolvedValue(mockColumn);
    //   jest.spyOn(columnServices, 'getColumn').mockResolvedValue(mockColumn);
    //   jest.spyOn(contentTypeServices, 'getContentType').mockResolvedValue(mockContentType);
    //   jest.spyOn(collectionServices, 'getAllCollections').mockResolvedValue([mockCollection]);
    //   jest.spyOn(collectionServices, 'deleteCollection').mockResolvedValue(1);
    //   jest.spyOn(collectionServices, 'editCollection').mockResolvedValue(1);
    //   jest.spyOn(contentTypeServices, 'getContentType').mockResolvedValue(mockContentType);
    //   await columnControllers.deleteColumn(mockReq, mockRes);
    //   expect(mockRes.status).toBeCalledWith(404);
    //   expect(mockRes.json).toBeCalledWith({ message: 'Column not found' });
    // });
    it('should return 404 error', async () => {
      jest.spyOn(columnServices, 'deleteColumn').mockResolvedValue(1);
      jest.spyOn(contentTypeServices, 'getContentType').mockResolvedValue(mockContentType);
      jest.spyOn(collectionServices, 'getAllCollections').mockResolvedValue([{
        ...mockCollection, data: [
          {
            ...mockCollection.data[0],
          }
        ]
      }]);
      jest.spyOn(collectionServices, 'deleteCollection').mockResolvedValue(1);
      jest.spyOn(collectionServices, 'editCollection').mockResolvedValue(1);
      jest.spyOn(columnServices, 'deleteColumn').mockResolvedValue(1);
      jest.spyOn(columnServices, 'getColumn').mockRejectedValue(new HttpError('Column not found', 404));
      jest.spyOn(contentTypeServices, 'getContentType').mockResolvedValue(mockContentType);
      await columnControllers.deleteColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'Column not found' });
    });
    it('should return 404 error', async () => {
      jest.spyOn(columnServices, 'deleteColumn').mockRejectedValue(1);
      jest.spyOn(columnServices, 'getColumn').mockResolvedValue(mockColumn);
      jest.spyOn(collectionServices, 'getAllCollections').mockResolvedValue([mockCollection]);
      jest.spyOn(collectionServices, 'deleteCollection').mockResolvedValue(1);
      jest.spyOn(collectionServices, 'editCollection').mockResolvedValue(1);
      jest.spyOn(columnServices, 'deleteColumn').mockResolvedValue(1);
      jest.spyOn(contentTypeServices, 'getContentType').mockRejectedValue(new HttpError('Content Type not found', 404));
      await columnControllers.deleteColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'Content Type not found' });
    });
  });
});