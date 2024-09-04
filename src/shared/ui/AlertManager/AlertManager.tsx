import React, { createContext, useContext, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Stack, Alert } from '@mui/material';
import {
  alertManagerSlice,
  AlertManagerStateShape,
  AlertManagerState,
  AlertStatus,
} from './alertManager.slice';

type AlertOptions = { status: AlertStatus }

export interface IAlertManager {
  showAlert(text: string, timeout: number, opts: AlertOptions ): string 
  hideAlert(id: string): void
}

export const AlertManagerContext = createContext<IAlertManager>({ 
  showAlert: () => { throw new Error('AlertManagerContext used before initialized') },
  hideAlert: () => { throw new Error('AlertManagerContext used before initialized') }
 });
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

  const am: IAlertManager = useMemo(() => (
  {
    showAlert( text: string, timeout: number, p: AlertOptions) { 
      const id = crypto.randomUUID();
      dispatch(alertManagerSlice.actions.showAlert({ id, text, timeout, status: p.status }));
      setTimeout(() => dispatch(alertManagerSlice.actions.hideAlert({ id })), timeout);
      return id;
    },
    hideAlert(id) {
      dispatch(alertManagerSlice.actions.hideAlert({ id }));
    }
  }
  ), [dispatch]);

  return (
    <AlertManagerContext.Provider value={am}>
      {props.children}
      <Stack
        spacing={1}
        sx={{ position: 'fixed', left: '2vw', bottom: '2vh', minWidth: 288 }}
      >
        {alerts.map((alert) => (
          <Alert key={alert.id} onClose={() => am.hideAlert(alert.id)} severity={alert.status}>
            {alert.children}
          </Alert>
        ))}
      </Stack>
    </AlertManagerContext.Provider>
  );
};
