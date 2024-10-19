import { quoted, until, or } from '../parser';
export type CSVValues = { keys: string[]; values: ArrayLike<string>[], }
export const parseCSV = (
  csv: string,
): CSVValues => {
  const generator = parseRow(csv);
  const step = generator.next();
  const keys = step.value as string[];
  const values = [];
  for (let row of generator) {
    if (row.length < keys.length) continue;
    values.push(
      keys.reduce(
        (acc, _, i) => {
          acc[i] = row[i];
          return acc;
        },
        { length: keys.length },
      ),
    );
  }
  return { keys, values };
};

function* parseRow(csv: string) {
  const getRow = until('\n');
  const comma = until(',');
  const quote = until('"');
  const quotedValue = quoted();
  const matchColumn = or([comma, comma], [quote, quotedValue]);
  let csvPointer = -1;

  while (csvPointer < csv.length) {
    let row = getRow.exec(csv, csvPointer);
    let rowPointer = -1;
    let results = [];
    csvPointer = row.end;

    while (rowPointer < row.value.length) {
      const { value, end } = matchColumn.exec(row.value, rowPointer);
      results.push(value);
      rowPointer = end;
    }
    yield results;
  }
}

export const csvValuesToRecords = (csv: CSVValues): Array<Record<string, string>> => {
  return csv.values.map((value) => 
    csv.keys.reduce((acc, key, i) => {
      acc[key] = value[i];
      return acc;
    }, {})
  );
}