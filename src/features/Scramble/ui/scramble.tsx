import React, {
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  useCallback,
} from 'react';
import { BehaviorSubject } from 'rxjs';
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
  const subject = useMemo(() => {
    return new BehaviorSubject(scramble.result);
  }, [scramble]);
  const cancel = useCallback(
    (index: number) => {
      scramble.cancel(index);
      subject.next(Array.from(scramble.result));
    },
    [scramble],
  );
  const [step, setStep] = useState(() => session.next());
  const result = useSyncExternalStore(
    (triggerUpdate) => {
      const subscription = subject.subscribe(triggerUpdate);
      return () => subscription.unsubscribe();
    },
    () => subject.getValue(),
  );

  return (
    <bc-scramble>
      <Box sx={{ display: 'contents' }} slot="result">
        {result.map((word, i) => (
          <Button
            key={word + i}
            onClick={() => {
              cancel(i);
            }}
          >
            {word}
          </Button>
        ))}
      </Box>
      <Box slot="words" sx={{ display: 'contents' }}>
        {step.value.map((word, i) => (
          <Button key={word + i} onClick={() => setStep(session.next(word))}>
            {word}
          </Button>
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
