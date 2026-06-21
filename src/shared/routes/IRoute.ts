import { SvgIconProps } from '@mui/material';
import { ComponentType } from 'react';

export interface IRoute {
  path: string;
  title: string;
  showInMenu?: boolean;
  icon?: ComponentType<SvgIconProps>;
}
