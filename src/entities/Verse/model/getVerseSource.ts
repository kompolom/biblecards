import { IVerse } from "./IVerse";
import { Verse } from "./Verse.model";

type LegacyVerse = { source: string };

export function getVerseSource(verse: Verse | IVerse | LegacyVerse): string {
    if (verse instanceof Verse) return verse.toString();
    if (isLegacy(verse)) return verse.source;
    return `${verse.book.title} ${verse.chapter}:${verse.number}`
}

function isLegacy(data: unknown): data is LegacyVerse {
    return data.hasOwnProperty('source') && typeof data['source'] === 'string';
}