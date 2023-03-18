import React, { useReducer, useCallback } from 'react';
import { FlashCard, FlashCardProps } from '../FlashCard';
import { reduceFlashCard, flip } from './reducer';

export interface FlipCardProps extends FlashCardProps {
    onFlip?: () => void
}

export const FlipCard = ({ onFlip = () => {}, ...props }: FlipCardProps) => {
  const [side, dispatch] = useReducer(reduceFlashCard, props.side);
  const doFlip = useCallback(() => { 
    flip(dispatch);
    onFlip();
 }, []);

  return <FlashCard onClick={doFlip} {...props} side={side} />;
};
