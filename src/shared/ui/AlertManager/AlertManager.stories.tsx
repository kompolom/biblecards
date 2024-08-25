import React, { createElement } from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { AlertManagerProvider } from './AlertManager';
import { Stack, Alert } from '@mui/material';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Typography from '@mui/material/Typography';
import { alertManagerSlice } from './alertManager.slice';

type OAlert = {
  id: string;
  children: string;
  status: 'success' | 'error' | 'warning' | 'info';
  timeout: number;
};

const meta: Meta<typeof AlertManagerProvider> = {
  component: AlertManagerProvider,
  decorators: [
    (Story) =>
      createElement(Provider, {
        store: configureStore({
          reducer: { alerts: alertManagerSlice.reducer },
        }),
        children: createElement(Story),
      }),
  ],
};
export default meta;

const alerts: OAlert[] = [
  { id: '', children: 'hello world', status: 'success', timeout: 60 },
];

export const Playground: StoryObj<typeof AlertManagerProvider> = {
  render: () => (
    <AlertManagerProvider>
      <Typography component="div" variant="h5">
        In the AlertManager component, you can place anything you want. And you
        can place different messages.
      </Typography>

      <Stack
        spacing={1}
        sx={{ position: 'fixed', left: '2vw', bottom: '2vh', minWidth: 288 }}
      >
        {alerts.map((alert) => (
          <Alert onClose={() => {}} severity={alert.status}>
            {alert.children}
          </Alert>
        ))}
      </Stack>
    </AlertManagerProvider>
  ),
};
