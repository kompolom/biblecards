import React, { ReactNode, useState, useCallback } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

export interface AppHeaderProps {
  children?: ReactNode | ReactNode[];
  title?: ReactNode;
}

export const AppHeader = (props: AppHeaderProps) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = useCallback(
    (event) => {
      if (
        event &&
        event.type === 'keydown' &&
        (event.key === 'Tab' || event.key === 'Shift')
      ) {
        return;
      }
      setDrawerOpen(!isDrawerOpen);
    },
    [isDrawerOpen],
  );

  return (
    <React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{props.title}</Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer
        open={isDrawerOpen}
        anchor="left"
        onClose={toggleDrawer}
        onOpen={toggleDrawer}
      >
        <div onClick={toggleDrawer} onKeyDown={toggleDrawer}>
          {props.children}
        </div>
      </SwipeableDrawer>
    </React.Fragment>
  );
};
