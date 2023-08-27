import React, { ReactNode } from 'react';
import {
  Typography,
} from '@mui/material';
import { IVerse } from '../../model';
import { FlipCard, FlipCardProps } from 'shared/ui/FlipCard';

export interface VerseFlipCardProps {
  verse: IVerse;
  side?: FlipCardProps['side'];
  onFlip?: () => void;
  actions?: ReactNode | ReactNode[];
}

export const VerseFlipCard = ({
  side = 'front',
  verse,
  actions,
  onFlip,
}: VerseFlipCardProps) => {
  return (
    <FlipCard
      side={side}
      onFlip={onFlip}
      frontContent={
        <Typography align="center" variant="h6">
          {verse.text}
        </Typography>
      }
      backContent={
        <Typography align="center" variant="h6" color="text.secondary">
          {verse.toString()}
        </Typography>
      }
      frontActions={actions}
    />
  );
};
