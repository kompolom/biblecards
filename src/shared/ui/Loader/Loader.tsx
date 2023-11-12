import React, { memo, useMemo } from 'react';
import Box from '@mui/material/Box';
import './loader.css';
import type { SxProps } from '@mui/material';

export interface LoaderProps {
    size?: string; 
    colorscheme?: 'light'|'dark'
    sx?: SxProps
}

export const Loader = memo((props: LoaderProps) => {
  const styles = useMemo(() => {
    const styles = {};
    if(props.size) {
        styles['--blockSize'] = props.size;
    }
    return styles;
  }, [props]);

  return (
    <Box sx={props.sx} style={styles} className="Loader">
      <span className="Loader-Block"></span>
      <span className="Loader-Block"></span>
      <span className="Loader-Block"></span>
      <span className="Loader-Block"></span>
      <span className="Loader-Block"></span>
      <span className="Loader-Block"></span>
      <span className="Loader-Block"></span>
      <span className="Loader-Block"></span>
      <span className="Loader-Block"></span>
    </Box>
  );
});
