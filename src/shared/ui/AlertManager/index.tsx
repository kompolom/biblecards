import React, { createContext, useContext, useState } from 'react';
import { Stack, Alert } from '@mui/material';
import { connect } from 'react-redux';
import { hideAlert, showAlert } from '../../../Redux/actions';

export const AlertManagerContext = createContext({});
AlertManagerContext.displayName = 'AlertManagerContext';

export function useAlertManager() {
  return useContext(AlertManagerContext);
}

type OAlert = {
  id: string,
  children: string,
  status: 'success' | 'error' | 'warning' | 'info',
  timeout: number
}

type AlertManagerProps = {
  alerts: OAlert[]
  children: React.ReactNode,
  showAlert: () => void,
  hideAlert: (id: string) => void
}

export const AlertManagerProvider = connect(
  ({ alerts, setAlerts }) => ({ alerts, setAlerts }),
  (dispatch) => ({
    showAlert: (t, s, p) => dispatch(showAlert(t, s, p)),
    hideAlert: (id) => dispatch(hideAlert(id)),
  }),
)(({ alerts, showAlert, hideAlert, ...props }: AlertManagerProps) => {

  return (
    <AlertManagerContext.Provider value={showAlert}>
      {props.children}
      
      <Stack spacing={1} sx={{ position: 'fixed', left: '2vw', bottom: '2vh', minWidth: 288}}>
        {alerts.map(alert => <Alert onClose={() => hideAlert(alert.id)} severity={alert.status}>{alert.children}</Alert>)}
      </Stack>
    </AlertManagerContext.Provider>
  );
});