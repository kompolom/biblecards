import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { FlashCard } from './index';

import Typography from '@mui/material/Typography';

export default {
  component: FlashCard,
  argTypes: {
    side: { control: { type: 'radio' }, options: ['front', 'back'] },
  },
} as ComponentMeta<typeof FlashCard>;

export const Playground: ComponentStory<typeof FlashCard> = (args) => (
  <FlashCard
    sx={{ maxWidth: '350px' }}
    frontContent={
      <>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Verse of the Day
        </Typography>
        <Typography variant="h6" component="div">
          A joyful heart is good medicine, <br /> But a crushed spirit saps
          one’s strength.
        </Typography>
      </>
    }
    backContent={
      <>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Source
        </Typography>
        <Typography variant="h5" component="div">
          {' '}
          Proverbs 17:22{' '}
        </Typography>
      </>
    }
    {...args}
  />
);
Playground.args = {
  side: 'front',
};
