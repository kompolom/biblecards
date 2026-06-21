import React, { ReactNode } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';

export interface AppHeaderProps {
  children?: ReactNode | ReactNode[];
  title?: ReactNode;
}

export const AppHeader = (props: AppHeaderProps) => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {props.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {props.children}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
