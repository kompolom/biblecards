import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, SwipeableDrawer, List, ListItem, ListItemText, ListItemButton } from '@mui/material'
import { Menu as MenuIcon } from '@mui/icons-material';
import routes from '../../routes';

export const AppHeader = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(!isDrawerOpen);
  }
  const history = useHistory();
  const onRouteClick = React.useCallback((e) => {
    e.preventDefault();
    history.push(e.currentTarget.getAttribute('href'))
  }, [history]);
  const pathname = useLocation().pathname;
  const currentRoute = routes.find(route => route[0] === pathname);
  const pageTitle = currentRoute? currentRoute[1]: 'Редактировать';

    return (<React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton onClick={toggleDrawer} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{pageTitle}</Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer open={isDrawerOpen} anchor="left" onClose={toggleDrawer} onOpen={toggleDrawer}>
          <div onClick={toggleDrawer} onKeyDown={toggleDrawer}>
            <List>
              {routes.map(route => (
              <ListItem disablePadding key={route[0]}>
                <ListItemButton onClick={onRouteClick} href={route[0]}>
                  <ListItemText primary={route[1]} />
                </ListItemButton>
              </ListItem>))}
            </List>
          </div>
        </SwipeableDrawer>
      </React.Fragment>);
}
