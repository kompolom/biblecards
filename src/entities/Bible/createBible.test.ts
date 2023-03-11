import { Bible } from './Bible.model';
import { createBible } from './createBible';

it('should create instance', () => {
    expect(createBible()).toBeInstanceOf(Bible);
});