import { IndexedDBClient, ReadRequest } from 'shared/indexeddb-client';

export type VerseDTO = {
    book: number,
    chapter: number,
    number: number,
    text: string,
    id?: number;
}

export class BiblecardsDB extends IndexedDBClient {

    static async init() {
        return IndexedDBClient.init('biblecards', 1, BiblecardsDB);
    }

    _upgrade(db) {
        switch (db.version) {
            case 1:
                const verses = db.createObjectStore(BiblecardsDB.VERSES_STORE, { keyPath: 'id', autoIncrement: true });
                verses.createIndex('book', 'book')
        }

    }

    async getVerses(req: ReadRequest): Promise<VerseDTO[]> {
        return super.read<VerseDTO>(BiblecardsDB.VERSES_STORE, req)
    }

    async createVerse(verse: VerseDTO): Promise<VerseDTO> {
        return super.create(BiblecardsDB.VERSES_STORE, verse);
    }

    async updateVerse(verse: VerseDTO): Promise<VerseDTO> {
        return super.update(BiblecardsDB.VERSES_STORE, verse);
    }

    async deleteVerse(id: Required<VerseDTO["id"]>): Promise<void> {
        await super.delete(BiblecardsDB.VERSES_STORE, id)
    }

    static VERSES_STORE = 'verses';

}