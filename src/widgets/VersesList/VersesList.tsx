import React from 'react';
import {
  VersesList,
  VersePreview,
  versesListSelector,
} from 'entities/Verse';
import { useSelector } from 'react-redux';
import { VerseDeleteButton, VerseEditButton } from 'features/Verse';
import { ButtonGroup, Box } from '@mui/material';
import './VersesList.css';

export const VersesListWidget = () => {
  const verses = useSelector(versesListSelector);
  return (
    <VersesList>
      {verses.map((verse) => (
        <Box component="li" key={verse.id} sx={{ containerType: 'normal'}} >
        <VersePreview
          key={verse.id}
          verse={verse}
          actions={
            <div className="VersesList-Actions">
              <ButtonGroup>
                <VerseEditButton verseId={verse.id} />
                <VerseDeleteButton verseId={verse.id} />
              </ButtonGroup>
            </div>
          }
        /></Box>
      ))}
    </VersesList>
  );
};
