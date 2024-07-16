import { Box, styled } from '@mui/material';

export const Container = styled(Box)({
    marginLeft: 'auto',
    marginRight: 'auto',
    boxSizing: 'content-box',
    containerType: 'inline-size',
    maxWidth: 'var(--container--width)',
    paddingInlineStart: 'var(--container--offset)',
    paddingInlineEnd: 'var(--container--offset)',
});