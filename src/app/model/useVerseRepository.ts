import {useInitDb} from "./useInitDb";
import {useEffect, useState} from "react";
import {useBible} from "entities/Bible";
import { IVerseRepository } from "features/Verse";
import {VerseRepository} from "../repositories/Verse.repository";
import {isBrowser} from "shared/utils";

export function useVerseRepository() {
    const [repo, setRepo] = useState<IVerseRepository>(null);
    const db = useInitDb();
    const bible = useBible();
    useEffect(() => {
        if(!db) return;
        const repo = new VerseRepository(db, bible);
        setRepo(repo);
        isBrowser() && (window['verseRepository'] = repo)
    }, [db, bible]);
    return repo;
}