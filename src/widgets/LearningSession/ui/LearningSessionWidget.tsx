import React, { useState } from 'react';
import { Box, Typography, LinearProgress, Button } from '@mui/material';
import { ISessionConfig } from 'entities/LearningSession';
import { useLearningSession } from 'features/LearningSession';
import { ScrambleTest } from 'features/Scramble';
import { TextToSourceTest } from 'features/Test';
import { ITestResult, TestFeedback } from 'entities/Test';
import { Loader } from 'shared/ui/Loader';
import { SessionSummary } from './SessionSummary';

interface LearningSessionWidgetProps {
  config: ISessionConfig;
  onClose: () => void;
}

export const LearningSessionWidget = ({
  config,
  onClose,
}: LearningSessionWidgetProps) => {
  const {
    loading,
    currentStep,
    currentExcerpt,
    isCompleted,
    results,
    handleStepComplete,
    currentIndex,
    totalSteps,
  } = useLearningSession(config);

  const [stepResult, setStepResult] = useState<ITestResult | null>(null);

  const onTestComplete = (result: ITestResult) => {
    setStepResult(result);
  };

  const onNext = async () => {
    if (stepResult) {
      await handleStepComplete(stepResult);
      setStepResult(null);
    }
  };

  if (loading) return <Loader />;

  if (isCompleted) {
    return <SessionSummary results={results} onClose={onClose} />;
  }

  if (!currentExcerpt || !currentStep) return <Loader />;

  const progress = (currentIndex / totalSteps) * 100;

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Шаг {currentIndex + 1} из {totalSteps}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{ mt: 1, mb: 2 }}
        />
      </Box>

      {stepResult ? (
        <Box>
          <TestFeedback result={stepResult} onContinue={onNext} />
          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={onNext}
            sx={{ mt: 2 }}
          >
            {currentIndex + 1 === totalSteps ? 'Посмотреть итоги' : 'Дальше'}
          </Button>
        </Box>
      ) : (
        <>
          {currentStep.testType === 'scramble' ? (
            <ScrambleTest
              excerpt={currentExcerpt}
              onComplete={onTestComplete}
            />
          ) : (
            <TextToSourceTest
              excerpt={currentExcerpt}
              onComplete={onTestComplete}
            />
          )}
        </>
      )}
    </Box>
  );
};
