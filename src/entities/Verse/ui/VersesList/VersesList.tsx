import React from 'react';
import Stack from '@mui/material/Stack';

export interface VerseListProps {
  children: React.ReactNode[]
}

export const VersesList = ({ children }: VerseListProps) => {
  return (
    <Stack component="ul" sx={{ listStyle: 'none', paddingInlineStart: 0, marginBlockStart: 0, marginBlockEnd: 0, p: 1}}>
      {children}
    </Stack>
  );
};
