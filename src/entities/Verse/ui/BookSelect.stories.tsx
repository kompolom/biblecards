import React from 'react';
import { BookSelect } from './BookSelect'
const meta = {
    component: BookSelect,
}
export default meta;

export const Main = {
    render: () => <BookSelect bookTranlator={(book) => `Book #${book}`} />
}