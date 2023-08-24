import React, { createContext, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, Alert } from '@mui/material';
import {
  alertManagerSlice,
  AlertManagerStateShape,
  AlertManagerState,
} from 'widgets/AlertManager';

export const AlertManagerContext = createContext({});
AlertManagerContext.displayName = 'AlertManagerContext';

export function useAlertManager() {
  return useContext(AlertManagerContext);
}

type AlertManagerProps = {
  children: React.ReactNode;
};

export const AlertManagerProvider = ({ ...props }: AlertManagerProps) => {
  const dispatch = useDispatch();
  const alerts = useSelector<AlertManagerStateShape, AlertManagerState>(
    (state) => state.alerts,
  );
  const showAlert = (
    text: string,
    timeout: number,
    p: { status: 'success' | 'error' | 'warning' },
  ) =>
    dispatch(
      alertManagerSlice.actions.showAlert({ text, timeout, status: p.status }),
    ); 
  const hideAlert = (id: string) =>
    dispatch(alertManagerSlice.actions.hideAlert({ id }));
  alerts.map((alert) => setTimeout(hideAlert, alert.timeout, alert.id));
  return (
    <AlertManagerContext.Provider value={showAlert}>
      {props.children}

      <Stack
        spacing={1}
        sx={{ position: 'fixed', left: '2vw', bottom: '2vh', minWidth: 288 }}
      >
        {alerts.map((alert) => (
          <Alert onClose={() => hideAlert(alert.id)} severity={alert.status}>
            {alert.children}
          </Alert>
        ))}
      </Stack>
    </AlertManagerContext.Provider>
  );
};
