import React, { ReactNode, ElementType } from 'react';
import { Box, PaperProps, Paper } from '@mui/material';
import { ExcerptSource, useFormatSource } from '../../model';

export interface VersePreviewProps extends PaperProps {
  source: ExcerptSource;
  actions?: ReactNode | ReactNode[];
  component?: ElementType;
}

export const VersePreview = ({
  source,
  actions,
  ...props
}: VersePreviewProps) => {
  const format = useFormatSource();
  return (
    <Paper sx={{ p: 2, mb: 1 }} {...props}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ flex: '1 0 150px' }}>{format(source)}</Box>
        {actions ?? <Box>{actions}</Box>}
      </Box>
    </Paper>
  );
};
