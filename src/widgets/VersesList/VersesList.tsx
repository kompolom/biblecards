import React from 'react';
import {
  VersesList,
  VersesStoreShape,
  VersesState,
  VersePreview,
} from 'entities/Verse';
import { useSelector } from 'react-redux';
import { VerseDeleteButton, VerseEditButton } from 'features/Verse';
import { ButtonGroup } from '@mui/material';

export const VersesListWidget = () => {
  const verses = useSelector<VersesStoreShape, VersesState>(
    (state) => state.verses,
  );
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
