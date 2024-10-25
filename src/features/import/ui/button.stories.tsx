import { StoryObj } from '@storybook/react';
import { ImportButton } from './button';
const meta = {
    component: ImportButton,
}
export default meta;


export const main: StoryObj<typeof ImportButton> = {
    args: {
        variant: 'contained',
        children: 'upload'
    }
}