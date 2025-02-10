import { Excerpt, ExcerptSource, VerseSource } from 'entities/Verse';
import { VerseFormFields  } from './VerseFormFields';

export function verseToForm(verse: Excerpt): VerseFormFields {
    return {
        id: verse.id,
        book: verse.source.start.book,
        chapter: String(verse.source.start.chapter),
        number: String(verse.source.start.verse),
        text: verse.text,
    };
}

export function formToVerse(form: VerseFormFields): Excerpt {
    const src = new ExcerptSource(new VerseSource({ book: Number(form.book), chapter: Number(form.chapter) || 1, verse: Number(form.number) }));
    return new Excerpt(src, form.text)
}