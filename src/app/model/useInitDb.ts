import { useEffect, useState } from 'react';
import { BiblecardsDB } from '../database/Bibicards';

export function useInitDb() {
    const [db, setDbInstance] = useState<BiblecardsDB>(null);
    useEffect(() => {
        BiblecardsDB.init().then(setDbInstance);
    }, []);
    return db;
}