import { Loader } from './index';
import { StoryObj, Meta } from '@storybook/react-vite';

const meta: Meta<typeof Loader> = {
    component: Loader
}
export default meta;

export const Showcase: StoryObj<typeof Loader> = {}