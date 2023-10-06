import React from 'react';
import {
  VersesList,
  VersePreview,
  versesListSelector,
} from 'entities/Verse';
import { useSelector } from 'react-redux';
import { VerseDeleteButton, VerseEditButton } from 'features/Verse';
import { ButtonGroup } from '@mui/material';

export const VersesListWidget = () => {
  const verses = useSelector(versesListSelector);
  return (
    <VersesList>
      {verses.map((verse) => (
        <VersePreview
          key={verse.id}
          verse={verse}
          component="li"
          actions={
            <ButtonGroup>
              <VerseEditButton verseId={verse.id} />
              <VerseDeleteButton verseId={verse.id} />
            </ButtonGroup>
          }
        />
      ))}
    </VersesList>
  );
};
