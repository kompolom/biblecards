import { Loader } from './index';
import { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof Loader> = {
    component: Loader
}
export default meta;

export const Showcase: StoryObj<typeof Loader> = {}