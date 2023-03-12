import { Bible } from 'entities/Bible';
import { Verse } from 'entities/Verse';
import { VerseFormFields  } from './VerseFormFields';

export function verseToForm(verse: Verse): VerseFormFields {
    return {
        id: verse.id,
        book: verse.book.number,
        number: String(verse.number),
        text: verse.text,
        chapter: verse.chapter === 1? '' : String(verse.chapter)
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