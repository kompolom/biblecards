import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { connect } from 'react-redux';
import { hideAlert, showAlert } from '../../Redux/actions';

export const AlertManagerContext = createContext();
AlertManagerContext.displayName = 'AlertManagerContext';

export function useAlertManager() {
  return useContext(AlertManagerContext);
}

export const AlertManagerProvider = connect(
  ({ alerts }) => ({ alerts }),
  (dispatch) => ({
    showAlert: (t, p) => dispatch(showAlert(t, p)),
    hideAlert: (id) => dispatch(hideAlert(id)),
  }),
)(({ alerts, ...props }) => {
  return (
    <AlertManagerContext.Provider value={props.showAlert}>
      {props.children}
      {alerts.length && <Snackbar open={Boolean(alerts.length)} message={alerts[0].children} autoHideDuration={alerts[0].timeout} className="AlertManager" /> }
    </AlertManagerContext.Provider>
  );
});
