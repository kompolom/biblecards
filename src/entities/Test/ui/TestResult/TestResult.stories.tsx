import { Meta, StoryObj } from '@storybook/react';
import { TestResult, TestResultProps } from './TestResult';

const meta: Meta<TestResultProps> = {
  component: TestResult,
  argTypes: {
    status: {
      options: ['success', 'error'],
      control: { type: 'inline-radio' },
    },
  },
};
export default meta;

export const Playground: StoryObj<TestResultProps> = {
  args: {
    status: 'success',
    children: 'This is result text'
  },
};
