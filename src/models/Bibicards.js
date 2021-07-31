import { Idb } from './Idb';
import {Verse} from "./Verse";

const VERSES_STORE = 'verses';
export class BibicardsDB extends Idb {

    static async init() {
        return Idb.init('bibicards', 1, BibicardsDB);
    }

    _upgrade(db) {
        const verses = db.createObjectStore(VERSES_STORE, { keyPath: 'id', autoIncrement: true });
        verses.createIndex('book', 'book')

    }

    async getVerses() {
        const verses = await super.read(VERSES_STORE, 10)
        return verses.map(this._db2verse)
    }

    async createVerse(verse) {
        const data = await super.create(VERSES_STORE, this._verse2db(verse));
        return this._db2verse(data)
    }

    async updateVerse(verse) {
        return this._db2verse(
            await super.update(VERSES_STORE, this._verse2db(verse))
        )
    }

    async deleteVerse(id) {
        return super.delete(VERSES_STORE, id)
    }

    _verse2db(verse) {
        return verse.export();
    }

    _db2verse(data) {
        return Verse.create(data)
    }

}