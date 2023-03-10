const columnServices = require('../../src/services/columnServices');
const HttpError = require('../../src/util/errors/httpError');
const { column } = require('../../database/models');

const mockColumns = [
  {
    columnId: '1',
    contentTypeId: '100',
    name: 'sham bhi koi 1',
  },
  {
    columnId: '2',
    contentTypeId: '100',
    name: 'sham bhi koi 2',
  },
];

describe('Column Services', () => {
  describe('getAllColumns', () => {
    it('should return all columns', async () => {
      jest.spyOn(column, 'findAll').mockResolvedValue(mockColumns);
      const columns = await columnServices.getAllColumns('100');
      expect(columns).toEqual(mockColumns);
    });
    it('should throw error if columns not found', async () => {
      jest.spyOn(column, 'findAll').mockResolvedValue(null);
      await expect(columnServices.getAllColumns('100')).rejects.toThrow(HttpError);
    });
  });
  describe('getColumn', () => {
    it('should return column', async () => {
      jest.spyOn(column, 'findOne').mockResolvedValue(mockColumns[0]);
      const col = await columnServices.getColumn('1');
      expect(col).toEqual(mockColumns[0]);
    });
    it('should throw error if column not found', async () => {
      jest.spyOn(column, 'findOne').mockResolvedValue(null);
      await expect(columnServices.getColumn('1')).rejects.toThrow(HttpError);
    });
  });
  describe('editColumn', () => {
    it('should return edited column', async () => {
      jest.spyOn(column, 'update').mockResolvedValue([1]);
      jest.spyOn(column, 'findOne').mockResolvedValue(mockColumns[0]);
      const col = await columnServices.editColumn('1', 'new name');
      expect(col).toEqual(mockColumns[0]);
    });
    it('should throw error if column not found', async () => {
      jest.spyOn(column, 'update').mockResolvedValue([0]);
      await expect(columnServices.editColumn('1', 'new name')).rejects.toThrow(HttpError);
    });
  });
  describe('createColumn', () => {
    it('should return created column', async () => {
      jest.spyOn(column, 'create').mockResolvedValue(mockColumns[0]);
      const col = await columnServices.createColumn('100', 'new name');
      expect(col).toEqual(mockColumns[0]);
    });
  });
  describe('deleteColumn', () => {
    it('should return deleted column', async () => {
      jest.spyOn(column, 'destroy').mockResolvedValue(1);
      const col = await columnServices.deleteColumn('1');
      expect(col).toEqual(1);
    });
    it('should throw error if column not found', async () => {
      jest.spyOn(column, 'destroy').mockResolvedValue(0);
      await expect(columnServices.deleteColumn('1')).rejects.toThrow(HttpError);
    });
  });
});