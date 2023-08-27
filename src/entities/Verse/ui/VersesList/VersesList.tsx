import React from 'react';
import List from '@mui/material/List';
import { VersePreview } from '../VersePreview';
import { IVerse } from '../../model';

export interface VerseListProps {
  verses: IVerse[];
}

export const VersesList = ({ verses = [] }: VerseListProps) => {
  return (
    <List>
      {verses.map((verse) => (
        <VersePreview component="li" key={verse.id} verse={verse} />
      ))}
    </List>
  );
};
