import React, { ReactNode } from 'react';
import {
  Card,
  CardProps,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import { IVerse } from '../../model';

export interface VerseCardProps extends CardProps {
  verse: IVerse;
  actions?: ReactNode | ReactNode[];
  showSource?: boolean;
}

export const VerseCard = ({
  verse,
  actions,
  onClick,
  showSource,
  ...props
}: VerseCardProps) => {
  return (
    <Card {...props}>
      <CardContent>
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
