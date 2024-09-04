import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { VerseCard } from './index';
import verses from '../../examples/verses';

const meta: Meta<typeof VerseCard> = {
    component: VerseCard
}
export default meta;


export const Primary: StoryObj<typeof VerseCard> = {
    args: {
        verse: verses[0],
        showSource: true,
    }
}