import React, { useLayoutEffect, useMemo, useState } from 'react';
import { Box, Button as MuiButton } from '@mui/material';
import { Scramble } from '../model';
import { Excerpt } from 'entities/Verse';
import { BCScramble } from './scramble.component';
import { Button } from 'shared/ui/Button';

export interface ScrambleProps {
  excerpt: Excerpt;
  onComplete: () => void;
}
export const ScrambleSession = (props: ScrambleProps) => {
  useLayoutEffect(BCScramble.register, []);
  const scramble = useMemo(() => new Scramble(props.excerpt), [props.excerpt]);
  const session = useMemo(() => scramble.start(), [scramble]);
  const [step, setStep] = useState(() => session.next());

  return (
    <bc-scramble>
      <Box sx={{ display: 'contents' }} slot="result">
        {scramble.result.map((word, i) => (
          <Button
            onClick={() => {
              console.debug('cancel', word);
              scramble.cancel(i);
            }}
          >
            {word}
          </Button>
        ))}
      </Box>
      <Box slot="words" sx={{ display: 'contents' }}>
        {step.value.map((word) => (
          <Button onClick={() => setStep(session.next(word))}>{word}</Button>
        ))}
      </Box>
      <MuiButton
        size="large"
        sx={{ width: 1 }}
        onClick={() => {
          const result = scramble.check();
        }}
        disabled={!step.done}
        variant="contained"
      >
        Check
      </MuiButton>
    </bc-scramble>
  );
};
