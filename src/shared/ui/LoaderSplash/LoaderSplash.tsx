import React, { memo } from 'react';
import Box from '@mui/material/Box';
import { Loader } from '../Loader';

export const LoaderSplash = memo(() => {
    return <Box sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255, 255, 255, .1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        <Loader />
    </Box>
})