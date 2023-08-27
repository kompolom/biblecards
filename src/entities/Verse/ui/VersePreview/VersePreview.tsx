import React, { ReactNode } from 'react';
import { Verse } from '../../model';
import { Box, BoxProps } from '@mui/material';

export interface VersePreviewProps extends BoxProps {
  verse: Verse;
  actions?: ReactNode | ReactNode[];
}

export const VersePreview = ({
  verse,
  actions,
  ...props
}: VersePreviewProps) => {
  return (
    <Box {...props}>
      <Box>{verse.toString()}</Box>
      {actions ? <Box>{actions}</Box> : null}
    </Box>
  );
};
