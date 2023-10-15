import { useEffect, useState } from 'react';
import { BibicardsDB } from '../../models/Bibicards';

export function useInitDb() {
    const [db, setDbInstance] = useState<BibicardsDB>(new BibicardsDB());
    useEffect(() => {
        BibicardsDB.init().then(setDbInstance);
    }, []);
    return db;
}