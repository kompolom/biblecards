import React, { useEffect } from 'react'
import { Paper } from '@material-ui/core';
import './alert.css'

export const Alert = ({ children, status, timeout, ...props }) => {
    const handleClose = () => {
        props.handleClose(props.id)
    }
    useEffect(() => {
        if(!timeout) return
        const timer = setTimeout(handleClose, timeout)
        return () => clearTimeout(timer)
    }, [timeout])
    const statusCls = status? `Alert_status_${status}` : '';
    return (
      <Paper className={`Alert ${statusCls}`}>
          <div className="Alert--container">
              {children}
          </div>
      </Paper>
   )
}