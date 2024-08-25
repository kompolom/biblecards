import { IStatRecord } from './IStatRecord';

export interface IStatCollection {
  verseId: number | string;
  failCount: number;
  successCount: number;
  records: IStatRecord[];
}
