import React, {
    createContext,
    useContext,
} from 'react';
import { connect } from 'react-redux';
import { Alert } from "../Alert";
import './AlertManager.css'
import {hideAlert, showAlert} from "../../Redux/actions";

export const AlertManagerContext = createContext();
AlertManagerContext.displayName = 'AlertManagerContext'

export function useAlertManager() {
    return useContext(AlertManagerContext);
}

export const AlertManagerProvider = connect(
    ({ alerts }) => ({ alerts }),
    (dispatch) => ({
        showAlert: (t, p) => dispatch(showAlert(t, p)),
        hideAlert: (id) => dispatch(hideAlert(id))
    }))
(({ alerts, ...props}) => {
    return (
        <AlertManagerContext.Provider value={props.showAlert}>
            {props.children}
            <div className="AlertManager">{alerts.map(alert => {
                return (<Alert handleClose={props.hideAlert} key={alert.id} {...alert} />)
            })}</div>
        </AlertManagerContext.Provider>
    )
})