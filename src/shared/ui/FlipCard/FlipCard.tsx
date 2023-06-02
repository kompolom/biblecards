import React, { useReducer, useCallback, } from 'react';
import { FlashCard, FlashCardProps } from '../FlashCard';
import { reduceFlashCard, flip } from './reducer';
import { keyframes } from '@emotion/react';
import { styled } from '@mui/material';

export interface FlipCardProps extends FlashCardProps {
    onFlip?: () => void
}

const rotateAnimation = keyframes`
0% {
  transform: rotateY(0deg);
}
50% {
  transform: rotateY(90deg);
}
100% {
  transform: rotateY(0deg);
}
`

export const FlipCard = styled(({ onFlip = () => {}, side = 'front', ...props }: FlipCardProps) => {
  const [currentSide, dispatch] = useReducer(reduceFlashCard, side);
  const doFlip = useCallback((e) => { 
    e.currentTarget.style.animationPlayState = 'running';
    flip(dispatch);
    onFlip();
 }, []);

  return (<FlashCard onClick={doFlip} {...props} side={currentSide} onAnimationEnd={(e: any) => {
    e.target.style.animationName = 'reset';
    setTimeout(() => {
      e.target.style.animationName = '';
      e.target.style.animationPlayState = '';
    }, 0)
  }} />);
})(() => ({
    animationPlayState: 'paused',
    animationName: `${rotateAnimation}`,
    animationDuration: '.5s',
    animationTimingFunction: 'ease'
}));
