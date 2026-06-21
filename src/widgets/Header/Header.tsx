import React, { useCallback } from 'react';
import { useCurrentRoute, useRoutes } from 'shared/routes';
import { AppHeader } from 'shared/ui/AppHeader';
import { IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export interface HeaderProps {}
export const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  const routes = useRoutes();
  const currentRoute = useCurrentRoute();

  const handleRouteClick = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  return (
    <AppHeader title={currentRoute.title}>
      {routes
        .filter((route) => route.showInMenu)
        .map((route) => {
          const Icon = route.icon;
          return (
            <Tooltip key={route.path} title={route.title}>
              <IconButton
                color="inherit"
                onClick={() => handleRouteClick(route.path)}
                sx={{
                  backgroundColor:
                    currentRoute.path === route.path
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'transparent',
                  padding: '12px',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                {Icon && (
                  <Icon
                    sx={{
                      fontSize: 28,
                      opacity: currentRoute.path === route.path ? 1 : 0.7,
                    }}
                  />
                )}
              </IconButton>
            </Tooltip>
          );
        })}
    </AppHeader>
  );
};
