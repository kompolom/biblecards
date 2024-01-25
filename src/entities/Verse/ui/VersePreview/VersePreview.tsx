import React, { ReactNode, ElementType } from 'react';
import { Box, PaperProps, Paper } from '@mui/material';
import { IVerse } from '../../model';
import { getVerseSource } from '../../lib';

export interface VersePreviewProps extends PaperProps {
  verse: IVerse;
  actions?: ReactNode | ReactNode[];
  component?: ElementType;
}

export const VersePreview = ({
  verse,
  actions,
  ...props
}: VersePreviewProps) => {
  return (
    <Paper sx={{ p: 2, mb: 1 }} {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: '1 0 150px' }}>{getVerseSource(verse)}</Box>
        {actions ?? <Box>{actions}</Box>}
      </Box>
    </Paper>
  );
};
