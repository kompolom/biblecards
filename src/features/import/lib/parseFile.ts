import { parseCSV, csvValuesToRecords } from 'shared/csv'

const readFile = (file: File): Promise<string> => {
    const { reject, resolve, promise } = Promise.withResolvers<string>();
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = (e) => resolve(e.target.result as string);
    reader.readAsText(file);
    return promise;
}

export const parseFile = async (file: File) => {
    const csv = await readFile(file);
    return parseCSV(csv);
}