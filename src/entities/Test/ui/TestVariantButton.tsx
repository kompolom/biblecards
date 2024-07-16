import React from 'react';
import { IOption } from "shared/option";
import { ToggleButton, ToggleButtonProps } from '@mui/material';

export interface TestVariantButtonProps extends IOption, Omit<ToggleButtonProps, 'component'|'value'> {
    name: string;
}

export const TestVariantButton = ({ children, value, name, selected, ...props }: TestVariantButtonProps) => {
    return (<ToggleButton value={value} selected={selected} component="label" variant='outlined' {...props}>
        <input defaultChecked={selected} style={{ display: 'none' }} type='radio' value={value} name={name} />
        {children}
    </ToggleButton>)
}