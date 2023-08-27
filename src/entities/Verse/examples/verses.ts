import { IVerse, Verse } from "../model";

const verses: IVerse[] = [
    { id: 1, book: { number: 1, title: 'Genesis' }, chapter: 1, number: 1, text: 'In the beginning God created the heavens and the earth.' },
    { id: 2, book: { number: 3, title: 'Leviticus' }, chapter: 19, number: 32, text: 'Before gray hair you should rise up, and you must show honor to an older man, and you must be in fear of your God. I am Jehovah.' },
    { id: 3, book: { number: 40, title: 'Matthew' }, chapter: 7, number: 12, text: 'All things, therefore, that you want men to do to you, you also must do to them. This, in fact, is what the Law and the Prophets mean.' }
].map(Verse.create)

export default verses;