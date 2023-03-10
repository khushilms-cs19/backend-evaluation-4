const columnControllers = require('../../src/controllers/columnControllers');
const columnServices = require('../../src/services/columnServices');
const contentTypeServices = require('../../src/services/contentTypeServices');
const HttpError = require('../../src/util/errors/httpError');

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
const mockColumn = {
  "columnId": "c894c0af-6122-4e77-98c4-d1b090996018",
  "contentTypeId": "f20fcc64-6300-4930-9f48-2ecfe87e1664",
  "name": "sham bhi koi 1",
  "createdAt": "2023-03-09T13:02:23.438Z",
  "updatedAt": "2023-03-09T13:02:23.438Z"
};

const mockContentType = {
  "contentTypeId": "ac60365d-f956-466f-be4f-30a2c6e69865",
  "userId": "1",
  "contentTypeName": "random 2",
  "usedColumns": [
    "sham bhi koi",
    "sham bhi koi 2"
  ],
  "createdAt": "2023-03-09T12:53:39.176Z",
  "updatedAt": "2023-03-09T12:57:33.843Z"
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
    it('should return 400 error', async () => {
      jest.spyOn(columnServices, 'getAllColumns').mockResolvedValue([mockColumn]);
      const newMockReq = {
        ...mockReq,
        body: {
          name: 'sham bhi koi 1',
          contentTypeId: 'f20fcc64-6300-4930-9f48-2ecfe87e1664',
        },
      }
      await columnControllers.addColumn(newMockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(400);
      expect(mockRes.json).toBeCalledWith({ message: 'Column already exists' });
    });
  });
  describe('deleteColumn', () => {
    it('should delete column', async () => {
      jest.spyOn(columnServices, 'getColumn').mockResolvedValue(mockColumn);
      jest.spyOn(contentTypeServices, 'getContentType').mockResolvedValue(mockContentType);
      jest.spyOn(columnServices, 'deleteColumn').mockResolvedValue(1);
      await columnControllers.deleteColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({ message: 'Column deleted', column: mockColumn });
    });
    it('should return error', async () => {
      jest.spyOn(columnServices, 'deleteColumn').mockRejectedValue(new Error('Internal Server Error'));
      jest.spyOn(columnServices, 'getColumn').mockResolvedValue(mockColumn);
      jest.spyOn(contentTypeServices, 'getContentType').mockResolvedValue(mockContentType);
      await columnControllers.deleteColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
    it('should return 404 error', async () => {
      jest.spyOn(columnServices, 'deleteColumn').mockRejectedValue(new HttpError('Column not found', 404));
      jest.spyOn(columnServices, 'getColumn').mockResolvedValue(mockColumn);
      jest.spyOn(contentTypeServices, 'getContentType').mockResolvedValue(mockContentType);
      await columnControllers.deleteColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'Column not found' });
    });
    it('should return 404 error', async () => {
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
      jest.spyOn(contentTypeServices, 'getContentType').mockRejectedValue(new HttpError('Content Type not found', 404));
      await columnControllers.deleteColumn(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'Content Type not found' });
    });
  });
});