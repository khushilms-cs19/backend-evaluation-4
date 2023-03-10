const columnUtils = require('../../../src/util/columnUtils/columnUtils');
const HttpError = require('../../../src/util/errors/httpError');

const mockColumn = {
  columnId: '1',
  contentTypeId: '100',
  name: 'sham bhi koi 1',
};

const mockData = [
  {
    columnId: '1',
    value: 'value',
  },
];

describe('Column Utils', () => {
  describe('getColumns', () => {
    it('should not throw error', async () => {
      expect(columnUtils.checkColumnExists([mockColumn], mockData)).toEqual(undefined);
    });
    it('should throw error', async () => {
      expect(() => columnUtils.checkColumnExists([{ ...mockColumn, columnId: '2' }], mockData)).toThrow(new HttpError('Column does not exist', 404));
    });
  });
});
