import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { TextToSource } from './index';
import verses from 'entities/Verse/examples/verses';
import { action } from '@storybook/addon-actions';
import { TextToSourceVariants } from '../../model';

const meta: Meta<typeof TextToSource> = {
  component: TextToSource,
};

export default meta;

export const Playground: StoryObj<typeof TextToSource> = {
  render: (props) => {
    const test = new TextToSourceVariants(verses[0], verses);
    return <TextToSource test={test} {...props} />
  },
  args: {
    onCommit: action('commit'),
  },
};
