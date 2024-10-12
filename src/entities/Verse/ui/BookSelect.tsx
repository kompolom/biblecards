import React, { useMemo } from 'react';
import NativeSelect from '@mui/material/NativeSelect';
import { NativeSelectProps } from '@mui/material/NativeSelect';
import { BookTranslator } from '../model';
import { bookIterator } from '../lib';

export interface BookSelectProps extends NativeSelectProps {
  bookTranlator: BookTranslator;
}

export const BookSelect = ({ bookTranlator, ...props }: BookSelectProps) => {
  const books = useMemo(() => Array.from({ [Symbol.iterator]: bookIterator }), []);
  return (
    <NativeSelect {...props}>
      {books.map((bookNumber) => (
        <option key={bookNumber} value={bookNumber}>
          {bookTranlator(bookNumber)}
        </option>
      ))}
    </NativeSelect>
  );
};
