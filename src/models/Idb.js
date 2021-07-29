export class Idb {
    static async init(name, version, Cls) {
        const instance = Cls? new Cls(name, version): new Idb(name, version);
        return await instance.init();
    }

    /**
     * @type IDBDatabase
     */
    #db;
    /**
     * @type string
     */
    #dbName;
    /**
     * @type number
     */
    #dbVersion;

    /**
     * @param {String} name database name
     * @param {Number} version database version
     */
    constructor(name, version) {
        this.#dbName = name;
        this.#dbVersion = version;
    }

    async init() {
        return new Promise((resolve, reject) => {
            const openRequest = indexedDB.open(this.#dbName, this.#dbVersion);
            openRequest.onblocked = function (e) {
                reject(e);
            }
            openRequest.onerror = function (e) {
                reject(e);
            }
            openRequest.onupgradeneeded = (e) => {
                this.#db = e.target.result;
                this._upgrade(this.#db, e);
            };
            openRequest.onsuccess = e => {
                this.#db = e.target.result;
                resolve(this);
            }
        });
    }

    /**
     * Upgrade db scheme
     * @protected
     * @param {IDBDatabase} db
     * @param {IDBVersionChangeEvent} e
     */
    _upgrade(db, e) {}

    _getTransaction(store, mode) {
        return this.#db.transaction(store, mode);
    }

    /**
     * Create object in store
     * @param {string} storeName
     * @param {any} data
     * @return {Promise}
     */
    async create(storeName, data){
        return new Promise((resolve, reject) => {
            const transaction = this._getTransaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            transaction.oncomplete = resolve;
            transaction.onerror = reject;
            store.add(data);
        });
    }

    async read(storeName, count = 0, offset = 0){
        return new Promise((resolve, reject) => {
            const store = this.#db.transaction(storeName).objectStore(storeName);
            const req = store.openCursor();
            const acc = [], end = count + offset;
            let counter = offset;
            req.onerror = reject;
            req.onsuccess = (e) => {
                const cursor = e.target.result;
                if(!cursor) return resolve(acc);
                if(offset && counter === offset) cursor.advance(offset);
                acc.push(cursor.value);
                if(counter >= end) return resolve(acc);
                counter++;
                cursor.continue();
            }
        });
    }

    async update(storeName, data){
        return new Promise((resolve, reject) => {
            const transaction = this.#db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            transaction.oncomplete = resolve;
            transaction.onerror = reject;
            store.put(data);
        });
    }

    async delete(storeName, query){
        return new Promise((resolve, reject) => {
            const transaction = this.#db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            transaction.oncomplete = resolve;
            transaction.onerror = reject;
            store.delete(query);
        });
    }
}