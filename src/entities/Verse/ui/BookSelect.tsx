import React, { useMemo } from 'react';
import Select from '@mui/material/Select';
import { SelectProps } from '@mui/material/Select';
import { BookTranslator } from '../model';
import { bookIterator } from '../lib';

export interface BookSelectProps extends SelectProps {
  bookTranlator: BookTranslator;
}

export const BookSelect = ({ bookTranlator, ...props }: BookSelectProps) => {
  const books = useMemo(() => Array.from({ [Symbol.iterator]: bookIterator }), []);
  return (
    <Select {...props}>
      {books.map((bookNumber) => (
        <option key={bookNumber} value={bookNumber}>
          {bookTranlator(bookNumber)}
        </option>
      ))}
    </Select>
  );
};
