import React from "react";
import { Meta } from "@storybook/react";
import { VerseFlipCard } from './index';
import verses from '../../examples/verses';

const meta: Meta<typeof VerseFlipCard> = {
    component: VerseFlipCard
}
export default meta;


export const Primary = () => <VerseFlipCard verse={verses[0]} />
