import React, { useMemo, useState, useCallback } from 'react';
import { Box, Button, Typography, Stack } from '@mui/material';
import { FlipCard } from 'shared/ui/FlipCard';
import { ITestProps, ITestResult } from 'entities/Test';
import { useFormatSource } from 'entities/Verse';

interface FlipCardTestProps extends ITestProps {
  mode: 'text-to-source' | 'source-to-text';
}

export const FlipCardTest = ({
  excerpt,
  onComplete,
  mode,
}: FlipCardTestProps) => {
  const formatSource = useFormatSource();
  const [startTime] = useState(() => Date.now());
  const [isFlipped, setIsFlipped] = useState(false);

  const sourceText = useMemo(
    () => formatSource(excerpt.source),
    [excerpt, formatSource],
  );

  const handleFlip = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const result: ITestResult = {
      status: true,
      accuracy: 1,
      hintsUsed: 0,
      durationMs: Date.now() - startTime,
      correctAnswer: excerpt.text,
    };
    onComplete(result);
  };

  const instruction =
    mode === 'text-to-source'
      ? 'Постарайтесь вспомнить откуда эта цитата, прежде чем нажать на карточку, чтобы перевернуть её.'
      : 'Постарайтесь вспомнить текст стиха, прежде чем нажать на карточку, чтобы перевернуть её.';

  const frontContent =
    mode === 'text-to-source' ? (
      <Typography variant="body1" textAlign="center">
        {excerpt.text}
      </Typography>
    ) : (
      <Typography variant="h4" textAlign="center">
        {sourceText}
      </Typography>
    );

  const backContent =
    mode === 'text-to-source' ? (
      <Typography variant="h4" textAlign="center">
        {sourceText}
      </Typography>
    ) : (
      <Typography variant="body1" textAlign="center">
        {excerpt.text}
      </Typography>
    );

  return (
    <Box sx={{ width: '100%', py: 2 }}>
      <Typography
        variant="body1"
        sx={{ mb: 2, textAlign: 'center', fontStyle: 'italic' }}
      >
        {instruction}
      </Typography>
      <FlipCard
        onFlip={handleFlip}
        frontContent={
          <Box
            sx={{
              minHeight: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            {frontContent}
          </Box>
        }
        backContent={
          <Box
            sx={{
              minHeight: 200,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
            }}
          >
            {backContent}
          </Box>
        }
      />
      {isFlipped && (
        <Box sx={{ width: '100%', mt: 2 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Далее
          </Button>
        </Box>
      )}
    </Box>
  );
};
