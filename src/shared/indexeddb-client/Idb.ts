export class IndexedDBClient {
    static async init<T extends IndexedDBClient>(name: string, version: number, Cls?: new (a: string, b: number) => T) {
        const instance = Cls ? new Cls(name, version) : new IndexedDBClient(name, version);
        return await instance.init();
    }

    /**
     * @type IDBDatabase
     */
    #db: IDBDatabase;
    /**
     * @type string
     */
    #dbName: string;
    /**
     * @type number
     */
    #dbVersion: number;

    /**
     * @param {String} name database name
     * @param {Number} version database version
     */
    constructor(name: string, version: number) {
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
            openRequest.onupgradeneeded = (e: any) => {
                this.#db = e.target.result;
                this._upgrade(this.#db, e);
            };
            openRequest.onsuccess = (e: any) => {
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
    protected _upgrade(db: IDBDatabase, e: IDBVersionChangeEvent) { }

    protected _getTransaction(store: string, mode: IDBTransactionMode) {
        return this.#db.transaction(store, mode);
    }

    /**
     * Create object in store
     * @param {string} storeName
     * @param {any} data
     * @return {Promise}
     */
    async create<DataType>(storeName: string, data: DataType): Promise<DataType> {
        return new Promise((resolve, reject) => {
            const transaction = this._getTransaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            let created: any;
            transaction.oncomplete = (_e) => resolve(created)
            transaction.onerror = reject;
            store.add(data)
                .onsuccess = (e: any) => store.get(e.target.result)
                    .onsuccess = (e: any) => created = e.target.result
        });
    }

    async read<DataType>(storeName: string, count = 0, offset = 0): Promise<DataType[]> {
        return new Promise((resolve, reject) => {
            const store = this.#db.transaction(storeName).objectStore(storeName);
            const req = store.openCursor();
            const acc = [], end = count + offset;
            let counter = offset;
            req.onerror = reject;
            req.onsuccess = (e: any) => {
                const cursor = e.target.result;
                if (!cursor) return resolve(acc);
                if (offset && counter === offset) cursor.advance(offset);
                acc.push(cursor.value);
                if (counter >= end) return resolve(acc);
                counter++;
                cursor.continue();
            }
        });
    }

    async readOne<DataType>(storeName: string, query: IDBValidKey | IDBKeyRange): Promise<DataType> {
        return new Promise((resolve, reject) => {
            const transaction = this.#db.transaction(storeName),
                store = transaction.objectStore(storeName);
            transaction.onerror = reject;
            store.get(query).onsuccess = (e: any) => resolve(e.target.result)
        })
    }

    async count(storeName: string, query: IDBValidKey | IDBKeyRange): Promise<number> {
        return new Promise((resolve, reject) => {
            const store = this.#db.transaction(storeName).objectStore(storeName)
            const req = store.count(query)
            req.onerror = reject
            req.onsuccess = (e: any) => resolve(e.target.result)
        })
    }

    async update<DataType>(storeName: string, data: DataType): Promise<DataType> {
        return new Promise((resolve, reject) => {
            const transaction = this.#db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            let result: any;
            transaction.oncomplete = (e) => resolve(result);
            transaction.onerror = reject;
            store.put(data)
                .onsuccess = (e: any) => store.get(e.target.result)
                    .onsuccess = (e: any) => result = e.target.result;
        });
    }

    async delete(storeName: string, query: IDBValidKey | IDBKeyRange): Promise<void> {
        return new Promise((resolve, reject) => {
            const transaction = this.#db.transaction(storeName, 'readwrite');
            const store = transaction.objectStore(storeName);
            transaction.oncomplete = () => resolve();
            transaction.onerror = reject;
            store.delete(query);
        });
    }
}