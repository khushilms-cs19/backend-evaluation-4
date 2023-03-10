const { UniqueConstraintError } = require('sequelize');
const contentTypeControllers = require('../../src/controllers/contentTypeControllers');
const contentTypeServices = require('../../src/services/contentTypeServices');
const HttpError = require('../../src/util/errors/httpError');

const mockReq = {
  params: {
    contentTypeId: 'contentTypeId',
    collectionId: 'collectionId',
    columnId: 'columnId',
  },
  body: {
    userId: 'userId',
    contentTypeName: 'contentTypeName',
  },
  user: {
    userId: 'userId',
  }
}

const mockRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
}

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


describe('Content-Type Controllers', () => {
  describe('getAllContentTypes', () => {
    it('should return all content types', async () => {
      jest.spyOn(contentTypeServices, 'getAllContentTypes').mockResolvedValue([mockContentType]);
      await contentTypeControllers.getAllContentTypes(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith([mockContentType]);
    });
    it('should return error', async () => {
      jest.spyOn(contentTypeServices, 'getAllContentTypes').mockRejectedValue(new Error('Internal Server Error'));
      await contentTypeControllers.getAllContentTypes(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
  });
  describe('editContentType', () => {
    it('should edit content type', async () => {
      jest.spyOn(contentTypeServices, 'editContentType').mockResolvedValue(mockContentType);
      await contentTypeControllers.editContentType(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        message: 'Content Type updated',
        contentType: mockContentType,
      });
    });
    it('should return 404 error', async () => {
      jest.spyOn(contentTypeServices, 'editContentType').mockRejectedValue(new HttpError('Content Type not found', 404));
      await contentTypeControllers.editContentType(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'Content Type not found' });
    })
    it('should return error', async () => {
      jest.spyOn(contentTypeServices, 'editContentType').mockRejectedValue(new Error('Internal Server Error'));
      await contentTypeControllers.editContentType(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
  });
  describe('createContentType', () => {
    it('should create content type', async () => {
      jest.spyOn(contentTypeServices, 'createContentType').mockResolvedValue(mockContentType);
      await contentTypeControllers.createContentType(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith(mockContentType);
    });
    it('should return 409 error', async () => {
      jest.spyOn(contentTypeServices, 'createContentType').mockRejectedValue(new UniqueConstraintError());
      await contentTypeControllers.createContentType(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(409);
      expect(mockRes.json).toBeCalledWith({ message: 'Content Type already exists' });
    });
    it('should return error', async () => {
      jest.spyOn(contentTypeServices, 'createContentType').mockRejectedValue(new Error('Internal Server Error'));
      await contentTypeControllers.createContentType(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
  });
  describe('deleteContentType', () => {
    it('should delete content type', async () => {
      jest.spyOn(contentTypeServices, 'deleteContentType').mockResolvedValue(mockContentType);
      await contentTypeControllers.deleteContentType(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(200);
      expect(mockRes.json).toBeCalledWith({
        message: 'Content Type deleted',
        contentType: mockContentType,
      });
    });
    it('should return 404 error', async () => {
      jest.spyOn(contentTypeServices, 'deleteContentType').mockRejectedValue(new HttpError('Content Type not found', 404));
      await contentTypeControllers.deleteContentType(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(404);
      expect(mockRes.json).toBeCalledWith({ message: 'Content Type not found' });
    })
    it('should return error', async () => {
      jest.spyOn(contentTypeServices, 'deleteContentType').mockRejectedValue(new Error('Internal Server Error'));
      await contentTypeControllers.deleteContentType(mockReq, mockRes);
      expect(mockRes.status).toBeCalledWith(500);
      expect(mockRes.json).toBeCalledWith({ message: 'Internal Server Error' });
    });
  });
});