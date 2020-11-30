import React, { useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, SwipeableDrawer, List, ListItem, ListItemText, Link} from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons';
import routes from '../../routes';

export const AppHeader = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const toggleDrawer = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(!isDrawerOpen);
  }
  const pathname = useLocation().pathname;
  const currentRoute = routes.find(route => route[0] === pathname);

    return (<React.Fragment>
      <AppBar position="sticky">
        <Toolbar>
          <IconButton onClick={toggleDrawer} edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">{currentRoute[1]}</Typography>
        </Toolbar>
      </AppBar>
      <SwipeableDrawer open={isDrawerOpen} anchor="left" onClose={toggleDrawer} onOpen={toggleDrawer}>
          <div onClick={toggleDrawer} onKeyDown={toggleDrawer}>
            <List>
              {routes.map(route => (
              <ListItem key={route[0]}>
                <ListItemText>
                  <Link component={RouterLink} to={route[0]}>{route[1]}</Link>
                </ListItemText>
              </ListItem>))}
            </List>
          </div>
        </SwipeableDrawer>
      </React.Fragment>);
}
