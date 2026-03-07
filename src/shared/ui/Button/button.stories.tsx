import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './button';
import { themeLight, success } from './theme';
import { Album } from 'lucide-react';

document.adoptedStyleSheets.unshift(themeLight);

const meta: Meta = {
  component: Button,
  argTypes: { disabled: { control: 'boolean' } },
};
export default meta;

export const Text: StoryObj = {
  render: (args) => <Button {...args}>Text</Button>,
};

export const StartIcon: StoryObj = {
  render: (args) => (
    <Button {...args}>
      <Album slot="start-icon" />
      Text
    </Button>
  ),
};
export const EndIcon: StoryObj = {
  render: (args) => (
    <Button {...args}>
      <Album slot="end-icon" />
      Text
    </Button>
  ),
};
