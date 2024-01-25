import { Meta, StoryObj } from '@storybook/react';
import { TextToSource } from './index';
import verses from 'entities/Verse/examples/verses';
import { action } from '@storybook/addon-actions';

const meta: Meta<typeof TextToSource> = {
  component: TextToSource,
};

export default meta;

export const Playground: StoryObj<typeof TextToSource> = {
  args: {
    title: 'Откуда взят этот стих?',
    verse: verses[0],
    variants: verses,
    onSelect: action('select'),
  },
};
