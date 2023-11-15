import { IndexedDBClient } from 'shared/indexeddb-client';

export type VerseDTO = {
    book: number,
    chapter: number,
    number: number,
    text: string,
    id?: number;
}

const VERSES_STORE = 'verses';
export class BiblecardsDB extends IndexedDBClient {

    static async init() {
        return IndexedDBClient.init('biblecards', 1, BiblecardsDB);
    }

    _upgrade(db) {
        switch (db.version) {
            case 1:
                const verses = db.createObjectStore(VERSES_STORE, { keyPath: 'id', autoIncrement: true });
                verses.createIndex('book', 'book')
        }

    }

    async getVerses(): Promise<VerseDTO[]> {
        return super.read<VerseDTO>(VERSES_STORE, 10)
    }

    async createVerse(verse: VerseDTO): Promise<VerseDTO> {
        return super.create(VERSES_STORE, verse);
    }

    async updateVerse(verse: VerseDTO): Promise<VerseDTO> {
        return super.update(VERSES_STORE, verse);
    }

    async deleteVerse(id: Required<VerseDTO["id"]>): Promise<void> {
        await super.delete(VERSES_STORE, id)
    }

}