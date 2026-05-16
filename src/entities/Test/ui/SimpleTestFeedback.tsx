import React from 'react';
import { Alert, AlertTitle, Typography, Box } from '@mui/material';
import { ITestResult } from '../model/ITestResult';

interface SimpleTestFeedbackProps {
  result: ITestResult;
  correctAnswer?: string;
}

export const SimpleTestFeedback = ({ result, correctAnswer }: SimpleTestFeedbackProps) => {
  const isSuccess = result.status;

  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <Alert severity={isSuccess ? 'success' : 'error'}>
        <AlertTitle>
          {isSuccess ? 'Отлично!' : 'Почти получилось'}
        </AlertTitle>
        {isSuccess ? (
          'Вы ответили правильно.'
        ) : (
          <Box>
            <Typography variant="body2" gutterBottom>
              К сожалению, ответ неверный.
            </Typography>
            {correctAnswer && (
              <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                Правильный ответ: &laquo;{correctAnswer}&raquo;
              </Typography>
            )}
          </Box>
        )}
      </Alert>
    </Box>
  );
};
