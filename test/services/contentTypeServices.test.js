const contentTypeServices = require('../../src/services/contentTypeServices');
const { contentType } = require('../../database/models');
const HttpError = require('../../src/util/errors/httpError');

const mockContentType = {
  contentTypeId: '1',
  userId: '100',
  contentTypeName: 'random',
};

describe('Content Type Services', () => {
  describe('getAllContentTypes', () => {
    it('should return all content types', async () => {
      const mockContentTypes = [mockContentType];
      jest.spyOn(contentType, 'findAll').mockResolvedValue(mockContentTypes);
      const contentTypes = await contentTypeServices.getAllContentTypes();
      expect(contentTypes).toEqual(mockContentTypes);
    });
  });
  describe('getContentType', () => {
    it('should return content type', async () => {
      jest.spyOn(contentType, 'findOne').mockResolvedValue(mockContentType);
      const contentTypeMock = await contentTypeServices.getContentType('1');
      expect(contentTypeMock).toEqual(mockContentType);
    });
    it('should throw error if content type not found', async () => {
      jest.spyOn(contentType, 'findOne').mockResolvedValue(null);
      await expect(contentTypeServices.getContentType('1')).rejects.toThrow(HttpError);
    });
  });
  describe('editContentType', () => {
    it('should return edited content type', async () => {
      jest.spyOn(contentType, 'update').mockResolvedValue([1]);
      jest.spyOn(contentType, 'findOne').mockResolvedValue(mockContentType);
      const contentTypeMock = await contentTypeServices.editContentType('1', 'contentTypeName', 'new name');
      expect(contentTypeMock).toEqual(mockContentType);
    });
  });
  describe('createContentType', () => {
    it('should return created content type', async () => {
      jest.spyOn(contentType, 'create').mockResolvedValue(mockContentType);
      const contentTypeMock = await contentTypeServices.createContentType('100', 'new name');
      expect(contentTypeMock).toEqual(mockContentType);
    });
  });
  describe('deleteContentType', () => {
    it('should return deleted content type', async () => {
      jest.spyOn(contentType, 'destroy').mockResolvedValue(1);
      const contentTypeMock = await contentTypeServices.deleteContentType('1');
      expect(contentTypeMock).toEqual(1);
    });
  });
});