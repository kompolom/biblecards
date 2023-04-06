import React, { createContext, useContext, useState } from 'react';
import { SnackbarContent, Stack, Alert } from '@mui/material';
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
  showAlert: Object
}

export const AlertManagerProvider = connect(
  ({ alerts, setAlerts }) => ({ alerts, setAlerts }),
  (dispatch) => ({
    showAlert: (t, s, p) => dispatch(showAlert(t, s, p)),
    hideAlert: (id) => dispatch(hideAlert(id)),
  }),
)(({ alerts, ...props }: AlertManagerProps) => {

  return (
    <AlertManagerContext.Provider value={props.showAlert}>
      {props.children}
      
      {alerts.map((alert : OAlert) => <SnackbarContent  ></SnackbarContent>)}
    </AlertManagerContext.Provider>
  );
});
