import { Bible } from 'entities/Bible';
import { Verse } from 'entities/Verse';
import { VerseFormFields  } from './VerseFormFields';

export function verseToForm(verse: Verse, bible: Bible): VerseFormFields {
    return {
        id: verse.id,
        book: verse.book.number? verse.book.number: bible.getBookByTitle(verse.book.title).number,
        number: String(verse.number),
        text: verse.text,
        chapter: String(verse.chapter)
    };
}

export function formToVerse(form: VerseFormFields, bible: Bible): Verse {
    return Verse.create({
        id: form.id || 0,
        book: bible.getBookByNumber(Number(form.book)),
        chapter: Number(form.chapter) || 1,
        number: form.number,
        text: form.text
    });
}