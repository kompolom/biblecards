import React, { ReactNode } from 'react';
import {
  Card,
  CardProps,
  CardContent,
  CardActions,
  Typography,
  Box,
} from '@mui/material';
import { IVerse } from '../../model';

export interface VerseCardProps extends CardProps {
  verse: IVerse;
  actions?: ReactNode | ReactNode[];
  renderProgress?: () => ReactNode;
  showSource?: boolean;
}

export const VerseCard = ({
  verse,
  actions,
  onClick,
  showSource,
  renderProgress,
  ...props
}: VerseCardProps) => {
  return (
    <Card {...props}>
      <CardContent sx={{ position: 'relative' }}>
        {renderProgress && (
          <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
            {renderProgress()}
          </Box>
        )}
        <Typography align="center" variant="h6">
          {verse.text}
        </Typography>
        {showSource && (
          <Typography align="right" variant="h6" color="text.secondary">
            {verse.toString()}
          </Typography>
        )}
      </CardContent>
      {actions ? <CardActions>{actions}</CardActions> : null}
    </Card>
  );
};
