import React, { MouseEventHandler, useCallback } from 'react';
import { useCurrentRoute, useRoutes } from 'shared/routes';
import { AppHeader } from 'shared/ui/AppHeader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

export interface HeaderProps {}
export const Header = (props: HeaderProps) => {
    const navigate = useNavigate();
    const routes = useRoutes();
    const currentRoute = useCurrentRoute();
    const onRouteClick: MouseEventHandler = useCallback((e) => {
      e.preventDefault();
      navigate(e.currentTarget.getAttribute('href'));
    }, [navigate]);

    return <AppHeader title={currentRoute.title}>
          <List>
            {routes.map((route) => (
              <ListItem disablePadding key={route.path}>
                <ListItemButton onClick={onRouteClick} href={route.path}>
                  <ListItemText primary={route.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
    </AppHeader>
}