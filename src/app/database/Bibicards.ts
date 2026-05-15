import { IndexedDBClient, ReadRequest } from 'shared/indexeddb-client';

export type VerseDTO = {
  id: string;
  text: string;
};

export type ProgressDTO = {
  excerptId: string;
  masteryLevel: number;
  srs: {
    lastReviewDate: string;
    nextReviewDate: string;
    interval: number;
    easeFactor: number;
  };
  stats: {
    successCount: number;
    failCount: number;
    bestAccuracy: number;
  };
  updatedAt: string;
};

export class BiblecardsDB extends IndexedDBClient {
  static async init() {
    return IndexedDBClient.init('biblecards', 2, BiblecardsDB);
  }

  protected _upgrade(db: IDBDatabase, e: IDBVersionChangeEvent) {
    if (e.oldVersion < 1) {
      db.createObjectStore(BiblecardsDB.VERSES_STORE, { keyPath: 'id' });
    }
    if (e.oldVersion < 2) {
      const progressStore = db.createObjectStore(BiblecardsDB.PROGRESS_STORE, {
        keyPath: 'excerptId',
      });
      progressStore.createIndex('nextReviewDate', 'srs.nextReviewDate', {
        unique: false,
      });
    }
  }

  async getVerses(req: ReadRequest): Promise<VerseDTO[]> {
    return super.read<VerseDTO>(BiblecardsDB.VERSES_STORE, req);
  }

  async createVerse(verse: VerseDTO): Promise<VerseDTO> {
    return super.create(BiblecardsDB.VERSES_STORE, verse);
  }

  async updateVerse(verse: VerseDTO): Promise<VerseDTO> {
    return super.update(BiblecardsDB.VERSES_STORE, verse);
  }

  async deleteVerse(id: Required<VerseDTO['id']>): Promise<void> {
    await super.delete(BiblecardsDB.VERSES_STORE, id);
  }

  async getProgress(excerptId: string): Promise<ProgressDTO | null> {
    return super.readOne<ProgressDTO>(BiblecardsDB.PROGRESS_STORE, excerptId);
  }

  async saveProgress(progress: ProgressDTO): Promise<ProgressDTO> {
    return super.update(BiblecardsDB.PROGRESS_STORE, progress);
  }

  async getAllProgress(): Promise<ProgressDTO[]> {
    return super.read<ProgressDTO>(BiblecardsDB.PROGRESS_STORE, {
      count: 1000,
    });
  }

  async getDueProgress(date: string): Promise<ProgressDTO[]> {
    return super.read<ProgressDTO>(BiblecardsDB.PROGRESS_STORE, {
      query: IDBKeyRange.upperBound(date),
      count: 1000,
    });
  }

  static VERSES_STORE = 'verses';
  static PROGRESS_STORE = 'progress';
}
