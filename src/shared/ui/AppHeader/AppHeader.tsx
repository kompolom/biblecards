import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export interface AppHeaderProps {
  children?: ReactNode | ReactNode[];
  title?: ReactNode;
}

export const AppHeader = (props: AppHeaderProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: 'var(--color-theme)',
        color: 'var(--color-text-inverse)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            color: 'inherit',
          }}
        >
          {props.children}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
