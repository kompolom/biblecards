import React from 'react';
import { Verse } from '../../model';
import { Box, SxProps } from '@mui/material';

export interface VersePreviewProps {
    verse: Verse;
    component?: React.ElementType 
    sx?: SxProps;
}

export const VersePreview = ({ verse, component, sx }: VersePreviewProps) => {
    return (<Box component={component} sx={sx}>{verse.toString()}</Box>);
}