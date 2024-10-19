import { parseCSV, csvValuesToRecords } from './parser';
const csv = `id,text
v001001001,simplte text
v001001002,"text, with, quotes"

`;

describe('parser', () => {
  it('should parse csv string', () => {
    const parsed = parseCSV(csv);
    expect(parsed.keys).toEqual(expect.arrayContaining(['id', 'text']));
  });

  it('should convert to object', () => {
    const v = csvValuesToRecords(parseCSV(csv));
    expect(v).toBeInstanceOf(Array);
    expect(v).toHaveLength(2);
    expect(v[0]).toHaveProperty('id', 'v001001001');
    expect(v[0]).toHaveProperty('text', 'simplte text');
  });
});
