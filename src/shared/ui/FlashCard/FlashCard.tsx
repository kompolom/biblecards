import React, { ReactNode } from 'react';
import Card, { CardProps } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

export type Side = 'front' | 'back';

export interface FlashCardProps extends CardProps {
  frontContent: ReactNode;
  backContent: ReactNode;
  frontActions?: ReactNode;
  backActions?: ReactNode;
  side?: Side
}

/**
 * Компонент отображает переворачивающуюся карточку
 */
export const FlashCard = ({
  frontContent,
  backContent,
  frontActions,
  backActions,
  side = 'front',
  ...props
}: FlashCardProps) => {

  return (
    <Card {...props}>
      <CardContent>{side === 'front' ? frontContent : backContent}</CardContent>
      <CardActions>{side === 'front' ? frontActions : backActions}</CardActions>
    </Card>
  );
};
