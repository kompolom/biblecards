import React, { PropsWithChildren } from 'react';
import { Paper, useTheme } from '@mui/material';

export interface TestResultProps extends PropsWithChildren {
  status: 'success' | 'error';
}
export const TestResult = ({ status, children }: TestResultProps) => {
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        padding: 1,
        backgroundColor:
          status === 'success'
            ? theme.palette.success.light
            : theme.palette.error.light,
        color:
          status === 'success'
            ? theme.palette.success.contrastText
            : theme.palette.error.contrastText,
      }}
    >{children}
    </Paper>
  );
};
