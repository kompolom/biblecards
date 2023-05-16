import React, { useReducer, useCallback, useEffect, useRef, RefObject, MutableRefObject } from 'react';
import { FlashCard, FlashCardProps, Side } from '../FlashCard';
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

export const FlipCard = styled(({ onFlip = () => {}, ...props }: FlipCardProps) => {
  const [side, dispatch] = useReducer(reduceFlashCard, props.side);
  const doFlip = useCallback(() => { 
    flip(dispatch);
    onFlip();
 }, []);

 const cardRef: MutableRefObject<Side> = useRef(side);

  return (<FlashCard sx={{
    animationPlayState: side === cardRef.current ? 'paused' : 'running'
  }} onClick={doFlip} {...props} side={side} />);
})(() => ({
    animationName: `${rotateAnimation}`,
    animationDuration: '1s',
    animationTimingFunction: 'ease'
}));
