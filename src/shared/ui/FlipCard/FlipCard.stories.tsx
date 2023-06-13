import React from 'react';
import { FlipCard } from './index';
import { Typography, Box } from '@mui/material';

export default {
  component: FlipCard,
};

export const Primary = () => (
  <FlipCard
    frontContent={
      <Box sx={{ background: 'green', width: '100%', height: '100px' }}>
        <Typography>Front side</Typography>
      </Box>
    }
    backContent={
      <Box sx={{ background: 'red', width: '100%', height: '100px' }}>
        <Typography>Back side</Typography>
      </Box>
    }
  />
);
