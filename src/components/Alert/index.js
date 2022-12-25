import React, { useEffect } from 'react'
import MuiAlert from '@mui/material/Alert';

export const Alert = ({ children, status, timeout, ...props }) => {
    const handleClose = () => {
        props.handleClose(props.id)
    }
    useEffect(() => {
        if(!timeout) return
        const timer = setTimeout(handleClose, timeout)
        return () => clearTimeout(timer)
    }, [timeout])

    return (
      <MuiAlert severity={status}>{children}</MuiAlert>
   )
}