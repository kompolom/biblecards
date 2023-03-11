import { Verse } from './Verse.model';

it('should create single verse', () => {
    const verse = Verse.create({
        id: 0,
        book: { number: 1, title: 'Genesis' },
        chapter: 1,
        number: 1,
        text: 'In the beginnig God created the heavens and the earth.'
    });

    expect(verse.toString()).toBe('Genesis 1:1');
});