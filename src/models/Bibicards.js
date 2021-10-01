import { Idb } from './Idb';
import {Verse} from "./Verse";
import {VerseStat} from "./VerseStat";

const VERSES_STORE = 'verses';
const STATS_STORE = 'stats';
export class BibicardsDB extends Idb {

    static async init() {
        return Idb.init('bibicards', 2, BibicardsDB);
    }

    _upgrade(db) {
        switch (db.version) {
            case 1:
                const verses = db.createObjectStore(VERSES_STORE, { keyPath: 'id', autoIncrement: true });
                verses.createIndex('book', 'book')
            case 2:
                const stats = db.createObjectStore(STATS_STORE, { keyPath: 'id' });
                stats.createIndex('id', 'id');
        }

    }

    async getVerses() {
        const verses = await super.read(VERSES_STORE, 10) // TODO: add pagination
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

    /**
     * Обновляет статистику стиха
     * @param {number} verseId
     * @param {number} views
     * @param {number} rightCount
     * @param {number} wrongCount
     * @return {Promise<VerseStat>}
     */
    async updateVerseStat(verseId, views, rightCount, wrongCount) {
            const hasItem = await this.count(STATS_STORE, IDBKeyRange.only(verseId)) !== 0;
            const statObj = new VerseStat(verseId, views, rightCount, wrongCount)
        if(hasItem) {
            const res = await this.update(STATS_STORE, statObj)
            return new VerseStat(res.id, res.views, res.right, res.wrong)
        } else {
            const res = await this.create(STATS_STORE, statObj)
            return new VerseStat(res.id, res.views, res.right, res.wrong)
        }
    }

    _verse2db(verse) {
        return verse.export();
    }

    _db2verse(data) {
        return Verse.create(data)
    }

}