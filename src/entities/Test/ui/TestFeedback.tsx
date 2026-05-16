import React from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { ITestResult } from '../model/ITestResult';

export interface TestFeedbackProps {
  result: ITestResult;
  onContinue: () => void;
  onRetry?: () => void;
}

export const TestFeedback = ({ result, onContinue, onRetry }: TestFeedbackProps) => {
  const isSuccess = result.status;
  const accuracyPercent = Math.round(result.accuracy * 100);
  const seconds = (result.durationMs / 1000).toFixed(1);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
        py: 4,
        width: '100%',
      }}
    >
      <Box sx={{ textAlign: 'center' }}>
        {isSuccess ? (
          <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80 }} />
        ) : (
          <ErrorOutlineIcon color="error" sx={{ fontSize: 80 }} />
        )}
        <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold' }}>
          {isSuccess ? 'Отлично!' : 'Почти получилось'}
        </Typography>
      </Box>

      <Paper variant="outlined" sx={{ p: 2, width: '100%', maxWidth: 300 }}>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="text.secondary">Точность:</Typography>
            <Typography fontWeight="medium">{accuracyPercent}%</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="text.secondary">Время:</Typography>
            <Typography fontWeight="medium">{seconds} сек</Typography>
          </Box>
        </Stack>
      </Paper>

      <Stack spacing={2} sx={{ width: '100%', maxWidth: 300 }}>
        <Button variant="contained" size="large" onClick={onContinue} fullWidth>
          {isSuccess ? 'Продолжить' : 'Понятно'}
        </Button>
        {!isSuccess && onRetry && (
          <Button variant="outlined" size="large" onClick={onRetry} fullWidth>
            Попробовать снова
          </Button>
        )}
      </Stack>
    </Box>
  );
};
