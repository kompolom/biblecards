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
import { BCScramble } from './scramble.component';
import { Button } from 'shared/ui/Button';
import { ITestProps } from 'entities/Test';

export const ScrambleTest = ({ excerpt, onComplete }: ITestProps) => {
  useLayoutEffect(BCScramble.register, []);
  const scramble = useMemo(() => new Scramble(excerpt), [excerpt]);
  const session = useMemo(() => scramble.start(), [scramble]);
  const subject = useMemo(() => {
    return new BehaviorSubject(scramble.result);
  }, [scramble]);
  const cancel = useCallback(
    (index: number) => {
      scramble.cancel(index);
      subject.next(scramble.result);
      setStep({ value: [...scramble.words], done: false });
    },
    [scramble, subject],
  );
  const [step, setStep] = useState(() => session.next());
  const guess = useCallback(
    (word: string) => {
      setStep(session.next(word));
      subject.next(scramble.result);
    },
    [session, subject, scramble],
  );
  const result = useSyncExternalStore(
    (triggerUpdate) => {
      const subscription = subject.subscribe(triggerUpdate);
      return () => subscription.unsubscribe();
    },
    () => subject.getValue(),
  );

  const onCheck = useCallback(() => {
    const testResult = scramble.check();
    if (testResult.status) {
      onComplete(testResult);
    }
  }, [scramble, onComplete]);

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
          <Button key={word + i} onClick={() => guess(word)}>
            {word}
          </Button>
        ))}
      </Box>
      <MuiButton
        size="large"
        sx={{ width: 1 }}
        onClick={onCheck}
        disabled={!step.done}
        variant="contained"
      >
        Check
      </MuiButton>
    </bc-scramble>
  );
};
