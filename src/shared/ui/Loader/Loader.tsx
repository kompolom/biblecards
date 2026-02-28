import React from 'react';
import { Loader as LoaderWebComponent } from './loader.component';

export const Loader = () => {
  React.useLayoutEffect(() => LoaderWebComponent.register('bc-loader'));
  return React.createElement('bc-loader');
};
