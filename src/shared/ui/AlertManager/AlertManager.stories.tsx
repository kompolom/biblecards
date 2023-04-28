import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { store } from '../../../Redux/store';
import { AlertManagerProvider } from './AlertManager';
import { Stack, Alert } from '@mui/material';
import { Provider } from 'react-redux';
import Typography from '@mui/material/Typography';

type OAlert = {
    id: string,
    children: string,
    status: 'success' | 'error' | 'warning' | 'info',
    timeout: number
  }

export default {
  component: AlertManagerProvider,
} as ComponentMeta<typeof AlertManagerProvider>;

const alerts: OAlert[] = [{ id: "", children: "hello world", status: 'success', timeout: 60 }];

export const Playground: ComponentStory<typeof AlertManagerProvider> = (args) => (
        <Provider store={store}>
            <AlertManagerProvider>
                <Typography component="div" variant='h5'>
                    In the AlertManager component, you can place anything you want.
                    And you can place different messages.
                </Typography>

                <Stack spacing={1} sx={{ position: 'fixed', left: '2vw', bottom: '2vh', minWidth: 288}}>
                    {alerts.map(alert => <Alert onClose={() => {}} severity={alert.status}>{alert.children}</Alert>)}
                </Stack>
            </AlertManagerProvider>
        </Provider>
)
// Playground.args = {
//     alerts: [{ id: "", children: "hello world", status: 'success', timeout: 60 }]
//     // hideAlert: hideAlert,
//     // showAlert: showAlert
// }