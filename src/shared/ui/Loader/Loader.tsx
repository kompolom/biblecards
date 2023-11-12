import React, { memo } from 'react';
import Box from '@mui/material/Box';
import './loader.css';
import type { SxProps } from '@mui/material';
import clsx from 'clsx';

export interface LoaderProps {
  colorscheme?: 'light' | 'dark';
  sx?: SxProps;
}

export const Loader = memo((props: LoaderProps) => {
  return (
    <Box
      sx={props.sx}
      className={clsx('Loader', {
        Loader_colorscheme_light: props.colorscheme === 'light',
        Loader_colorscheme_dark: props.colorscheme === 'dark',
      })}
    >
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
