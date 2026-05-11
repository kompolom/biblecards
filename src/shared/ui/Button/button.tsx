import React, { HTMLAttributes, useLayoutEffect } from 'react';
import { BCButton } from './button.component';

export interface ButtonProps extends HTMLAttributes<HTMLElement> {}
export const Button = (props: ButtonProps) => {
  useLayoutEffect(BCButton.register, []);
  return React.createElement(BCButton.name, props, props.children);
};
Button.displayName = BCButton.name;
