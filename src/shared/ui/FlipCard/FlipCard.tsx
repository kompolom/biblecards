import React, { useReducer, useCallback, useState } from 'react';
import { FlashCard, FlashCardProps } from '../FlashCard';
import { reduceFlashCard, flip } from './reducer';
import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

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

const StyledCard = styled.div`
${(props: FlipCardProps) => props.side === "front" && css`
  animation: ${rotateAnimation} 2s linear;
`}

${(props: FlipCardProps) => props.side === "back" && css`
  animation: ${rotateAnimation} 2s linear;
`}
`

export const FlipCard = ({ onFlip = () => {}, ...props }: FlipCardProps) => {
  const [side, dispatch] = useReducer(reduceFlashCard, props.side);
  const doFlip = useCallback(() => { 
    flip(dispatch);
    onFlip();
 }, []);

  return (
    <StyledCard {...props}>
      <FlashCard  onClick={doFlip} {...props} side={side} />
    </StyledCard>
  );
};
