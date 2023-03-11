import { Bible } from './Bible.model';

it('should create bible model', () => {
    const book = { title: 'Genesis', number: 1}
    const bible = new Bible([book])
    expect(bible.books).toEqual(expect.arrayContaining([book]));
});
